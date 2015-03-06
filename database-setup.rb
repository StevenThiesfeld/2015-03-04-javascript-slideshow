DATABASE.results_as_hash = true

DATABASE.execute("CREATE TABLE IF NOT EXISTS slides (id INTEGER PRIMARY KEY,
 title TEXT, body TEXT, position INTEGER)")