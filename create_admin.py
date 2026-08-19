import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

def create_admin():
    email = input("Enter the email address to promote to Admin: ")
    
    try:
        conn = psycopg2.connect(os.getenv('DATABASE_URL'))
        cur = conn.cursor()
        
        # Check if user exists
        cur.execute("SELECT id FROM users WHERE email = %s", (email,))
        user = cur.fetchone()
        
        if not user:
            print(f"Error: No user found with email {email}. Please register first.")
            return

        # Update user to be Admin, Approved, and Verified
        cur.execute("""
            UPDATE users 
            SET is_admin = TRUE, is_approved = TRUE, is_email_verified = TRUE 
            WHERE email = %s
        """, (email,))
        
        conn.commit()
        print(f"Success! User {email} is now an Admin.")
        
    except Exception as e:
        print(f"Error: {e}")
    finally:
        if conn:
            cur.close()
            conn.close()

if __name__ == "__main__":
    create_admin()