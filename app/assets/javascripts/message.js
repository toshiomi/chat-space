$(document).on('turbolinks:load', function(){ 
  function buildHTML(message){
     var new_image = message.image_url ? `<img class= "lower-message__image" src= ${message.image_url} >` : "";
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="upper-message">
           <div class="upper-message__user-name">
             ${message.user_name}
           </div>
           <div class="upper-message__date">
             ${message.date}
           </div>
         </div>
         <div class="lower-message">
           <p class="lower-message__content">
             ${message.content}
           </p>
           ${new_image}
         </div>`
     return html;
  }

$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html);
    $('.messages').animate({scrollTop: $('.messages')[0].scroll}, 'fast');   
    $('form')[0].reset();
  })
   .fail(function(){
     alert('error');
   });
   return false;
 })

  var reloadMessages = function() {
    var last_message_id = $('.message:last').attr("data-id");
    var group_id = $(".messages").attr("id");
    var url = "/groups/"+ group_id +"/api/messages"
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
        messages.forEach(function (message){
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
      })
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    }) 
    .fail(function() {
      console.log('バーカ');
    });
  };
  if (window.location.href.match(/\/groups\/\d+\/messages/)){
  setInterval(reloadMessages, 5000);
  }
});
