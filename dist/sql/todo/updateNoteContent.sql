update 
       notes
set
       content_json = $/content_json/,
       update_timestamp = current_timestamp
where 
       id = $/note_id/