document.addEventListener('DOMContentLoaded', function () {
    // Load tasks on page load
    loadTasks();

    // Function to load tasks from the backend
    function loadTasks() {
        console.log('hi')
        let username = 'Pardeep';
        let password = 'test@123';
        let authString = `${username}:${password}`
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + authString)
        fetch('http://localhost:8080/tasks', {
            method: 'GET',
            // header: headers,
        })
            .then(response => response.json())
            .then(tasks => displayTasks(tasks))
            .catch(error => console.error('Error fetching tasks:', error));
    }

    // Function to display tasks on the page
    function displayTasks(tasks) {
        const tasksContainer = document.getElementById('tasks-container');
        tasksContainer.innerHTML = '';

        tasks.slice().reverse().forEach(task => {
            const status = taskStatus(task.status); 
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            taskElement.innerHTML = `
            <div
            class="card p-5 m-3"
            style="
              background: linear-gradient(
                rgba(13, 178, 243, 0.5),
                rgba(228, 102, 180, 0.5)
              );
              border-radius: 0px;
            "
          >
            <div class="card-body shadow-lg">
              <div class="row" >
    
                <div class="col-md-8 col-sm-8" >
                  <h4><strong>${task.title}</strong></h4>
                  <p>${task.description || 'No description available'}</p>
                  <a
                  class="btn btn-info btn-sm"
                  role="button"
                  >${status}</a
                >                  <a
                    class="btn btn-success btn-sm"
                    role="button"
                    onclick="goToUpdatePage(${task.id})"
                    >Edit</a
                  >
                  <a
                    class="btn btn-danger btn-sm"
                    role="button"
                    onclick="deleteTask(${task.id})"
                    >Delete</a
                  >
                </div>
              </div>
            </div>
          </div>
            `;
            tasksContainer.appendChild(taskElement);
        });
    }

    window.taskStatus = function(statusId){
      if(statusId=='00'){
        return 'Open'
      }else if(statusId=='01'){
        return 'Work in progress'
      }else{
        return 'Closed'
      }
    }

    // Add a function to navigate to the update-task.html page
    window.goToUpdatePage = function (taskId) {
    // Store the task ID in session storage
        sessionStorage.setItem('updateTaskId', taskId);
        console.log(taskId)
        console.log(sessionStorage.getItem('updateTaskId'))


    // Redirect to the update-task.html page
        window.location.href = 'edittask.html';
    };
        


    // Function to add a new task
    window.addTask = function () {
        const title = document.getElementById('title').value;
        const description =  window.tinymce.activeEditor.getBody().textContent.trim();
        const status = 'open'
        console.log('guig')
        console.log(description)

        fetch('http://localhost:8080/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, status}),
        })
            .then(response => response.json())
            .then(() => {
                loadTasks(); // Reload tasks after adding a new one
                document.getElementById('title').value = '';
                document.getElementById('description').value = '';
            })
            .catch(error => console.error('Error adding task:', error));
    };

    // Function to delete a task
    window.deleteTask = function (taskId) {
        fetch(`http://localhost:8080/tasks/${taskId}`, {
            method: 'DELETE',
        })
        .then(() => {
          console.log('huu')
          loadTasks(); // Reload tasks after adding a new one
          
      })// Reload tasks after deletion
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
