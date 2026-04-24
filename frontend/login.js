
const BASE_URL = 'http://localhost:5000';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // กันหน้าเว็บรีเฟรช

    // ดึงค่าจาก input (ใน HTML ของคุณ id คือ email และ password)
    const userVal = document.getElementById('email').value;
    const passVal = document.getElementById('password').value;

    try {
        const res = await fetch(`${BASE_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: userVal, // ส่งไปเป็น username เพื่อให้ตรงกับ Backend
                password: passVal 
            })
        });

        const data = await res.json();

        if (res.ok && data.success) {
    localStorage.setItem('isLoggedIn', 'true');
    console.log("1. บันทึกข้อมูลสำเร็จ");

    // ลองใช้คำสั่งย้ายหน้าแบบพื้นฐานที่สุด และใส่ Error Catch
    try {
        console.log("2. กำลังจะย้ายไป dashboard.html");
        window.location.assign("dashboard.html");
    } catch (e) {
        console.error("3. ย้ายหน้าไม่สำเร็จเพราะ:", e);
    }
}
    } catch (err) {
        console.error("Login Error:", err);
        alert("เซิร์ฟเวอร์ขัดข้อง ไม่สามารถเชื่อมต่อได้");
    }
});
