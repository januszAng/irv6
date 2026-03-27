import sqlite3

def fill_database():
    # Connect to (or create) the database file
    conn = sqlite3.connect('notes.db')
    cursor = conn.cursor()

    # 1. Create Tables
    cursor.executescript('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            note TEXT NOT NULL,
            from_user INTEGER,
            to_user INTEGER,
            FOREIGN KEY (from_user) REFERENCES users (id),
            FOREIGN KEY (to_user) REFERENCES users (id)
        );
    ''')

    # 2. Add Sample Users
    # We use IGNORE so it doesn't crash if you run the script twice
    users = [
        (1, 'Alice'),
        (2, 'Bob'),
        (3, 'Charlie')
    ]
    cursor.executemany("INSERT OR IGNORE INTO users VALUES (?, ?)", users)

    # 3. Add Sample Notes
    # Format: (note, from_id, to_id)
    notes = [
        ("Hey Bob, did you see the report?", 1, 2),
        ("Just saw it, Alice. Looks good!", 2, 1),
        ("Charlie, can you join the meeting?", 1, 3),
        ("I'm on my way!", 3, 1)
    ]
    cursor.executemany("INSERT INTO notes (note, from_user, to_user) VALUES (?, ?, ?)", notes)

    # 4. Save and Close
    conn.commit()
    conn.close()
    print("Database 'notes.db' has been filled successfully!")

if __name__ == "__main__":
    fill_database()