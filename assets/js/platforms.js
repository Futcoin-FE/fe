// Game ID URL
let gameId = "1";
// Game API URL
const gameUrl = `https://futcoinbuy.com/api/v1/game/${gameId}`;
// Game Method API URL
const gameMethodUrl = `https://futcoinbuy.com/api/v1/game/${gameId}/methods`;

var baseRoute = "https://deneme.com";

var resultContainer = document.getElementsByClassName("resultContainer");

function redirectToMethod(platform, server, methodSlug) {
  let url = `${baseRoute}/aaaaa?type=coin`;

  // Platform parametresini yalnızca platform ID'si null olmayan bir değerse eklensin
  if (platform !== null && platform !== undefined) {
    url += `&platform=${platform}`;
  }

  // Server parametresini yalnızca server ID'si varsa eklensin
  if (server) {
    url += `&server=${server}`;
  }

  url += `&method=${methodSlug}`;
  window.location.href = url;
}

function loadMethods(platformId, serverId) {
  const methodsContainer = document.createElement("div");
  methodsContainer.classList.add(
    "cta-section",
    "section",
    "pb-10",
    "pb-sm-15",
    "platforms-yontem"
  );
  const container = document.createElement("div");
  container.className = "container text-center icon-up-down-animation";
  const row = document.createElement("div");
  row.className = "row text-center";
  row.setAttribute("data-aos", "fade-up");

  fetch(gameMethodUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.code === 200) {
        console.log(data.result);
        data.result.forEach((method) => {
          const col = document.createElement("div");
          col.className = "col-md-4";
          console.log(data.result.indexOf(method))
          if(data.result.indexOf(method).length == 2) {
            if (data.result.indexOf(method) === 0) {
              col.className += " offset-md-2";
            } else if (data.result.indexOf(method).length >= 4){
              col.className = "col-md-3";
            }
          }
          col.innerHTML = `
          <div class="sidebar-widget">
            <div class="sidebar-widget-content">
              <div class="sidebar-widget-banner">
                <h3 class="title">${method.title}</h3>
                <p>${method.description}</p>
                <button class="btn-style-1 text-center mt-2 mb-2 bg-success" data-aos="fade-right">
                  <span class="button__text">${method.button_title}</span>
                </button>
                <a href="${method.url}"><span class="me-2">${method.link_title} </span><i class="fas fa-arrow-alt-right"></i></a>
              </div>
            </div>
          </div>
        `;

          const buyButton = col.querySelector("button.btn-style-1");
          buyButton.addEventListener("click", () =>
            redirectToMethod(platformId, serverId, method.name)
          );

          row.appendChild(col);
        });
      } else {
        console.error("Error fetching methods:", data);
      }
    })
    .catch((error) => {
      console.error("Fetching error:", error);
    });

  container.appendChild(row);
  methodsContainer.appendChild(container);

  const existingMethodsContainer = document.querySelector(".cta-section");
  if (existingMethodsContainer) {
    existingMethodsContainer.parentNode.replaceChild(
      methodsContainer,
      existingMethodsContainer
    );
  } else {
    document
      .getElementById("platforms")
      .insertAdjacentElement("afterend", methodsContainer);
  }

  methodsContainer.scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", function () {
  const coinsElement = document.getElementById("platforms-coins");

  coinsElement.addEventListener("click", function (event) {
    event.preventDefault();

    fetch(gameUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        return response.json();
      })
      .then((data) => {
        handleResponse(data);
      })
      .catch((error) => {
        console.error("Fetching error:", error);
      });
  });
});

function handleResponse(data) {
  const platformsRow = document.querySelector(".platforms-row");
  if (data.items.length < 4) {
    platformsRow.className = platformsRow.className.replace(
      "row-cols-lg-4",
      `row-cols-lg-${data.items.length}`
    );
  }
  switch (data.type) {
    case "other":
      platformsRow.innerHTML = "";

      data.items.forEach((platform) => {
        const platformDiv = document.createElement("div");
        platformDiv.classList.add("col-6", "mb-3");
        platformDiv.setAttribute("data-aos", "fade-up");

        const iconBox = document.createElement("div");
        iconBox.classList.add("icon-box", "text-center");

        if (platform.color.start && platform.color.end) {
          // Gradyan renk
          iconBox.style.backgroundImage = `linear-gradient(156deg, ${platform.color.start} 0%, ${platform.color.start} 51%, ${platform.color.end} 100%)`;
        } else if (platform.color.start) {
          // Tek renk
          iconBox.style.backgroundColor = platform.color.start;
        }

        const iconDiv = document.createElement("div");
        iconDiv.classList.add("icon");

        // Logo resmini ekleyin
        if (platform.logo && platform.logo.type === "image") {
          const img = document.createElement("img");
          img.src = `assets/images/platforms/${platform.logo.logo}`; // Resim URL'si
          img.style = "width:50px; height:50px; object-fit:contain;";
          iconDiv.appendChild(img);
        }

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("content");

        // Platform başlığı
        const title = document.createElement("h3");
        title.classList.add("title");
        title.textContent = platform.title;

        contentDiv.appendChild(title);

        // Sunucu seçim listesi
        if (platform.servers && platform.servers.length > 0) {
          const selectList = document.createElement("select");
          selectList.classList.add(
            "platform-select",
            "form-select",
            "cursor-pointer"
          );

          // İlk boş seçeneği ekle
          const defaultOption = document.createElement("option");
          defaultOption.textContent = "Bir sunucu seçin";
          defaultOption.disabled = true;
          defaultOption.selected = true;
          selectList.appendChild(defaultOption);
          platform.servers.forEach((server) => {
            if (server.id && server.title) {
              // id ve title'ın varlığını kontrol edin
              const option = document.createElement("option");
              option.value = server.id;
              option.textContent = server.title;
              selectList.appendChild(option);
            }
          });

          contentDiv.appendChild(selectList);
          selectList.addEventListener("change", (event) => {
            loadMethods(platform.id, event.target.value);
          });
        } else {
          iconBox.addEventListener("click", () =>
            loadMethods(platform.id, null)
          );
          iconBox.classList.add("cursor-pointer");
        }

        iconBox.appendChild(iconDiv);
        iconBox.appendChild(contentDiv);

        platformDiv.appendChild(iconBox);

        platformsRow.appendChild(platformDiv);
      });
      break;
    case "server":
      platformsRow.innerHTML = ""; // Mevcut içeriği temizle
      data.items.forEach((server) => {
        const serverDiv = document.createElement("div");
        serverDiv.classList.add("col-6", "mb-3");
        serverDiv.setAttribute("data-aos", "fade-up");

        const serverBox = document.createElement("div");
        serverBox.classList.add(
          "icon-box",
          "text-center",
          "gradient-border",
          "cursor-pointer"
        );
        serverBox.setAttribute("id", "gradient-border");

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("content");

        const title = document.createElement("h3");
        title.classList.add("title");
        title.textContent = server.title;
        serverBox.addEventListener("click", () => loadMethods(null, server.id));

        contentDiv.appendChild(title);
        serverBox.appendChild(contentDiv);
        serverDiv.appendChild(serverBox);

        platformsRow.appendChild(serverDiv); // Server div'ini ekle
      });
      break;
    default:
      console.log("Unknown type");
  }
}
