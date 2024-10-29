document.getElementById('add-task').addEventListener('click', function() {
    const taskText = document.getElementById('new-task').value;
    const taskPriority = document.getElementById('task-priority').value;
    const taskDate = document.getElementById('task-date').value;

    if (taskText === '' || taskDate === '') {
        alert('Please enter a task and a date.');
        return;
    }

    const taskList = document.getElementById('task-list');
    const newRow = taskList.insertRow();

    const taskCell = newRow.insertCell(0);
    const priorityCell = newRow.insertCell(1);
    const dateCell = newRow.insertCell(2);
    const actionCell = newRow.insertCell(3);

    taskCell.textContent = taskText;
    priorityCell.textContent = taskPriority;
    dateCell.textContent = taskDate;

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.style.width = '18px';
    checkBox.style.height = '18px';
    checkBox.addEventListener('change', function() {
        const isChecked = this.checked;
        taskCell.style.textDecoration = isChecked ? 'line-through' : 'none';
        priorityCell.style.textDecoration = isChecked ? 'line-through' : 'none';
        dateCell.style.textDecoration = isChecked ? 'line-through' : 'none';

        if (isChecked) {
            addToDoneList(taskText, taskPriority, taskDate);
            removeFromOverdueList(taskText, taskPriority, taskDate);
            removeFromLocalStorage(taskText, taskPriority, taskDate, 'tasks');
            saveToLocalStorage(taskText, taskPriority, taskDate, 'done');
        } else {
            removeFromDoneList(taskText, taskPriority, taskDate);
            if (isTaskOverdue(taskDate)) {
                addToOverdueList(taskText, taskPriority, taskDate);
                saveToLocalStorage(taskText, taskPriority, taskDate, 'overdue');
            } else {
                saveToLocalStorage(taskText, taskPriority, taskDate, 'tasks');
            }
        }
    });

    const deleteIcon = document.createElement('img');
    deleteIcon.src = '../images/delete.png';
    deleteIcon.style.width = '20px';
    deleteIcon.style.height = '20px';
    deleteIcon.style.cursor = 'pointer';
    deleteIcon.addEventListener('click', function() {
        taskList.deleteRow(newRow.rowIndex - 1);
        removeFromDoneList(taskText, taskPriority, taskDate);
        removeFromOverdueList(taskText, taskPriority, taskDate);
        removeFromLocalStorage(taskText, taskPriority, taskDate, 'tasks');
        removeFromLocalStorage(taskText, taskPriority, taskDate, 'overdue');
        removeFromLocalStorage(taskText, taskPriority, taskDate, 'done');
    });

    actionCell.appendChild(checkBox);
    actionCell.appendChild(deleteIcon);

    document.getElementById('new-task').value = '';
    document.getElementById('task-priority').value = 'Low';
    document.getElementById('task-date').value = '';

    // Cek apakah tugas overdue atau masuk tasks
    if (isTaskOverdue(taskDate)) {
        taskCell.classList.add('overdue');
        addToOverdueList(taskText, taskPriority, taskDate);
        saveToLocalStorage(taskText, taskPriority, taskDate, 'overdue');
    } else {
        taskCell.classList.add('task-default');
        saveToLocalStorage(taskText, taskPriority, taskDate, 'tasks');
    }
});

function isTaskOverdue(taskDate) {
    const today = new Date().toISOString().split('T')[0];
    return taskDate < today;
}

function saveToLocalStorage(taskText, taskPriority, taskDate, key) {
    const data = JSON.parse(localStorage.getItem(key)) || [];
    data.push({ taskText, taskPriority, taskDate });
    localStorage.setItem(key, JSON.stringify(data));
}

function removeFromLocalStorage(taskText, taskPriority, taskDate, key) {
    let data = JSON.parse(localStorage.getItem(key)) || [];
    data = data.filter(
        (task) =>
            task.taskText !== taskText ||
            task.taskPriority !== taskPriority ||
            task.taskDate !== taskDate
    );
    localStorage.setItem(key, JSON.stringify(data));
}

function addToDoneList(taskText, taskPriority, taskDate) {
    const doneTaskList = document.getElementById('done-task-list');
    const newRow = doneTaskList.insertRow();

    const taskCell = newRow.insertCell(0);
    const priorityCell = newRow.insertCell(1);
    const dateCell = newRow.insertCell(2);

    taskCell.textContent = taskText;
    priorityCell.textContent = taskPriority;
    dateCell.textContent = taskDate;
}

function removeFromDoneList(taskText, taskPriority, taskDate) {
    const doneTaskList = document.getElementById('done-task-list');
    const rows = doneTaskList.rows;

    for (let i = 0; i < rows.length; i++) {
        const taskCell = rows[i].cells[0].textContent;
        const priorityCell = rows[i].cells[1].textContent;
        const dateCell = rows[i].cells[2].textContent;

        if (taskCell === taskText && priorityCell === taskPriority && dateCell === taskDate) {
            doneTaskList.deleteRow(i);
            break;
        }
    }
}

function addToOverdueList(taskText, taskPriority, taskDate) {
    const overdueTaskList = document.getElementById('overdue-task-list');
    const newRow = overdueTaskList.insertRow();

    const taskCell = newRow.insertCell(0);
    const priorityCell = newRow.insertCell(1);
    const dateCell = newRow.insertCell(2);

    taskCell.textContent = taskText;
    priorityCell.textContent = taskPriority;
    dateCell.textContent = taskDate;
}

function removeFromOverdueList(taskText, taskPriority, taskDate) {
    const overdueTaskList = document.getElementById('overdue-task-list');
    const rows = overdueTaskList.rows;

    for (let i = 0; i < rows.length; i++) {
        const taskCell = rows[i].cells[0].textContent;
        const priorityCell = rows[i].cells[1].textContent;
        const dateCell = rows[i].cells[2].textContent;

        if (taskCell === taskText && priorityCell === taskPriority && dateCell === taskDate) {
            overdueTaskList.deleteRow(i);
            break;
        }
    }
}

document.getElementById('show-done').addEventListener('click', function() {
    const doneTasks = document.getElementById('done-tasks');
    doneTasks.style.display = doneTasks.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('show-overdue').addEventListener('click', function() {
    const overdueTasks = document.getElementById('overdue-tasks');
    overdueTasks.style.display = overdueTasks.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('clear-all').addEventListener('click', function() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    
    const doneTaskList = document.getElementById('done-task-list');
    doneTaskList.innerHTML = '';

    const overdueTaskList = document.getElementById('overdue-task-list');
    overdueTaskList.innerHTML = '';
});

// Mengambil data pengguna yang sedang login dari localStorage
const loggedInUser = JSON.parse(localStorage.getItem('isLoggedIn'));
const greetingElement = document.getElementById('greeting');
const logoutButton = document.getElementById('logout-button');

// Cek apakah pengguna sedang login dan memiliki username
if (loggedInUser && loggedInUser.username) {
    greetingElement.textContent = `Hi, ${loggedInUser.username}`; // Menampilkan 'Hi, [username]'
} else {
    greetingElement.textContent = 'Hi'; // Jika tidak ada username, hanya tampil 'Hi'
}

// Fungsi logout
logoutButton.addEventListener('click', function() {
    localStorage.removeItem('isLoggedIn'); // Hapus status login
    window.location.href = '../index.html'; // Arahkan kembali ke halaman login
});


// fungsi ini untuk menambah tugas ke tabel secara langsung dari localStorage
function addTaskToTable(taskText, taskPriority, taskDate, isDone) {
    const taskList = isDone ? document.getElementById('done-task-list') : document.getElementById('task-list');
    const newRow = taskList.insertRow();

    const taskCell = newRow.insertCell(0);
    const priorityCell = newRow.insertCell(1);
    const dateCell = newRow.insertCell(2);
    const actionCell = newRow.insertCell(3);

    taskCell.textContent = taskText;
    priorityCell.textContent = taskPriority;
    dateCell.textContent = taskDate;

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.style.width = '18px';
    checkBox.style.height = '18px';
    checkBox.checked = isDone; // Checkbox akan ditandai jika tugas selesai

    checkBox.addEventListener('change', function() {
        const isChecked = this.checked;
        taskCell.style.textDecoration = isChecked ? 'line-through' : 'none';
        priorityCell.style.textDecoration = isChecked ? 'line-through' : 'none';
        dateCell.style.textDecoration = isChecked ? 'line-through' : 'none';

        if (isChecked) {
            addToDoneList(taskText, taskPriority, taskDate);
            removeFromOverdueList(taskText, taskPriority, taskDate);
            removeFromLocalStorage(taskText, taskPriority, taskDate, 'tasks');
            saveToLocalStorage(taskText, taskPriority, taskDate, 'done');
        } else {
            removeFromDoneList(taskText, taskPriority, taskDate);
            if (isTaskOverdue(taskDate)) {
                addToOverdueList(taskText, taskPriority, taskDate);
                saveToLocalStorage(taskText, taskPriority, taskDate, 'overdue');
            } else {
                saveToLocalStorage(taskText, taskPriority, taskDate, 'tasks');
            }
        }
    });

    const deleteIcon = document.createElement('img');
    deleteIcon.src = '../images/delete.png';
    deleteIcon.style.width = '20px';
    deleteIcon.style.height = '20px';
    deleteIcon.style.cursor = 'pointer';

    deleteIcon.addEventListener('click', function() {
        taskList.deleteRow(newRow.rowIndex - 1);
        removeFromDoneList(taskText, taskPriority, taskDate);
        removeFromOverdueList(taskText, taskPriority, taskDate);
        removeFromLocalStorage(taskText, taskPriority, taskDate, 'tasks');
        removeFromLocalStorage(taskText, taskPriority, taskDate, 'overdue');
        removeFromLocalStorage(taskText, taskPriority, taskDate, 'done');
    });

    actionCell.appendChild(checkBox);
    actionCell.appendChild(deleteIcon);

    if (isDone) {
        taskCell.style.textDecoration = 'line-through';
        priorityCell.style.textDecoration = 'line-through';
        dateCell.style.textDecoration = 'line-through';
    }
}

// Fungsi untuk menambah tugas overdue ke tabel
function addOverdueTaskToTable(taskText, taskPriority, taskDate) {
    const overdueTaskList = document.getElementById('overdue-task-list');
    const newRow = overdueTaskList.insertRow();

    const taskCell = newRow.insertCell(0);
    const priorityCell = newRow.insertCell(1);
    const dateCell = newRow.insertCell(2);

    taskCell.textContent = taskText;
    priorityCell.textContent = taskPriority;
    dateCell.textContent = taskDate;
}

// Fungsi untuk memuat data dari localStorage dan menampilkannya di halaman
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const doneTasks = JSON.parse(localStorage.getItem('done')) || [];
    const overdueTasks = JSON.parse(localStorage.getItem('overdue')) || [];

    tasks.forEach(task => {
        addTaskToTable(task.taskText, task.taskPriority, task.taskDate, false);
    });

    doneTasks.forEach(task => {
        addTaskToTable(task.taskText, task.taskPriority, task.taskDate, true);
    });

    overdueTasks.forEach(task => {
        addOverdueTaskToTable(task.taskText, task.taskPriority, task.taskDate);
    });
}

document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);
