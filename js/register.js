function validateRegis(username, email, password) {
    if (!username || !email || !password) {
    return {
        valid: false, message:'Semua fild harus diisi.'
    };
    }

// validasi email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { 
            valid: false, message: 'Format email tidak valid.'
        };
    }

// Validasi password Strength
if (password.length < 6){
    return { valid: false, message: 'Password minimal 6 karakter'};
}

return { valid: true}
}

// Fungsi untuk menyimpan user ke localStorage
function saveUserToLocalStorage(user) {
    const userList = JSON.parse(localStorage.getItem('userList')) || [];
    userList.push(user);
    localStorage.setItem('userList', JSON.stringify(userList));
}

// Fungsi untuk mengecek apakah email sudah terdaftar
function isEmailRegistered(email) {
    const userList = JSON.parse(localStorage.getItem('userList')) || [];
    return userList.some(user => user.email === email);
}

// Fungsi utama untuk menangani registrasi
function handleRegister(username, email, password) {
    // Validasi input
    const validation = validateRegis(username, email, password);
    if (!validation.valid) {
        showFeedback(validation.message, 'error');
        return;
    }

    // Cek apakah email sudah terdaftar
    if (isEmailRegistered(email)) {
        showFeedback('Email sudah terdaftar. Silakan gunakan email lain.', 'error');
        return;
    }

    // Simpan user ke localStorage
    saveUserToLocalStorage({ username, email, password });
    showFeedback('Registrasi berhasil! Silakan login.', 'success');

    // Redirect ke halaman login
    setTimeout(() => {
        window.location.href = 'E:/BOOTCAMP FSD (Harisenin)/Mission/Mission4-Meliana-13039/page/login.html';
    }, 1000);
}

// Fungsi untuk menampilkan pesan feedback
function showFeedback(message, type) {
    const feedback = document.getElementById('feedback'); // Asumsikan ada elemen dengan ID ini
    feedback.textContent = message;
    feedback.className = type === 'success' ? 'text-green-500' : 'text-red-500';
    feedback.style.display = 'block';
}

// Menangani registrasi pengguna
const registerForm = document.getElementById('registerForm'); // Pastikan ID form ini sesuai
registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    handleRegister(username, email, password);
});