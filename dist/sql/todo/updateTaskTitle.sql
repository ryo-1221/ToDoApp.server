update 
       tasks
set
       task_title = $/task_title/,
       update_timestamp = current_timestamp
where 
       id = $/task_id/