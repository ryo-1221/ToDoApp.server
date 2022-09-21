update 
       todo_list
set
       list_title = $/listTitle/,
       update_timestamp = current_timestamp
where 
       id = $/listId/