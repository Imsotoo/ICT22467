// 1. ตั้งค่า URL ให้ถูกต้อง (ถ้าทำในเครื่องตัวเองใช้ localhost, ถ้าใช้ Pi ให้ใส่ IP เครื่อง PC)
const BASE_URL = 'http://localhost:5000'; 

async function updateDashboard() {
    try {
        const res = await fetch(`${BASE_URL}/api/dashboard`);
        if (!res.ok) throw new Error('Network response was not ok');
        
        const data = await res.json();
        
        // ดึง Element ตาม ID ใน dashboard.html เป๊ะๆ
        const pondEl = document.getElementById('ponds');
        const shrimpEl = document.getElementById('shrimp');
        const weightEl = document.getElementById('weight');

        // อัปเดตข้อมูล (ตรวจสอบชื่อ key ให้ตรงกับ JSON: total_ponds, total_shrimp, avg_weight)
        if (pondEl) pondEl.innerText = data.total_ponds;
        
        if (shrimpEl) {
            const count = parseInt(data.total_shrimp);
            shrimpEl.innerText = count.toLocaleString();
        }

        if (weightEl) {
            // ใช้ parseFloat เพื่อความชัวร์ และไม่ต้องใส่ .toFixed ถ้าอยากให้เหมือนต้นฉบับ
            weightEl.innerText = data.avg_weight; 
        }

        console.log("Dashboard Updated Successfully");
        
    } catch (err) {
        console.error("Error:", err);
        // ถ้า error ให้แสดงตัวเลขเป็น 0 หรือ Error
        ['ponds', 'shrimp', 'weight'].forEach(id => {
            if(document.getElementById(id)) document.getElementById(id).innerText = "!";
        });
    }
}

// --- ระบบจัดการการเข้าสู่ระบบ (Auth) ---


function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// --- เริ่มทำงานเมื่อโหลดหน้าจอ ---
    window.onload = () => {
    //checkAuth();      // เช็คสิทธิ์
    updateDashboard(); // ดึงข้อมูลครั้งแรก
    
    // อัปเดตข้อมูลอัตโนมัติทุกๆ 10 วินาที
    setInterval(updateDashboard, 10000);
};