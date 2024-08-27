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

        // Jika ingin menambahkannya ke tabel done tasks (hanya jika dicentang), 
        // panggil fungsi addToDoneList di sini
        if (isChecked) {
            addToDoneList(taskText, taskPriority, taskDate);
        } else {
            removeFromDoneList(taskText, taskPriority, taskDate);
        }
    });

    const deleteIcon = document.createElement('img');
    deleteIcon.src = 'delete.png';
    deleteIcon.style.width = '20px';
    deleteIcon.style.height = '20px';
    deleteIcon.style.cursor = 'pointer';
    deleteIcon.addEventListener('click', function() {
        taskList.deleteRow(newRow.rowIndex - 1);
        removeFromDoneList(taskText, taskPriority, taskDate);
    });

    actionCell.appendChild(checkBox);
    actionCell.appendChild(deleteIcon);

    document.getElementById('new-task').value = '';
    document.getElementById('task-priority').value = 'Low';
    document.getElementById('task-date').value = '';
});

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

document.getElementById('show-done').addEventListener('click', function() {
    const doneTasks = document.getElementById('done-tasks');
    doneTasks.style.display = doneTasks.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('clear-all').addEventListener('click', function() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    const doneTaskList = document.getElementById('done-task-list');
    doneTaskList.innerHTML = '';
});
