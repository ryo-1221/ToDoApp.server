SELECT  todo_list.id
       ,coalesce(todo_list.list_title,'') as list_title
FROM todo_list
ORDER BY todo_list.list_index