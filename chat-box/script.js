$('.chat-button').on('click' , function(){
	$('.chat-button').css({"display": "none"});
	
	$('#chat').css({"visibility": "visible", "opacity": "1", "max-height": "576px"});
});

$('#chat .chat__conversation-head_close_button').on('click' , function(){
	$('.chat-button').css({"display": "block"});
	$('#chat').css({"visibility": "hidden", "opacity": "0", "max-height": "320px"});
});

var chatOnline = true; //chat button red or green
var newMessage = true; //new message notification
var newMessageCount = 5; //new message count
var newMessageNotifySound = true; //new message notification sound

if(newMessage){
	$('.chat-button').append('<style>.chat-button:before{content: "' + newMessageCount + '";}</style>');
	if(newMessageNotifySound){
		play();
	}
}
if(chatOnline == false){
	$('.chat-button span').addClass("offline");
}

/* Sohbeti sonlandır iconu */
$('.finish-support-button').on('click', function(){
	$(".chatModal__areyousure").fadeIn();
	$('#chat').addClass("chatVote");
	$('.chatModal__areyousure').css({"display":"block"});
	$(".chatModal__areyousure h2").text("Bu sohbeti sonlandırmak istediğinizden emin misiniz?");
	$('.chatModal__areyousure_button').css({"display":"flex"});
});

/* Sohbeti sonlandırma iptal butonu */
$('.chatModal__areyousure_button .chatModal__areyousure_cancel_btn').on('click', function(){
	$('#chat').removeClass("chatVote");
	$(".chatModal__areyousure").fadeOut();
	$('.chatModal__areyousure').css({"display":"none"});
});

/* Sohbeti sonlandırma butonu */
$('.chatModal__areyousure_button .chatModal__areyousure_confirm_btn').on('click', function(){
	$(".chatModal__areyousure").fadeIn();
	$(".chatModal__areyousure h2").text("Sohbeti değerlendirmek ister misiniz?");
	$('.chatModal__areyousure_vote_wrapper').css({"display":"flex"});
	$('.chatModal__areyousure_button').css({"display":"none"});
	$('.chatModal__areyousure_voteButton_Group').css({"display":"flex"});
	$("#chatValidationTextarea").css({"display":"block"});
});

/* Değerlendirmeyi Geç butonu */
$(".chatModal__areyousure_voteButton_Group .chatModal__areyousure_cancel_btn").click(function () {
	$(".chatModal__areyousure").fadeIn();
		$(".chatModal__areyousure h2").text("Teşekkür ederiz.");
		$('.chatModal__areyousure_vote_wrapper').css({"display":"none"});
		$('.chatModal__areyousure_button').css({"display":"none"});
		$('.chatModal__areyousure_voteButton_Group').css({"display":"none"});
		$("#chatValidationTextarea").css({"display":"none"});
	setTimeout(() => { 
		$('#chat').removeClass("chatVote");
		$('.chatModal__areyousure').css({"display":"none"});
	}, 2000); //2 saniye sonra #chat'e tekrar yönlendirilecek
});

/* Değerlendirme butonu */
$(".chatModal__areyousure_voteButton_Group .chatModal__areyousure_confirm_btn").click(function () {
	$(".chatModal__areyousure").fadeIn();
		$(".chatModal__areyousure h2").text("Teşekkür ederiz.");
		$('.chatModal__areyousure_vote_wrapper').css({"display":"none"});
		$('.chatModal__areyousure_button').css({"display":"none"});
		$('.chatModal__areyousure_voteButton_Group').css({"display":"none"});
		$("#chatValidationTextarea").css({"display":"none"});
	setTimeout(() => { 
		$('#chat').removeClass("chatVote");
		$('.chatModal__areyousure').css({"display":"none"});
	}, 2000); //2 saniye sonra #chat'e tekrar yönlendirilecek
});

function play() {
	var audio = new Audio('/assets/ringtone.mp3');
	audio.play();
}