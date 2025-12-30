import sqlite3

db_path = 'collabsphere.db'

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Get all tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
    tables = cursor.fetchall()
    
    print("=" * 50)
    print("       DATABASE CHECK - CollabSphere")
    print("=" * 50)
    print(f"\nDatabase file: {db_path}")
    print(f"Total tables: {len(tables)}")
    print("\n" + "-" * 50)
    print("Tables in database:")
    print("-" * 50)
    
    for i, (table,) in enumerate(tables, 1):
        # Count rows in each table
        cursor.execute(f"SELECT COUNT(*) FROM {table}")
        count = cursor.fetchone()[0]
        print(f"  {i:2}. {table:<30} ({count} rows)")
    
    print("\n" + "=" * 50)
    print("✅ Database is working correctly!")
    print("=" * 50)
    
    conn.close()
    
except Exception as e:
    print(f"❌ Database error: {e}")
