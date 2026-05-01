# Supabase Connection & Persistence Log 💎

This document serves as the official log for the **AutoApply** database integration.

---

## 🔌 Connection Profile
- **Target**: Supabase PostgreSQL (Cloud)
- **Host**: `aws-1-ap-southeast-1.pooler.supabase.com`
- **Port**: `5432` (Session Pooler Mode)
- **Status**: ✅ **ACTIVE & CONNECTED**
- **SSL Mode**: `require` (Enforced)

## 📊 Database Schema Persistence
The following entities have been successfully mapped and persisted to the `postgres` schema on Supabase:

| Entity | Table Name | Status |
| :--- | :--- | :--- |
| **Loop** | `loops` | ✅ Synced |
| **Application** | `applications` | ✅ Synced |
| **User Reference** | `userId` (UUID Mapping) | ✅ Synced |

---

## 🛠️ Verification Logs (Audit)
The Java backend confirmed the following during the last boot cycle:
1.  **Driver Initialization**: `org.postgresql.Driver` successfully loaded.
2.  **Pool Management**: `HikariPool-1` started with cloud credentials.
3.  **Hibernate Validation**: Dialect auto-detected as `PostgreSQL 17.6`.
4.  **JPA Handshake**: `EntityManagerFactory` initialized for persistence unit `default`.

---
**Timestamp**: 2026-04-30 01:42 (Local)
**Environment**: Production (Cloud-Linked)
