-- สร้างฐานข้อมูล (ถ้ายังไม่มี) และเลือกใช้งาน
CREATE DATABASE IF NOT EXISTS shrimp_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shrimp_db;

-- ==========================================
-- 1. ข้อมูลผู้ใช้งาน (Users)
-- ==========================================
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'owner') DEFAULT 'admin', 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 2. ข้อมูลบ่อเลี้ยง (Ponds)
-- ==========================================
CREATE TABLE ponds (
    pond_id INT AUTO_INCREMENT PRIMARY KEY, 
    pond_name VARCHAR(100) NOT NULL,        
    status ENUM('active', 'inactive', 'maintenance') DEFAULT 'active', 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 3. ข้อมูลการลงกุ้ง (Shrimp Batches)
-- ==========================================
CREATE TABLE shrimps (
    shrimp_id INT AUTO_INCREMENT PRIMARY KEY,
    pond_id INT,
    amount INT NOT NULL,           -- จำนวนลูกกุ้งที่ลง (ตัว)
    start_date DATE NOT NULL,      -- วันที่เริ่มเลี้ยง
    status ENUM('growing', 'harvested') DEFAULT 'growing', -- สถานะ: กำลังเลี้ยง หรือ จับขายแล้ว
    FOREIGN KEY (pond_id) REFERENCES ponds(pond_id) ON DELETE CASCADE
);

-- ==========================================
-- 4. ข้อมูลอุปกรณ์ IoT (Devices)
-- ==========================================
CREATE TABLE devices (
    device_id VARCHAR(50) PRIMARY KEY,      
    device_type VARCHAR(100) NOT NULL,      
    pond_id INT,                            
    status ENUM('online', 'offline') DEFAULT 'offline',
    FOREIGN KEY (pond_id) REFERENCES ponds(pond_id) ON DELETE SET NULL
);

-- ==========================================
-- 5. ข้อมูลค่าสภาพแวดล้อม (Environment Data)
-- ==========================================
CREATE TABLE environment_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    device_id VARCHAR(50),                  
    temperature FLOAT,                      
    ph_level FLOAT,                         
    oxygen_level FLOAT,                     
    water_level FLOAT,                      
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (device_id) REFERENCES devices(device_id) ON DELETE CASCADE
);

-- ==========================================
-- 6. ตารางการเจริญเติบโต (Growth Logs)
-- ==========================================
CREATE TABLE growth_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    pond_id INT,
    avg_weight FLOAT,       -- น้ำหนักเฉลี่ย (กรัม)
    avg_length FLOAT,       -- ความยาวเฉลี่ย (เซนติเมตร)
    recorded_at DATE,       -- วันที่สุ่มตรวจ
    FOREIGN KEY (pond_id) REFERENCES ponds(pond_id) ON DELETE CASCADE
);

-- ==========================================
-- 7. ตารางการให้อาหาร (Feeding Logs)
-- ==========================================
CREATE TABLE feeding_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    pond_id INT,
    feed_amount FLOAT NOT NULL,     -- ปริมาณอาหาร (กิโลกรัม)
    feed_type VARCHAR(100),         -- เพิ่มประเภทอาหาร (เช่น อาหารเบอร์ 1, อาหารเสริม)
    recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pond_id) REFERENCES ponds(pond_id) ON DELETE CASCADE
);

-- ==========================================
-- แถม: ใส่ข้อมูลจำลอง (Mock Data) 
-- ==========================================
INSERT INTO users (username, password, full_name, role) 
VALUES ('admin', '1234', 'ผู้ดูแลระบบ ฟาร์มกุ้ง', 'admin');

INSERT INTO ponds (pond_name, status) 
VALUES ('บ่อกุ้งก้ามกราม 01', 'active'), ('บ่ออนุบาล 02', 'active');

INSERT INTO shrimps (pond_id, amount, start_date)
VALUES (1, 50000, '2023-10-01');

INSERT INTO devices (device_id, device_type, pond_id, status) 
VALUES ('SENSOR-W01', 'เซนเซอร์วัดคุณภาพน้ำรวม', 1, 'online');

INSERT INTO environment_logs (device_id, temperature, ph_level, oxygen_level, water_level) 
VALUES ('SENSOR-W01', 28.5, 7.5, 6.2, 120.5);

INSERT INTO feeding_logs (pond_id, feed_amount, feed_type)
VALUES (1, 5.5, 'อาหารเม็ดเบอร์ 2');

INSERT INTO growth_logs (pond_id, avg_weight, avg_length, recorded_at)
VALUES (1, 15.2, 8.5, '2023-11-01');