(function ($) {
    "use strict";

    /*--
        Commons Variables
    -----------------------------------*/
    var $window = $(window),
        $body = $('body');

    
    /* Preloader */
    jQuery(document).ready(function($) {  
        $(window).load(function(){
            $('#preloader').fadeOut('slow',function(){$(this).remove();});
        });
    });

    /*--
        Custom script to call Background
        Image & Color from html data attribute
    -----------------------------------*/
    $('[data-bg-image]').each(function () {
        var $this = $(this),
            $image = $this.data('bg-image');
        $this.css('background-image', 'url(' + $image + ')');
    });
    $('[data-bg-color]').each(function () {
        var $this = $(this),
            $color = $this.data('bg-color');
        $this.css('background-color', $color);
    });

    /*---------------------------- 
        Sidebar Search Active
    -----------------------------*/
    function sidebarSearch() {
        var searchTrigger = $('.header-search-toggle'),
            endTriggersearch = $('button.search-close'),
            container = $('.main-search-active');

        searchTrigger.on('click', function() {
            container.addClass('inside');
        });

        endTriggersearch.on('click', function() {
            container.removeClass('inside');
        });

    };
    sidebarSearch();


    /*------------------------------
        Parallax Motion Animation 
    -------------------------------*/
    $('.scene').each(function () {
        new Parallax($(this)[0]);
    });

    /*--
        Header Sticky
    -----------------------------------*/
    $window.on('scroll', function () {
        if ($window.scrollTop() > 350) {
            $('.sticky-header').addClass('is-sticky');
        } else {
            $('.sticky-header').removeClass('is-sticky');
        }
    });

    /*--
        Off Canvas Function
    -----------------------------------*/
    $('.header-mobile-menu-toggle, .mobile-menu-close').on('click', '.toggle', function () {
        $body.toggleClass('mobile-menu-open');
    });
    $('.site-mobile-menu').on('click', '.menu-toggle', function (e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.siblings('.sub-menu:visible, .mega-menu:visible').length) {
            $this.siblings('.sub-menu, .mega-menu').slideUp().parent().removeClass('open').find('.sub-menu, .mega-menu').slideUp().parent().removeClass('open');
        } else {
            $this.siblings('.sub-menu, .mega-menu').slideDown().parent().addClass('open').siblings().find('.sub-menu, .mega-menu').slideUp().parent().removeClass('open');
        }
    });


    $('.header-search-toggle').on('click', function (e) {
        e.preventDefault();
        $(this).siblings('.header-search-form, .header-search-form-2').slideToggle().parent().toggleClass('open');
    });

    $('.header-fs-search-toggle').on('click', function () {
        $('#fullscreen-search').addClass('open');
    });
    $('.fullscreen-search-close').on('click', '.toggle', function () {
        $('#fullscreen-search').removeClass('open');
    });

    $body.on('click', function (e) {
        if (!$(e.target).closest('.header-search').length && $window.width() < 768) {
            $('.header-search-form, .header-search-form-2').slideUp().parent().removeClass('open');
        }
        if (!$(e.target).closest('.site-main-mobile-menu-inner').length && !$(e.target).closest('.header-mobile-menu-toggle').length) {
            $body.removeClass('mobile-menu-open');
        }
    });

    /*----- 
        Animate Headline Active
    --------------------------------*/
    $('.headline-active').animatedHeadline({
        animationType: 'rotate-3'
    });



    /* ----------------------------
        AOS Scroll Animation 
    -------------------------------*/
    AOS.init({
        offset: 80,
        duration: 1000,
        once: true,
        easing: 'ease',
    });


    /* ----------------------------
        Tilt Animation 
    -------------------------------*/
    $('.js-tilt').tilt({
        base: window,
        reset: !0, 
        scale: 1.04, 
        reverse: !1, 
        max: 15, 
        perspective: 3e3, 
        speed: 4e3
    });

    /* ----------------------------
        Portfolio Masonry Activation - Kapanacak
    -------------------------------*/
    /*$(window).load(function () {
        $('.ag-masonary-wrapper').imagesLoaded(function () {

            // filter items on button click
            $('.messonry-button').on('click', 'button', function () {
                var filterValue = $(this).attr('data-filter');
                $(this).siblings('.is-checked').removeClass('is-checked');
                $(this).addClass('is-checked');
                $grid.isotope({
                    filter: filterValue
                });
            });

            // init Isotope
            var $grid = $('.mesonry-list').isotope({
                percentPosition: true,
                transitionDuration: '0.7s',
                layoutMode: 'masonry',
                masonry: {
                    columnWidth: '.resizer',
                }
            });
        });
    })*/




    /* ----------------------------
        Kart Panosu Masonry Activation
    -------------------------------
    $(window).load(function () {
        $('.ag-masonary-wrapper').imagesLoaded(function () {

            // filter items on button click
            $('.messonry-button').on('click', 'button', function () {
                var filterValue = $(this).attr('data-filter');
                $(this).siblings('.is-checked').removeClass('is-checked');
                $(this).addClass('is-checked');
                $grid.isotope({
                    filter: filterValue
                });
            });

            // init Isotope
            var $grid = $('.mesonry-list').isotope({
                percentPosition: true,
                transitionDuration: '0.7s',
                layoutMode: 'masonry',
                masonry: {
                    columnWidth: '.resizer',
                }
            });
        });
    })*/



    


    /*----------------------------------------
         SVG Inject With Vivus(After Inject) 
    ------------------------------------------*/
    SVGInject(document.querySelectorAll("img.svgInject"), {
        makeIdsUnique: true,
        afterInject: function (img, svg) {
            new Vivus(svg, {
                duration: 80
            });
        }
    });
    /* Vivus On Hover */
    $('[data-vivus-hover]').hover(function () {
        var svg = $(this).find('svg')[0];
        new Vivus(svg, {
            duration: 50
        });
    })


    /*-----------------------
        CounterUp JS 
    -------------------------*/
    $('.counter').counterUp({
        time: 2000
    });

    /*--------------------------------
        Swiper Slider Activation JS 
    ----------------------------------*/

    // Home 1 Slider
    var introSlider = new Swiper('.intro-slider', {
        loop: true,
        speed: 750,
        spaceBetween: 30,
        slidesPerView: 2,
        effect: 'fade',
        navigation: {
            nextEl: '.home-slider-next',
            prevEl: '.home-slider-prev',
        },
        //autoplay: {},
    });

    var swiper = new Swiper('.blog-slider', {
        spaceBetween: 30,
        effect: 'fade',
        loop: true,
        speed: 750,
        observer: true,
        observeParents: true,
        mousewheel: {
          invert: false,
        },
        autoplay: {
        delay: 10000,
        disableOnInteraction: false,
  },
        // autoHeight: true,
        pagination: {
          el: '.blog-slider__pagination',
          clickable: true,
        }
      });

    // Testimonial Slider Two
    var testimonialSlider = new Swiper('.testimonial-slider', {
        slidesPerView : 1,
        slidesPerGroup: 1,
        centeredSlides: true,
        loop: true,
        speed: 750,
        spaceBetween : 150,
        autoHeight: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
      },
        breakpoints: {
            1499:{
                slidesPerView : 3
            },

            991:{
                slidesPerView : 2
            },

            767:{
                slidesPerView : 1

            },

            575:{
                slidesPerView : 1
            }
        }
    });

    $(".testimonial-slider").hover(function() {
        (this).swiper.autoplay.stop();
    }, function() {
        (this).swiper.autoplay.start();
    });


    // Testimonial Slider Two
    var relatedproducts = new Swiper('.related-products', {
        spaceBetween: 30,
        loop: true,
        speed: 750,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
            nextEl: '.home-slider-next',
            prevEl: '.home-slider-prev',
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        breakpoints: {
            1499:{
                slidesPerView : 4
            },

            991:{
                slidesPerView : 3
            },

            767:{
                slidesPerView : 2

            },

            575:{
                slidesPerView : 1
            }
        }
    });

    // Story
    var storyslider = new Swiper('.story-slider', {
        spaceBetween: 56,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1720:{
                slidesPerView : 11
            },

            1560:{
                slidesPerView : 10
            },

            1430:{
                slidesPerView : 9
            },

            1235:{
                slidesPerView : 8

            },

            1100:{
                slidesPerView : 7
            },

            940:{
                slidesPerView : 6
            },

            768:{
                slidesPerView : 5
            },

            600:{
                slidesPerView : 4
            },

            440:{
                slidesPerView : 3
            },

            300:{
                slidesPerView : 2
            }
        }
    });

    // Testimonial Slider Two
    var blogSlider = new Swiper('.index-blog-slider', {
        slidesPerView : 1,
        slidesPerGroup: 1,
        centeredSlides: true,
        loop: true,
        speed: 1000,
        autoHeight: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.home-slider-next',
            prevEl: '.home-slider-prev',
        },
        breakpoints: {
            1499:{
                slidesPerView : 1
            },

            991:{
                slidesPerView : 1
            },

            767:{
                slidesPerView : 1

            },

            575:{
                slidesPerView : 1
            }
        }
    });

    var sliderThumbs = new Swiper(".mySwiper", {
        // direction: 'vertical',
        direction: "horizontal",
        speed: 400,
        touchRatio: 0.2,
        slideToClickedSlide: true,
        loop: true,
        loopedSlides: 4,
          navigation: {
            nextEl: ".upk-button-next",
            prevEl: ".upk-button-prev",
         },
        breakpoints: {
          0: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
        }
      });
      
      var mainSlider = new Swiper(".mySwiper2", {
        parallax: true,
        effect: 'fade',
        speed: 400,
        loop: true,
        loopedSlides: 4,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
      
      /*mainSlider.controller.control = sliderThumbs;
      sliderThumbs.controller.control = mainSlider;*/

    // Brand Carousel Slider
    var brandSlider = new Swiper('.brand-carousel', {
        watchSlidesVisibility: true,
        loop: true,
        spaceBetween: 30,
        slidesPerView: 6,
        breakpoints: {
            1200: {
                slidesPerView: 6
            },
            992: {
                slidesPerView: 5
            },
            768: {
                slidesPerView: 5
            },
            576: {
                slidesPerView: 4
            },
            320: {
                slidesPerView: 2
            }
        }
    });

    // Product Single Thumb Slider2 Js
    var ProductNav = new Swiper('.single-product-nav-slider', {
        spaceBetween: 19,
        slidesPerView: 4,
        slidesPerGroup: 1,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        navigation: {
          nextEl: '.single-product-nav-slider .swiper-button-next',
          prevEl: '.single-product-nav-slider .swiper-button-prev',
        },
        breakpoints: {
          576: {
            slidesPerView : 4,
            spaceBetween: 19,
          },
          0: {
            slidesPerView : 2,
            spaceBetween: 15,
          },
        }
      });
      var ProductThumb = new Swiper('.single-product-thumb-slider', {
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        thumbs: {
          swiper: ProductNav
        }
      });

        /*--
        Yayıncı Carousel
        -----------------------------------*/
        $('.owl-carousel').owlCarousel({
            margin:5,
            loop:true,
            autoplay:true,
            nav:true,
            responsive:{
                0:{
                    items:2
                },
                600:{
                    items:3
                },
                1000:{
                    items:5
                }
              }
        });

    /*--
        Isotpe
    -----------------------------------*/
    var $isotopeGrid = $('.isotope-grid');
    var $isotopeFilter = $('.isotope-filter');
    $isotopeGrid.imagesLoaded(function () {
        $isotopeGrid.isotope({
            itemSelector: '.grid-item',
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });
        AOS.refresh();
    });
    $isotopeFilter.on('click', 'button', function () {
        var $this = $(this),
            $filterValue = $this.attr('data-filter'),
            $targetIsotop = $this.parent().data('target');
        $this.addClass('active').siblings().removeClass('active');
        $($targetIsotop).isotope({
            filter: $filterValue
        });
    });


    /*--
        Magnific Popup
    -----------------------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    // Background Video Active
    var htmlVideo = [
        {
          type: 'video/mp4',
          src: 'assets/media/video/nasil-calisir1.mp4'
        }
      ];

      var poster1 = 'assets/media/video/local-video.jpg';

      var demo1 = new vidim( '.bg-video', {
        src: htmlVideo,
        poster: poster1
      });

      // Background Video Active
      var htmlVideo = [
          {
            type: 'video/mp4',
            src: 'assets/media/video/nasil-calisir2.mp4'
          }
        ];
  
        var poster1 = 'assets/media/video/local-video2.jpg';
  
        var demo1 = new vidim( '.bg-video-2', {
          src: htmlVideo,
          poster: poster1
        });

        // Background Video Active
        var htmlVideo = [
            {
              type: 'video/mp4',
              src: 'assets/media/video/nasil-calisir3.mp4'
            }
          ];
    
          var poster1 = 'assets/media/video/local-video2.jpg';
    
          var demo1 = new vidim( '.bg-video-3', {
            src: htmlVideo,
            poster: poster1
          });

          // Background Video Active
          var htmlVideo = [
              {
                type: 'video/mp4',
                src: 'assets/media/video/nasil-calisir4.mp4'
              }
            ];
      
            var poster1 = 'assets/media/video/local-video2.jpg';
      
            var demo1 = new vidim( '.bg-video-4', {
              src: htmlVideo,
              poster: poster1
            });

            // Background Video Active
            var htmlVideo = [
                {
                  type: 'video/mp4',
                  src: 'assets/media/video/nasil-calisir5.mp4'
                }
              ];
        
              var poster1 = 'assets/media/video/local-video2.jpg';
        
              var demo1 = new vidim( '.bg-video-5', {
                src: htmlVideo,
                poster: poster1
              });


    /*--
        Time Range
    -----------------------------------*/
    $(function() {
        $('input[name="datetimes"]').daterangepicker({
          timePicker: true,
          timePicker24Hour: true,
          timePickerIncrement: 1,
          locale: {
            format: 'HH:mm',
            applyLabel: 'Kaydet'
        }
        });
        $('input[name="datetimes"]').val('');
        $('input[name="datetimes"]').attr("placeholder","00:00 - 23:59");
    }).on('show.daterangepicker', function (ev, picker) {
        picker.container.find(".calendar-table").hide();
    });

    /*--
        Scroll Up
    -----------------------------------*/
    function scrollToTop() {
        var $scrollUp = $('#scroll-top'),
            $lastScrollTop = 0,
            $window = $(window);

        $window.on('scroll', function () {
            var st = $(this).scrollTop();
            if (st > $lastScrollTop) {
                $scrollUp.removeClass('show');
            } else {
                if ($window.scrollTop() > 200) {
                    $scrollUp.addClass('show');
                } else {
                    $scrollUp.removeClass('show');
                }
            }
            $lastScrollTop = st;
        });

        $scrollUp.on('click', function (evt) {
            $('html, body').animate({scrollTop: 0}, 600);
            evt.preventDefault();
        });
    }
    scrollToTop();

    /*-------------------------
        Product Quantity JS
    ---------------------------*/
    var proQty = $(".pro-qty");
    proQty.append('<div class="inc qty-btn">+</div>');
    proQty.append('<div class= "dec qty-btn">-</div>');
    $('.qty-btn').on('click', function (e) {
        e.preventDefault();
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
        var newVal = parseFloat(oldValue) + 1;
        } else {
        // Don't allow decrementing below zero
        if (oldValue > 1) {
            var newVal = parseFloat(oldValue) - 1;
        } else {
            newVal = 1;
        }
        }
        $button.parent().find('input').val(newVal);
    });

    /*-------------------------
        Datatable
    ---------------------------*/
        $('table.display').DataTable({
            "searching": true,
            pageLength : 5,
            lengthMenu: [[5, 10, 20, 50], [5, 10, 20, 50]],
            language: {
                "emptyTable": "Tabloda herhangi bir veri mevcut değil",
                "info": "_TOTAL_ kayıttan _START_ - _END_ arasındaki kayıtlar gösteriliyor",
                "infoEmpty": "Kayıt yok",
                "infoFiltered": "(_MAX_ kayıt içerisinden bulunan)",
                "infoThousands": ".",
                "lengthMenu": "Sayfada _MENU_ kayıt göster",
                "loadingRecords": "Yükleniyor...",
                "processing": "İşleniyor...",
                "search": "Ara:",
                "zeroRecords": "Eşleşen kayıt bulunamadı",
                "paginate": {
                    "first": "İlk",
                    "last": "Son",
                    "next": "Sonraki",
                    "previous": "Önceki"
                },
                "aria": {
                    "sortAscending": ": artan sütun sıralamasını aktifleştir",
                    "sortDescending": ": azalan sütun sıralamasını aktifleştir"
                },
                "select": {
                    "rows": {
                        "_": "%d kayıt seçildi",
                        "1": "1 kayıt seçildi"
                    },
                    "cells": {
                        "1": "1 hücre seçildi",
                        "_": "%d hücre seçildi"
                    },
                    "columns": {
                        "1": "1 sütun seçildi",
                        "_": "%d sütun seçildi"
                    }
                },
                "autoFill": {
                    "cancel": "İptal",
                    "fillHorizontal": "Hücreleri yatay olarak doldur",
                    "fillVertical": "Hücreleri dikey olarak doldur",
                    "fill": "Bütün hücreleri <i>%d<\/i> ile doldur"
                },
                "buttons": {
                    "collection": "Koleksiyon <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
                    "colvis": "Sütun görünürlüğü",
                    "colvisRestore": "Görünürlüğü eski haline getir",
                    "copySuccess": {
                        "1": "1 satır panoya kopyalandı",
                        "_": "%ds satır panoya kopyalandı"
                    },
                    "copyTitle": "Panoya kopyala",
                    "csv": "CSV",
                    "excel": "Excel",
                    "pageLength": {
                        "-1": "Bütün satırları göster",
                        "_": "%d satır göster"
                    },
                    "pdf": "PDF",
                    "print": "Yazdır",
                    "copy": "Kopyala",
                    "copyKeys": "Tablodaki veriyi kopyalamak için CTRL veya u2318 + C tuşlarına basınız. İptal etmek için bu mesaja tıklayın veya escape tuşuna basın.",
                    "createState": "Şuanki Görünümü Kaydet",
                    "removeAllStates": "Tüm Görünümleri Sil",
                    "removeState": "Aktif Görünümü Sil",
                    "renameState": "Aktif Görünümün Adını Değiştir",
                    "savedStates": "Kaydedilmiş Görünümler",
                    "stateRestore": "Görünüm -&gt; %d",
                    "updateState": "Aktif Görünümün Güncelle"
                },
                "searchBuilder": {
                    "add": "Koşul Ekle",
                    "button": {
                        "0": "Arama Oluşturucu",
                        "_": "Arama Oluşturucu (%d)"
                    },
                    "condition": "Koşul",
                    "conditions": {
                        "date": {
                            "after": "Sonra",
                            "before": "Önce",
                            "between": "Arasında",
                            "empty": "Boş",
                            "equals": "Eşittir",
                            "not": "Değildir",
                            "notBetween": "Dışında",
                            "notEmpty": "Dolu"
                        },
                        "number": {
                            "between": "Arasında",
                            "empty": "Boş",
                            "equals": "Eşittir",
                            "gt": "Büyüktür",
                            "gte": "Büyük eşittir",
                            "lt": "Küçüktür",
                            "lte": "Küçük eşittir",
                            "not": "Değildir",
                            "notBetween": "Dışında",
                            "notEmpty": "Dolu"
                        },
                        "string": {
                            "contains": "İçerir",
                            "empty": "Boş",
                            "endsWith": "İle biter",
                            "equals": "Eşittir",
                            "not": "Değildir",
                            "notEmpty": "Dolu",
                            "startsWith": "İle başlar",
                            "notContains": "İçermeyen",
                            "notStarts": "Başlamayan",
                            "notEnds": "Bitmeyen"
                        },
                        "array": {
                            "contains": "İçerir",
                            "empty": "Boş",
                            "equals": "Eşittir",
                            "not": "Değildir",
                            "notEmpty": "Dolu",
                            "without": "Hariç"
                        }
                    },
                    "data": "Veri",
                    "deleteTitle": "Filtreleme kuralını silin",
                    "leftTitle": "Kriteri dışarı çıkart",
                    "logicAnd": "ve",
                    "logicOr": "veya",
                    "rightTitle": "Kriteri içeri al",
                    "title": {
                        "0": "Arama Oluşturucu",
                        "_": "Arama Oluşturucu (%d)"
                    },
                    "value": "Değer",
                    "clearAll": "Filtreleri Temizle"
                },
                "searchPanes": {
                    "clearMessage": "Hepsini Temizle",
                    "collapse": {
                        "0": "Arama Bölmesi",
                        "_": "Arama Bölmesi (%d)"
                    },
                    "count": "{total}",
                    "countFiltered": "{shown}\/{total}",
                    "emptyPanes": "Arama Bölmesi yok",
                    "loadMessage": "Arama Bölmeleri yükleniyor ...",
                    "title": "Etkin filtreler - %d",
                    "showMessage": "Tümünü Göster",
                    "collapseMessage": "Tümünü Gizle"
                },
                "thousands": ".",
                "datetime": {
                    "amPm": [
                        "öö",
                        "ös"
                    ],
                    "hours": "Saat",
                    "minutes": "Dakika",
                    "next": "Sonraki",
                    "previous": "Önceki",
                    "seconds": "Saniye",
                    "unknown": "Bilinmeyen",
                    "weekdays": {
                        "6": "Paz",
                        "5": "Cmt",
                        "4": "Cum",
                        "3": "Per",
                        "2": "Çar",
                        "1": "Sal",
                        "0": "Pzt"
                    },
                    "months": {
                        "9": "Ekim",
                        "8": "Eylül",
                        "7": "Ağustos",
                        "6": "Temmuz",
                        "5": "Haziran",
                        "4": "Mayıs",
                        "3": "Nisan",
                        "2": "Mart",
                        "11": "Aralık",
                        "10": "Kasım",
                        "1": "Şubat",
                        "0": "Ocak"
                    }
                },
                "decimal": ",",
                "editor": {
                    "close": "Kapat",
                    "create": {
                        "button": "Yeni",
                        "submit": "Kaydet",
                        "title": "Yeni kayıt oluştur"
                    },
                    "edit": {
                        "button": "Düzenle",
                        "submit": "Güncelle",
                        "title": "Kaydı düzenle"
                    },
                    "error": {
                        "system": "Bir sistem hatası oluştu (Ayrıntılı bilgi)"
                    },
                    "multi": {
                        "info": "Seçili kayıtlar bu alanda farklı değerler içeriyor. Seçili kayıtların hepsinde bu alana aynı değeri atamak için buraya tıklayın; aksi halde her kayıt bu alanda kendi değerini koruyacak.",
                        "noMulti": "Bu alan bir grup olarak değil ancak tekil olarak düzenlenebilir.",
                        "restore": "Değişiklikleri geri al",
                        "title": "Çoklu değer"
                    },
                    "remove": {
                        "button": "Sil",
                        "confirm": {
                            "_": "%d adet kaydı silmek istediğinize emin misiniz?",
                            "1": "Bu kaydı silmek istediğinizden emin misiniz?"
                        },
                        "submit": "Sil",
                        "title": "Kayıtları sil"
                    }
                },
                "stateRestore": {
                    "creationModal": {
                        "button": "Kaydet",
                        "columns": {
                            "search": "Kolon Araması",
                            "visible": "Kolon Görünümü"
                        },
                        "name": "Görünüm İsmi",
                        "order": "Sıralama",
                        "paging": "Sayfalama",
                        "scroller": "Kaydırma (Scrool)",
                        "search": "Arama",
                        "searchBuilder": "Arama Oluşturucu",
                        "select": "Seçimler",
                        "title": "Yeni Görünüm Oluştur",
                        "toggleLabel": "Kaydedilecek Olanlar"
                    },
                    "duplicateError": "Bu Görünüm Daha Önce Tanımlanmış",
                    "emptyError": "Görünüm Boş Olamaz",
                    "emptyStates": "Herhangi Bir Görünüm Yok",
                    "removeConfirm": "Görünümü Silmek İstediğinize Eminminisiniz?",
                    "removeError": "Görünüm Silinemedi",
                    "removeJoiner": "ve",
                    "removeSubmit": "Sil",
                    "removeTitle": "Görünüm Sil",
                    "renameButton": "Değiştir",
                    "renameLabel": "Görünüme Yeni İsim Ver -&gt; %s:",
                    "renameTitle": "Görünüm İsmini Değiştir"
                }
            }
        });


    /*-------------------------
        Ajax Contact Form 
    ---------------------------*/
    $(function() {

        // Get the form.
        var form = $('#contact-form');

        // Get the messages div.
        var formMessages = $('.form-messege');

        // Set up an event listener for the contact form.
        $(form).submit(function(e) {
            // Stop the browser from submitting the form.
            e.preventDefault();

            // Serialize the form data.
            var formData = $(form).serialize();

            // Submit the form using AJAX.
            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
            .done(function(response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('error');
                $(formMessages).addClass('success');

                // Set the message text.
                $(formMessages).text(response);

                // Clear the form.
                $('#contact-form input,#contact-form textarea').val('');
            })
            .fail(function(data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('success');
                $(formMessages).addClass('error');

                // Set the message text.
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occured and your message could not be sent.');
                }
            });
        });

    });

    /*--
        On Load Function
    -----------------------------------*/
    $window.on('load', function () {});

    /*--
        Resize Function
    -----------------------------------*/
    $window.resize(function () {});

    /*--
        Bootstrap Snippet
    -----------------------------------*/
    $('[data-toggle="tooltip"]').tooltip();

    


})(jQuery);
