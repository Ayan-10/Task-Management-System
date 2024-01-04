document.addEventListener('DOMContentLoaded', function () {
    // Load tasks on page load
    loadTasks();

    // Function to load tasks from the backend
    function loadTasks() {
        fetch('http://localhost:8080/tasks')
            .then(response => response.json())
            .then(tasks => displayTasks(tasks))
            .catch(error => console.error('Error fetching tasks:', error));
    }

    // Function to display tasks on the page
    function displayTasks(tasks) {
        const tasksContainer = document.getElementById('tasks-container');
        tasksContainer.innerHTML = '';

        tasks.forEach(task => {
            console.log(task.status+"jjj")
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            taskElement.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description || 'No description available'}</p>
                <button onclick="this.disabled = true">"${task.status}"</button>
                <button onclick="goToUpdatePage(${task.id})">Update</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            `;
            tasksContainer.appendChild(taskElement);
        });
    }

    // Function to add a new task
    window.addTask = async function () {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const status = 'open'
        const data = { title, description, status};
        const res = await fetch("http://localhost:8080/tasks", {
            method: "POST",
            redirect: "follow",
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          });
          if (res.ok) {
            console.log("ik")
                loadTasks(); // Reload tasks after adding a new one
                document.getElementById('title').value = '';
                document.getElementById('description').value = '';
          }
        
        // fetch('http://localhost:9111/tasks', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ title, description,status }),
        // })
        //     .then(response => response.json())
        //     .then(() => {
        //         console.log("ik")
        //         loadTasks(); // Reload tasks after adding a new one
        //         document.getElementById('title').value = '';
        //         document.getElementById('description').value = '';
        //     })
        //     .catch(error => console.error('Error adding task:', error));
    };

        // Add a function to navigate to the update-task.html page
    window.goToUpdatePage = function (taskId) {
    // Store the task ID in session storage
        sessionStorage.setItem('updateTaskId', taskId);
        console.log(taskId)
        console.log(sessionStorage.getItem('updateTaskId'))


    // Redirect to the update-task.html page
        window.location.href = 'update-task.html';
    };

    // Function to delete a task
    window.deleteTask = function (taskId) {
        fetch(`http://localhost:8080/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(() => loadTasks()) // Reload tasks after deletion
            .catch(error => console.error('Error deleting task:', error));
    };

    // Function to update a task (dummy implementation, you may need to implement a form)
    window.updateTask = function (taskId) {
        const newTitle = prompt('Enter new title:');
        const newDescription = prompt('Enter new description:');

        fetch(`http://localhost:8080/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: newTitle, description: newDescription }),
        })
            .then(() => loadTasks()) // Reload tasks after update
            .catch(error => console.error('Error updating task:', error));
    };
});
