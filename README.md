# 🦐 Giant Freshwater Prawn Farm Management (ระบบจัดการฟาร์มกุ้งก้ามกราม)

>ระบบจัดการกุ้งก้ามกรามอัจฉริยะ (Smart Farm) 
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


git clone (https://github.com/Imsotoo/ICT22467-Giant-Freshwater-Praw.git)
cd ICT22467-Giant-Freshwater-Praw

---

### ขั้นตอนที่ 2 - ตั้งค่าไฟล์ .env
สร้างไฟล์ .env ในโฟลเดอร์หลัก และกำหนดค่าพื้นฐานดังนี้:
PORT=3000
DB_HOST= mysql
DB_PORT= 3307
DB_USER= user
DB_PASSWORD= 1234
DB_NAME= shrimp_db
JWT_SECRET= ใส่รหัสลับของคุณที่นี่

---

### ขั้นตอนที่ 3. ติดตั้ง dependencies และรัน backend**
 
cd backend
npm install
node server.js

Backend จะรันที่ `http://localhost:5000`

---

### ขั้นตอนที่ 4 รันด้วย Docker
 เปิด Terminal แล้วรันคำสั่งด้านล่างนี้ เพื่อสร้างและเปิดใช้งาน Backend และ Database ไปพร้อมๆ กัน:

cd backend
docker build -t shrimp-backend .
docker run -p 5000:5000 shrimp-backend

---

## 👥 ทีมพัฒนา (Development Team)
โปรเจกต์นี้เป็นส่วนหนึ่งของวิชา ICT22467 - ระบบปฏิบัติการ (Operating System) * มหาวิทยาลัยศรีปทุม (Sripatum University)
67112987 ณัฐภัทร เอิบอาบ
67121979 วัชรศักดิ์ ดั่นเจริญ 
67143655 เมธวิน วันริโก 
