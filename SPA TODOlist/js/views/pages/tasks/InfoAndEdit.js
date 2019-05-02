import Component from '../../../views/Component.js';

import Error404 from '../../../views/pages/Error404.js';

class InfoAndEdit extends Component {
    constructor() {
        super();

        this.task = this.tasks.find(task => task.id === this.request.id);
    }

    render() {
        return new Promise(resolve => {
            let html;

            if (this.task) {
                const {id, title, description, status} = this.task;

                if (!this.request.action) {
                    html = `
                        <h1 class="page-title">Task Info</h1> 
                         
                        <div class="task-info">                                           
                            <p>
                                <b>Task Title:</b>
                                ${title}
                            </p>
                            <p>
                                <b>Task Description:</b>
                                ${description}
                            </p>                            
                            <p>
                                <b>Task Status:</b>
                                ${status}
                            </p>
                                                        
                            <div class="task-info__buttons">
                                <a class="task-info__btn-edit button" href="#/task/${id}/edit" id="${id}">Edit Task</a> 
                                <a class="task-info__btn-back button" href="#/tasks">Back to List</a>
                            </div>                            
                        </div>
                    `;
                } else {
                    if (this.task.status !== 'Done'){

                        html = `
                        <h1 class="page-title">Task Edit</h1> 
                        
                        <div class="task-edit"> 
                            <p>
                                <b>Task Title:</b> 
                                <input class="task-edit__title" type="text" value="${title}">
                            </p>
                            <p>
                                <b>Task Description:</b> 
                                <input class="task-edit__description" type="text" value="${description}">
                            </p>                                  
                    
                            <div class="task-edit__buttons">
                                <button class="task-edit__btn-save button">Save Task</button>
                                <a class="task-edit__btn-back button" href="#/task/${id}">Back to Info</a>
                            </div>                               
                        </div>
                    `;
                    } else {
                        html = new Error404().render();
                    }
                }
            } else {
                html = new Error404().render();
            }

            resolve(html);
        });
    }

    afterRender() {
        this.task && this.request.action && this.setActions();

            if(!this.request.action && this.task.status === 'Done'){
                let editBtn = document.getElementById(this.task.id);
                editBtn.remove();
            }

    }

    setActions() {
        const saveTaskBtn = document.getElementsByClassName('task-edit__btn-save')[0],
            editTaskInput = document.getElementsByClassName('task-edit__title')[0],
            editDescriptionInput = document.getElementsByClassName('task-edit__description')[0];

        editTaskInput.addEventListener('keyup', () => saveTaskBtn.disabled = !editTaskInput.value.trim());
        saveTaskBtn.addEventListener('click', () => this.editTask(editTaskInput, editDescriptionInput));
    }

    editTask(editTaskInput,editDescriptionInput) {

        this.task.title = editTaskInput.value.trim();
        this.task.description = editDescriptionInput.value.trim();

        localStorage.setItem('tasks', JSON.stringify(this.tasks));

        this.redirectToTaskInfo();
    }

    redirectToTaskInfo() {
        location.hash = `#/task/${this.task.id}`;
    }
}

export default InfoAndEdit;