# 🦐 Giant Freshwater Prawn Farm Management (ระบบจัดการฟาร์มกุ้งก้ามกราม)

> ระบบจัดการกุ้งก้ามกรามอัจฉริยะ (Smart Farm) 
> รองรับการดูข้อมูลเซ็นเซอร์แบบ Real-time และการจัดการข้อมูลผ่าน Dashboard
#### 🔗 [ดูสไลด์นำเสนอโปรเจกต์ (Canva) คลิกที่นี่](Link canva -->https://canva.link/4o4uyfp303cv9ow Link FullVDO -->https://youtu.be/N-AGnE8ZrVk Link ShortVDO --> https://www.tiktok.com/@warmhuggy/video/7631618096813395218?is_from_webapp=1&sender_device=pc

---
## 🖥️ Tech Stack

| ส่วน | เทคโนโลยี |
| :--- | :--- |
| **Backend** | Node.js (Express) |
| **Database** | MySQL 8.0 |
| **Frontend** | HTML5, CSS3, JavaScript , Chart.js |
| **Infrastructure**| Docker, Docker Compose |
| **Hardware/IoT** | ESP32, เซ็นเซอร์วัดคุณภาพน้ำ, อุณหภูมิ |

---
## ⚙️ การติดตั้ง (Setup Guide)

### ✅ สิ่งที่ต้องมีก่อน

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (สำหรับรันเซิร์ฟเวอร์จำลอง)
- Git สำหรับดึงโค้ด

---

### 📥 ขั้นตอนที่ 1 - Clone โปรเจค

```bash
git clone (https://github.com/Imsotoo/ICT22467-Giant-Freshwater-Praw.git)
cd ICT22467-Giant-Freshwater-Praw
```
---

### ขั้นตอนที่ 2 - ตั้งค่าไฟล์ .env
สร้างไฟล์ .env ในโฟลเดอร์หลัก และกำหนดค่าพื้นฐานดังนี้:
```bash
PORT=3000
DB_HOST= mysql
DB_PORT= 3307
DB_USER= user
DB_PASSWORD= 1234
DB_NAME= shrimp_db
JWT_SECRET= ใส่รหัสลับของคุณที่นี่
```
---

### ขั้นตอนที่ 3. ติดตั้ง dependencies และรัน backend**
 ```bash
cd backend
npm install
node server.js

Backend จะรันที่ `http://localhost:5000`
```
---

### ขั้นตอนที่ 4 รันด้วย Docker
 เปิด Terminal แล้วรันคำสั่งด้านล่างนี้ เพื่อสร้างและเปิดใช้งาน Backend และ Database ไปพร้อมๆ กัน:
```bash
cd backend
docker build -t shrimp-backend .
docker run -p 5000:5000 shrimp-backend
```
---

### ขั้นตอนที่ 5 - การเข้าใช้งาน
```bash
เมื่อระบบทำงานสมบูรณ์แล้ว สามารถเข้าถึงบริการต่างๆ ได้ตามช่องทางนี้:
Web Dashboard (หน้าเว็บหลัก): เปิดไฟล์ index.html หรือเข้าผ่าน http://localhost:5000
ระบบจัดการฐานข้อมูล (phpMyAdmin): เข้าผ่าน http://localhost:8080
```
---

## 👤 Account สำหรับ Login

| Username                   | Password    | Role     | สิทธิ์                 |
| -------------------------- | ----------- | -------- | ---------------------- |
| `admin`                | `1234`  | ADMIN  | จัดการทุกส่วนในระบบ |
| `ice` | `123` | staff    | จัดการเพิ่มข้อมุลการให้อาหาร,เช็คข้อมูล    |

---

## 📁 โครงสร้างโปรเจกต์
 
```
ict22467/
├── backend/
│   ├── server.js        # Express API server
│   ├── package.json     # Node.js dependencies
│   └── Dockerfile       # Docker สำหรับ backend
├── frontend/
│   ├── index.html       # หน้า Login
│   ├── register.html    # หน้าสมัครสมาชิก
│   ├── dashboard.html   # หน้า Dashboard หลัก
│   ├── pond.html        # หน้าจัดการบ่อกุ้ง
│   ├── water.html       # หน้าบันทึกคุณภาพน้ำ
│   ├── feeding.html     # หน้าบันทึกการให้อาหาร
│   ├── growth.html      # หน้าติดตามการเจริญเติบโต
│   ├── script.js        # JavaScript หลัก
│   ├── login.js         # JavaScript สำหรับ Login
│   └── style.css        # CSS stylesheet
└── mysql-init/
    └── init.sql         # SQL สำหรับสร้างฐานข้อมูลและข้อมูลตัวอย่าง
```
---

## ✨ ฟีเจอร์หลัก
 
| หมวด | รายละเอียด |
|------|------------|
| 🔐 ระบบสมาชิก | Login / Register พร้อมระบบ Role (admin / owner) |
| 🏊 จัดการบ่อกุ้ง | เพิ่ม/ดู/จัดการบ่อเลี้ยงกุ้ง |
| 💧 คุณภาพน้ำ | บันทึกและดูประวัติ pH, อุณหภูมิ, ออกซิเจน |
| 🍚 การให้อาหาร | บันทึกปริมาณและประเภทอาหารแต่ละบ่อ |
| 📈 การเจริญเติบโต | บันทึกน้ำหนักและความยาวเฉลี่ยของกุ้ง |
| 📊 Dashboard | ภาพรวมสถานะฟาร์มในหน้าเดียว |

---

# 📋 Business Rules — ระบบจัดการฟาร์มกุ้ง
 
| หมวด | กฎ | รายละเอียด |
|------|----|------------|
|🏊 บ่อกุ้ง | รอบการเลี้ยง | บ่อหนึ่งมีได้หลายรอบ |
| 🦐 การเลี้ยงกุ้ง | ข้อมูลที่บันทึก | จำนวนลูกกุ้ง (ตัว) และวันที่เริ่มเลี้ยง |
| 💧 คุณภาพน้ำ | วิธีบันทึก | จะมีเซนเซอร์ IoT ตรวจวัด |
| | ค่าที่วัด | อุณหภูมิ, pH, ออกซิเจน, ระดับน้ำ |
| 🍚 การให้อาหาร | หน่วยปริมาณอาหาร | กิโลกรัม |
| | เวลาบันทึก | ใช้เวลา server ณ ตอนนั้น |

---

## 👥 ทีมพัฒนา (Development Team)
โปรเจกต์นี้เป็นส่วนหนึ่งของวิชา ICT22467 - ระบบปฏิบัติการ (Operating System) * มหาวิทยาลัยศรีปทุม (Sripatum University)
> 67112987 ณัฐภัทร เอิบอาบ

> 67121979 วัชรศักดิ์ ดั่นเจริญ

> 67143655 เมธวิน วันริโก 
