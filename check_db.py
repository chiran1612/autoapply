import psycopg2
import uuid
import sys

def test_persistence():
    conn_uri = "postgresql://postgres.pgcthjuqrejtummjnivu:PSaR,+?vGv32F7e@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres?sslmode=require"
    try:
        conn = psycopg2.connect(conn_uri)
        cur = conn.cursor()
        
        test_id = str(uuid.uuid4())
        test_title = "AUDIT_TEST_LOOP_" + test_id[:8]
        
        print(f"--- 1. Writing Test Data to Supabase ---")
        cur.execute("""
            INSERT INTO loops (id, title, keywords, location, user_id, status)
            VALUES (%s, %s, %s, %s, %s, %s);
        """, (test_id, test_title, "Java, Python", "Remote", "audit-tester", "TESTING"))
        
        conn.commit()
        print(f"[OK] Data Inserted: {test_title}")
        
        print(f"\n--- 2. Reading Data back from Supabase ---")
        cur.execute("SELECT title, keywords, status FROM loops WHERE id = %s;", (test_id,))
        record = cur.fetchone()
        
        if record:
            print(f"[OK] Data Retrieved: Title={record[0]}, Keywords={record[1]}, Status={record[2]}")
            print("\n[SUCCESS] PERSISTENCE VERIFIED: The data is alive in the cloud!")
        else:
            print("[FAIL] Error: Data was not found!")
            
        # Cleanup
        cur.execute("DELETE FROM loops WHERE id = %s;", (test_id,))
        conn.commit()
        
        cur.close()
        conn.close()
    except Exception as e:
        print(f"[ERROR] {e}")
        sys.exit(1)

if __name__ == "__main__":
    test_persistence()
