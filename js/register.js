// Menangani registrasi pengguna
registerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Ambil data userList dari localStorage atau inisialisasi sebagai array kosong
    let userList = JSON.parse(localStorage.getItem('userList')) || [];

    // Cek apakah email sudah terdaftar
    const isExistingUser = userList.some(user => user.email === email);
    if (isExistingUser) {
        alert('Email sudah terdaftar. Silakan gunakan email lain atau login.');
        return;
    }

    // Buat objek data pengguna baru
    const newUser = {
        username: username,
        email: email,
        password: password
    };

    // Tambahkan pengguna baru ke array userList dan simpan kembali di localStorage
    userList.push(newUser);
    localStorage.setItem('userList', JSON.stringify(userList));
    
    alert('Registrasi berhasil! Silahkan login.');
    window.location.href = 'file:///E:/BOOTCAMP%20FSD%20(Harisenin)/Mission/Mission4-Meliana-13039//page/login.html';
});

// Fungsi login
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Ambil data userList dari localStorage
    const userList = JSON.parse(localStorage.getItem('userList')) || [];

    // Cari pengguna yang cocok dengan email dan password
    const loggedInUser = userList.find(user => user.email === email && user.password === password);

    if (loggedInUser) {
        // Simpan data pengguna yang login saat ini ke localStorage dengan kunci isLoggedIn
        localStorage.setItem('isLoggedIn', JSON.stringify(loggedInUser));
        alert(`Login berhasil! Selamat datang, ${loggedInUser.username}.`);
        window.location.href = 'file:///E:/BOOTCAMP%20FSD%20(Harisenin)/Mission/Mission4-Meliana-13039//index.html'; // Arahkan ke halaman utama
    } else {
        alert('Email atau password salah. Silakan coba lagi.');
    }
});

// Fungsi logout
logoutButton.addEventListener('click', function() {
    localStorage.removeItem('isLoggedIn'); // Hapus data login saat ini dari localStorage
    window.location.href = 'file:///E:/BOOTCAMP%20FSD%20(Harisenin)/Mission/Mission4-Meliana-13039/index.html'; // Arahkan kembali ke halaman login
});

// Saat halaman utama terbuka, tampilkan sapaan jika ada pengguna yang login
const storedUser = JSON.parse(localStorage.getItem('isLoggedIn'));
if (storedUser && storedUser.username) {
    greetingElement.textContent = `Hi, ${storedUser.username}`;
} else {
    greetingElement.textContent = 'Hi';
}
