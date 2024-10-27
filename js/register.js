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
    window.location.href = '/page/login.html';
});

