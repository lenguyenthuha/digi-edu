# DigiEdu System Architecture & Technical Specifications

> **Project:** DigiEdu — Transition Educational Resources Hub & Classroom Book Sharing Framework  
> **Status:** Open-Source Educational Tool  
> **Standard:** Article 25 (Vietnam Intellectual Property Law) & Berne Convention compliant

---

## 1. Architectural Overview

DigiEdu is structured around a three-tier decoupled model emphasizing zero-barrier client access, lightweight serverless logic, and flexible persistence (client-first local caching scalable to PostgreSQL/Supabase).

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│  LAYER 1: CLIENT PRESENTATION (Zero-Barrier Access)                               │
│ ├─ Student / Parent Public Portal (Web & Mobile Responsive)                       │
│ ├─ QR Code Poster Generator & Mobile Document Quick-View                          │
│ ├─ Classroom Pop-up Library Corner Tracker (Borrow / Return / Donate)             │
│ └─ Teacher / Subject Department Publishing Panel (Citation Enforcement)          │
└─────────────────────────────────────────┬─────────────────────────────────────────┘
                                          │ REST / RPC / HTTPS
                                          ▼
┌───────────────────────────────────────────────────────────────────────────────────┐
│  LAYER 2: APPLICATION & LOGIC LAYER (Modular Frontend & Edge/Serverless Functions)│
│ ├─ Material Categorization & Taxonomy Router (Grade -> Subject -> Week)           │
│ ├─ Dynamic QR Code Rendering Engine & Print Layout Generator                      │
│ ├─ Legal Citation Enforcement & Watermark Embedder (Art. 25 IP Law)              │
│ └─ Inventory State Machine (Available, In-Use, Shortage)                          │
└─────────────────────────────────────────┬─────────────────────────────────────────┘
                                          │ SQL Queries / Blob Storage SDK
                                          ▼
┌───────────────────────────────────────────────────────────────────────────────────┐
│  LAYER 3: DATA & STORAGE LAYER                                                    │
│ ├─ Relational Database: PostgreSQL / Supabase Schema (worksheets, inventories)    │
│ ├─ Local Client Fallback: IndexedDB / LocalStorage for zero-latency offline demo │
│ └─ Asset Storage: CDN / Storage Buckets for Worksheets (PDF / SVG / Images)       │
└───────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Component Design & Responsibility Matrix

### 2.1 Public Student & Parent Hub
- **Access Model:** 100% account-free. No sign-up, no password, no tracking cookies.
- **Hierarchical Filter:** Instant selection by:
  - **Grade Level:** 6, 7, 8, 9, 10, 11, 12
  - **Subject:** Toán (Mathematics), Ngữ Văn (Literature), Tiếng Anh (English), Khoa học tự nhiên (Natural Sciences), Lịch sử & Địa lí (History & Geography), etc.
  - **Academic Week:** Weeks 1 through 4 (Interim transition period).
- **Direct Output:** Instant preview, print-friendly CSS sheet rendering, or direct download with embedded legal attribution watermark.

### 2.2 Classroom Pop-up Book Library Corner (`Tầng 2`)
- **Purpose:** Maximizes utilization of donated secondhand textbooks within each physical classroom.
- **Class Inventory Tracking:**
  - Class identifier (e.g., Lớp 8A2, Lớp 10A1)
  - Book title, publisher edition
  - Available stock vs. in-circulation count
  - Needs / Shortage flag to notify parents or alumni for specific textbook donations.
- **Action Workflow:** Rapid reservation / status update by classroom monitors or homeroom teachers.

### 2.3 QR Code Distribution Engine (`Tầng 3`)
- **Classroom Poster Generation:** Teachers can generate standardized printable A4/A3 posters featuring dynamic QR codes linking directly to the class's weekly materials.
- **Zero-Barrier Mobile Redirection:** Scanning the QR code immediately opens the lightweight reading view without requiring app installations.

---

## 3. Data Schema & Contracts

### 3.1 `worksheets` Table
```sql
CREATE TABLE worksheets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    grade INT NOT NULL CHECK (grade BETWEEN 6 AND 12),
    subject VARCHAR(100) NOT NULL,
    week INT NOT NULL CHECK (week BETWEEN 1 AND 4),
    summary TEXT NOT NULL,
    content_html TEXT,
    file_url TEXT,
    legal_citation TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3.2 `class_inventories` Table
```sql
CREATE TABLE class_inventories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_name VARCHAR(50) NOT NULL,
    book_title VARCHAR(255) NOT NULL,
    grade INT NOT NULL CHECK (grade BETWEEN 6 AND 12),
    subject VARCHAR(100) NOT NULL,
    total_donated INT NOT NULL DEFAULT 0,
    total_available INT NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'IN_USE', 'SHORTAGE')),
    contact_teacher VARCHAR(100),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 4. Lifecycle & Decommissioning Policy
1. **Transition Phase (Weeks 1–4):** High availability of weekly worksheets and active rotation of secondhand textbooks.
2. **Book Arrival Phase (Week 5 onwards):** Digital interim worksheets automatically flag official textbook arrival and archive weekly digests into reference summaries.
