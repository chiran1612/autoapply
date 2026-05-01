import psycopg2
import uuid
import sys

def seed_db():
    conn_uri = "postgresql://postgres.pgcthjuqrejtummjnivu:PSaR,+?vGv32F7e@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres?sslmode=require"
    try:
        conn = psycopg2.connect(conn_uri)
        cur = conn.cursor()
        
        user_id = "test-user-id" # We'll use this for the audit view
        
        # 1. Clear existing audit data (optional, but keeps it clean)
        # cur.execute("DELETE FROM applications WHERE user_id = %s;", (user_id,))
        # cur.execute("DELETE FROM loops WHERE user_id = %s;", (user_id,))
        
        # 2. Insert Loops
        loops = [
            (str(uuid.uuid4()), "Fullstack Developer", "Java, React, Spring Boot", "Bangalore", "ACTIVE", 15),
            (str(uuid.uuid4()), "AI Engineer", "Python, PyTorch, LLMs", "Remote", "ACTIVE", 8),
            (str(uuid.uuid4()), "Backend Specialist", "Postgres, Redis, Microservices", "Hyderabad", "PAUSED", 0)
        ]
        
        print("--- Seeding Loops ---")
        for l in loops:
            cur.execute("""
                INSERT INTO loops (id, title, keywords, location, status, applications_count, user_id)
                VALUES (%s, %s, %s, %s, %s, %s, %s);
            """, (l[0], l[1], l[2], l[3], l[4], l[5], user_id))
            print(f"[OK] Added Loop: {l[1]}")
            
            # 3. Insert some Applications for the first loop
            if l[1] == "Fullstack Developer":
                apps = [
                    (str(uuid.uuid4()), "Google", "Senior Developer", "LinkedIn", "APPLIED", l[0]),
                    (str(uuid.uuid4()), "Meta", "Staff Engineer", "LinkedIn", "INTERVIEW", l[0]),
                    (str(uuid.uuid4()), "Amazon", "SDE II", "Indeed", "REJECTED", l[0])
                ]
                print(f"--- Seeding Applications for {l[1]} ---")
                for a in apps:
                    cur.execute("""
                        INSERT INTO applications (id, company, role, platform, status, loop_id, user_id)
                        VALUES (%s, %s, %s, %s, %s, %s, %s);
                    """, (a[0], a[1], a[2], a[3], a[4], a[5], user_id))
                    print(f"  - [OK] Added App: {a[1]}")

        conn.commit()
        cur.close()
        conn.close()
        print("\n[SUCCESS] Database Seeding Complete!")
    except Exception as e:
        print(f"[ERROR] {e}")
        sys.exit(1)

if __name__ == "__main__":
    seed_db()
