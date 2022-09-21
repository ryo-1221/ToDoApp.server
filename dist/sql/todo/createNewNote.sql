insert 
into notes(id, task_id, note_title,content_json, create_timestamp, update_timestamp) 
values ( 
    $/note_id/
    , $/task_id/
    , $/note_title/
    , '{}'
    ,current_timestamp
    ,current_timestamp
)
RETURNING id, task_id, note_title, content_json
;
