insert 
into todo_list(id, list_index, list_title, create_timestamp, update_timestamp) 
values ( 
    $/list_id/
    , (select coalesce( MAX(list_index) , 0) + 1 from todo_list)
    , ''
    ,current_timestamp
    ,current_timestamp
)
RETURNING id, list_title
;

-- select current_timestamp;

-- show timezone;