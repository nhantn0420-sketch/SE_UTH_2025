import sqlite3

conn = sqlite3.connect('collabsphere.db')
cursor = conn.cursor()
cursor.execute('SELECT id, username, email, full_name, role FROM users')
users = cursor.fetchall()

print('=== USERS IN DATABASE ===')
if users:
    for u in users:
        print(f'ID: {u[0]}, Username: {u[1]}, Email: {u[2]}, Name: {u[3]}, Role: {u[4]}')
    print(f'\nTotal: {len(users)} users')
else:
    print('No users found in database!')
conn.close()
