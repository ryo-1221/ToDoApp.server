delete from tasks
where id = $/task_id/
returning *
;