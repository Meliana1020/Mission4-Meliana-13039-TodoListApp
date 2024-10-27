const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Ambil data userList dari localStorage
    const userList = JSON.parse(localStorage.getItem('userList')) || [];
    console.log('Data yang tersimpan:', userList); // Cek data yang tersimpan

    // Cari user dengan email yang sesuai di userList
    const matchedUser = userList.find(user => user.email === email);

    // Cek apakah email sudah terdaftar
    if (!matchedUser) {
        errorMessage.textContent = 'Akun belum terdaftar, silakan daftar terlebih dahulu.';
        return;
    }

    // Cek password
    if (matchedUser.password === password) {
        alert('Berhasil login!');
        localStorage.setItem('isLoggedIn', JSON.stringify(matchedUser)); // Menyimpan data user yang login saat ini
        window.location.href = 'todolist.html'; // Arahkan ke halaman to-do list
    } else {
        errorMessage.textContent = 'Password salah!';
    }
});
