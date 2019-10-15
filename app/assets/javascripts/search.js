$(document).on('turbolinks:load', function() {

  var user_list = $("#user-search-result");
  var member_list = $("#member_search_result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    user_list.append(html);
  }

  function appendMember(name, user_id) {
    var html = `<div class='chat-group-user clearfix js-chat-member'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    member_list.append(html);
  }

  $(function(){
    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();
      if (input.length === 0) {
        return
      }
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(groups_user) {
        $("#user-search-result").empty();
        if (groups_user.length !== 0) {
          console.log('死ねゴミ');
          groups_user.forEach(function(user) {
            appendUser(user);
          });
        }
        else {
          console.log('バーカ');
        }
      })
      .fail(function(){
        alert('ユーザー検索に失敗しました');
      });
    });

    $(function(){
      $(document).on("click", ".user-search-add", function() {
        var name = $(this).attr("data-user-name");
        var user_id = $(this).attr("data-user-id");
        $(this).parent().remove();
        console.log('跪け、クソムシが！')
        appendMember(name, user_id);
      });
      $(document).on("click",".user-search-remove", function() {
        $(this).parent().remove();
      });
    });
  });
});