const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'shrimp_db'
});

// 1. API ดึงรายชื่อบ่อมาใส่ Dropdown
app.get('/api/ponds', (req, res) => {
    db.query("SELECT pond_id, pond_name FROM ponds", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 2. API ดึงประวัติคุณภาพน้ำ
app.get('/api/water-quality', (req, res) => {
    const sql = `
        SELECT e.*, p.pond_name 
        FROM environment_logs e
        LEFT JOIN devices d ON e.device_id = d.device_id
        LEFT JOIN ponds p ON (d.pond_id = p.pond_id OR e.device_id = CONCAT('MANUAL-', p.pond_id))
        ORDER BY e.recorded_at DESC
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 3. API บันทึกข้อมูลคุณภาพน้ำ
app.post('/api/water-quality', (req, res) => {
    const { pond_id, ph_level, temperature, oxygen_level } = req.body;
    const device_id = `MANUAL-${pond_id}`;
    
    const sql = "INSERT INTO environment_logs (device_id, ph_level, temperature, oxygen_level) VALUES (?, ?, ?, ?)";
    db.query(sql, [device_id, ph_level, temperature, oxygen_level], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// --- API สำหรับการให้อาหาร (Feeding) ---

// 1. ดึงประวัติการให้อาหารทั้งหมด (JOIN เพื่อเอาชื่อบ่อ)
app.get('/api/feeding', (req, res) => {
    // ต้องแน่ใจว่าชื่อคอลัมน์ในฐานข้อมูลคือ date_time หรือถ้าเป็นชื่ออื่นต้อง AS ให้ตรงกัน
    const sql = `
        SELECT f.*, p.pond_name 
        FROM feeding_logs f
        JOIN ponds p ON f.pond_id = p.pond_id
        ORDER BY f.recorded_at DESC
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 2. บันทึกการให้อาหาร
app.post('/api/feeding', (req, res) => {
    const { pond_id, feed_amount } = req.body;
    const sql = "INSERT INTO feeding_logs (pond_id, feed_amount, date_time) VALUES (?, ?, NOW())";
    
    db.query(sql, [pond_id, feed_amount], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: "บันทึกการให้อาหารสำเร็จ" });
    });
});

// --- API สำหรับการเจริญเติบโต (Growth) ---

// บันทึกการเจริญเติบโต
// บันทึกการเจริญเติบโต (ใช้ชื่อตาราง growth_logs ตาม SQL ของคุณ)
app.post('/api/growth', (req, res) => {
    const { pond_id, avg_weight, avg_length, check_date } = req.body;
    
    // เปลี่ยนชื่อตารางเป็น growth_logs และคอลัมน์วันที่เป็น recorded_at
    const sql = "INSERT INTO growth_logs (pond_id, avg_weight, avg_length, recorded_at) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [pond_id, avg_weight, avg_length, check_date], (err, result) => {
        if (err) {
            console.error("MySQL Error:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ success: true, message: "บันทึกสำเร็จ" });
    });
});

// ดึงข้อมูลการเจริญเติบโต
app.get('/api/growth', (req, res) => {
    // เปลี่ยนชื่อตารางเป็น growth_logs และเรียงลำดับตาม recorded_at
    const sql = "SELECT * FROM growth_logs ORDER BY recorded_at DESC";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

app.listen(5000, () => console.log('🚀 Server running on port 5000'));