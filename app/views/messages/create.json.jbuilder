json.(@message, :content, :image)
json.created_at @message.created_at.strftime("%Y/%m/%d(%a) %H:%M:%S")
json.user_name @message.user.name
#idもデータとして渡す
json.id @message.id