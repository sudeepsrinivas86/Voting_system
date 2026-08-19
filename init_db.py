import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')

def init_db():
    if not DATABASE_URL:
        print("Error: DATABASE_URL is not set in .env file.")
        return

    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        
        with open('schema.sql', 'r') as f:
            schema = f.read()
            cur.execute(schema)
        
        conn.commit()
        cur.close()
        conn.close()
        print("Database initialized successfully!")
        
    except Exception as e:
        print(f"Error initializing database: {e}")

if __name__ == '__main__':
    init_db()
