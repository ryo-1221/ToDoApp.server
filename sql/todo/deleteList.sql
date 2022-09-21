delete from todo_list
where id = $/list_id/
returning *
;