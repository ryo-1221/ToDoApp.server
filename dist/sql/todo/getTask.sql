SELECT  tasks.id
       ,tasks.list_id
       ,tasks.task_title
       ,TO_CHAR(tasks.dead_line,'yyyy/mm/dd HH24:mi') as dead_line
FROM tasks
ORDER BY tasks.task_index