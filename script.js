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
    });

    const deleteIcon = document.createElement('img');
    deleteIcon.src = 'delete.png'; // Ganti dengan path sebenarnya ke ikon kamu
    deleteIcon.style.width = '20px'; // Sesuaikan ukuran ikon
    deleteIcon.style.height = '20px';
    deleteIcon.style.cursor = 'pointer'; // Ubah kursor menjadi pointer untuk menunjukkan bahwa ikon bisa diklik
    
    deleteIcon.addEventListener('click', function() {
    taskList.deleteRow(newRow.rowIndex - 1);
    });

    actionCell.appendChild(checkBox);
    actionCell.appendChild(deleteIcon);

    document.getElementById('new-task').value = '';
    document.getElementById('task-priority').value = 'Low';
    document.getElementById('task-date').value = '';
});

document.getElementById('clear-all').addEventListener('click', function() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
});
