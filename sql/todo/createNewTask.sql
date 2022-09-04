insert 
into tasks (id, task_index, list_id, task_title, dead_line, is_completed, create_timestamp, update_timestamp) 
values ( 
    $/task_id/
    , 1
    , $/list_id/
    , '<新規タスク>'
    , current_timestamp 
    , false
    , current_timestamp
    , current_timestamp
)
RETURNING id
;
