// Fungsi untuk validasi email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fungsi untuk mencari user berdasarkan email
function findUserByEmail(email, userList) {
    return userList.find(user => user.email === email);
}

// Tangani login form
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Ambil input dari form
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    // Ambil data userList dari localStorage
    const userList = JSON.parse(localStorage.getItem('userList')) || [];
    console.log('Data yang tersimpan:', userList); // Debugging

    // Validasi email format
    if (!isValidEmail(email)) {
        errorMessage.textContent = 'Format email tidak valid.';
        return;
    }

    // Cari user berdasarkan email
    const matchedUser = findUserByEmail(email, userList);

    // Cek apakah email sudah terdaftar
    if (!matchedUser) {
        errorMessage.textContent = 'Akun belum terdaftar, silakan daftar terlebih dahulu.';
        return;
    }

    // Cek password
    if (matchedUser.password === password) {
        alert('Berhasil login!');
        localStorage.setItem('isLoggedIn', JSON.stringify(matchedUser)); // Simpan user yang login
        window.location.href = 'todolist.html'; // Redirect ke halaman To Do List
    } else {
        errorMessage.textContent = 'Password salah!';
    }
});
