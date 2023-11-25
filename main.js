window.addEventListener('load', () => {
    const form = document.querySelector("#task_form");
    const input = document.querySelector("#task_input");
    const list_el = document.querySelector("#task"); // Corrected this line

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        if (!task) {
            alert("Please fill up anything before you click Add Task");
            return;
        }

        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const tasks_content_el = document.createElement("div");
        tasks_content_el.classList.add("content");
        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");

        tasks_content_el.appendChild(task_input_el);

        const tasks_buttons_el = document.createElement("div");
        tasks_buttons_el.classList.add("buttons");

        const tasks_edit_el = document.createElement("button");
        tasks_edit_el.classList.add("edit");
        tasks_edit_el.innerHTML = "edit";

        const tasks_delete_el = document.createElement("button");
        tasks_delete_el.classList.add("delete");
        tasks_delete_el.innerHTML = "delete";

        tasks_buttons_el.appendChild(tasks_edit_el);
        tasks_buttons_el.appendChild(tasks_delete_el);

        task_el.appendChild(tasks_content_el);
        task_el.appendChild(tasks_buttons_el);

        list_el.appendChild(task_el);

        input.value = "";

        tasks_edit_el.addEventListener('click', () => {
            if (tasks_edit_el.innerText.toLowerCase() == "edit") {
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                tasks_edit_el.innerText = "Save";
            } else {
                task_input_el.setAttribute("readonly", "readonly");
                tasks_edit_el.innerText = "edit";
            }
        });

        tasks_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
        });
    });
});