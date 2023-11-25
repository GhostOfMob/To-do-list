document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector("#task_form");
    const input = document.querySelector("#task_input");
    const tasksContainer = document.querySelector("#task");

    loadTasks();

    form.addEventListener('submit', function (event) {
        event.preventDefault();
  
        const taskValue = input.value.trim();
  
        if (taskValue !== '') {
            createTask(taskValue);
            saveTasks();
            input.value = '';
        }
    });

    function createTask(taskValue) {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
  
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');
  
        const taskTextInput = document.createElement('input');
        taskTextInput.type = 'text';
        taskTextInput.classList.add('text');
        taskTextInput.value = taskValue;
        taskTextInput.readOnly = true;
  
        contentDiv.appendChild(taskTextInput);
  
        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');
  
        const editButton = createButton('Edit', () => {
            taskTextInput.readOnly = !taskTextInput.readOnly;
            saveTasks();
        });
  
        const deleteButton = createButton('Delete', () => {
            tasksContainer.removeChild(taskDiv);
            saveTasks();
        });
  
        buttonsDiv.appendChild(editButton);
        buttonsDiv.appendChild(deleteButton);
  
        taskDiv.appendChild(contentDiv);
        taskDiv.appendChild(buttonsDiv);
  
        tasksContainer.appendChild(taskDiv);
    }

    function createButton(text, callback) {
        const button = document.createElement('button');
        button.innerText = text;
        button.addEventListener('click', callback);
        return button;
    }

    function saveTasks() {
        const tasks = Array.from(document.querySelectorAll('.task .text')).map(taskElement => taskElement.value);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(createTask);
    }
});
