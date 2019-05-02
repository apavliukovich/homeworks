import Utils from '../../../helpers/Utils.js';

import Component from '../../../views/Component.js';

import Tasks from '../../../models/Tasks.js';

class TasksList extends Component {
    constructor() {
        super();

        if (!this.tasks) {
            this.tasks = new Tasks().getDefaultTasks();
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }

    }

    render() {
        return new Promise(resolve => {
            resolve(`     
                <h1 class="page-title">Tasks List</h1>
                
                <div class="task-add">
                    <input class="task-add__title" type="text">             
                    <button class="task-add__btn-add button" disabled>Add Task</button>
                    <button class="task-add__btn-clear button" >Clear Tasks</button>
                    <textarea class="task-add__description" placeholder="Add the description here..."></textarea>
                </div>       
                  
                <div class="tasks-list">               
                    <div class="tasks">
                        ${this.tasks.map(task => this.getTaskHTML(task)).join('\n ')}
                    </div>
                </div>
                <div class="info-about-tasks">
                    <p id="taskInfo">
                        Всего задач - ${this.tasks.length}.
                        Количество выполненных задач - ${this.countDoneTask()}.
                    </p>
                </div>            
            `);
        });
    }

    afterRender() {
        this.setActions();

        this.tasks.forEach(task => {
            if (task.status === 'Done') {
                let doneTask = document.getElementById(task.id);
                doneTask.classList.add('done');

                doneTask.getElementsByClassName('task__btn-edit')[0].remove();
                doneTask.getElementsByClassName('task__btn-done')[0].remove();
            }
        })
    }

    renderInfoUnderTasks() {
        let p = document.getElementById('taskInfo');

        p.textContent = `Всего задач - ${this.tasks.length}.
                         Количество выполненных задач - ${this.countDoneTask()}.`
    }

    countDoneTask() {
        let count = 0;

        this.tasks.forEach(task => task.status === 'Done' && count++);

        return count;
    }

    setActions() {
        const tasksList = document.getElementsByClassName('tasks-list')[0],
            addTaskInput = document.getElementsByClassName('task-add__title')[0],
            addTaskDescription = document.getElementsByClassName('task-add__description')[0],
            addTaskBtn = document.getElementsByClassName('task-add__btn-add')[0],
            clearTasksBtn = document.getElementsByClassName('task-add__btn-clear')[0];

        addTaskInput.addEventListener('keyup', () => addTaskBtn.disabled = !addTaskInput.value.trim());
        addTaskBtn.addEventListener('click', () => this.addTask(tasksList, addTaskInput,
            addTaskBtn, clearTasksBtn, addTaskDescription));
        clearTasksBtn.addEventListener('click', () => {
            this.clearTasks(tasksList);
            clearTasksBtn.disabled = !this.tasks.length;
        });

        tasksList.addEventListener('click', event => {
            const target = event.target;

            if (target.classList.contains('task') || target.classList.contains('task__title')) {
                this.redirectToTaskInfo(target.dataset.id);
            }

            if (target.classList.contains('task__btn-remove')) {
                this.removeTask(target, clearTasksBtn);
            }

            if (target.classList.contains('task__btn-done')) {
                this.doneTask(target);
            }

        });
    }

    addTask(tasksList, addTaskInput, addTaskBtn, clearTasksBtn, addTaskDescription) {
        const title = addTaskInput.value.trim(),
            id = Utils.generateID(),
            description = addTaskDescription.value.trim();

        const newTask = {
            id,
            title,
            description,
            status: 'In Progress'
        };

        this.tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));

        tasksList.insertAdjacentHTML('beforeEnd', this.getTaskHTML(newTask));

        this.clearAddTask(addTaskInput, addTaskBtn, addTaskDescription);

        clearTasksBtn.disabled = !this.tasks.length;

        this.renderInfoUnderTasks();
    }

    clearTasks(tasksList) {
        if (confirm('Are you sure? Delete all tasks?')) {
            this.tasks.length = 0;
            tasksList.textContent = '';
            localStorage.clear();

            this.renderInfoUnderTasks();

            this.showNotification({
                top: 10,
                right: 10,
                html: 'Список задач ПУСТ '
            });
        }


    }

    getTaskHTML(task) {
        return `
            <div class="task" data-id="${task.id}" id="${task.id}">
                <a class="task__title" data-id="${task.id}">${task.title}</a>
                
                <div class="task__buttons">
                    <a class="task__btn-edit button" href="#/task/${task.id}/edit">Edit</a> 
                    <a class="task__btn-done button">Done</a> 
                    <a class="task__btn-remove button">Remove</a>   
                </div>                            
            </div>
        `;
    }

    clearAddTask(addTaskInput, addTaskBtn, addTaskDescription) {
        addTaskInput.value = '';
        addTaskBtn.disabled = true;
        addTaskDescription.value = '';
    }

    redirectToTaskInfo(id) {
        location.hash = `#/task/${id}`;
    }

    removeTask(target, clearTasksBtn) {
        if (confirm('Are you sure?')) {
            const taskContainer = target.parentNode.parentNode;

            this.tasks = this.tasks.filter(task => task.id !== taskContainer.dataset.id);
            localStorage.setItem('tasks', JSON.stringify(this.tasks));

            taskContainer.remove();

            this.renderInfoUnderTasks();
        }

        if (!this.tasks.length) {

            clearTasksBtn.disabled = true;

            this.showNotification({
                top: 10,
                right: 10,
                html: 'Список задач ПУСТ '
            });

            localStorage.clear();
        }
    }

    doneTask(target) {
        if (confirm('Are you sure?')) {
            const taskContainer = target.parentNode.parentNode;

            taskContainer.classList.add('done');

            this.tasks = this.tasks.filter(task => {
                if (task.id === taskContainer.dataset.id) {
                    task.status = 'Done';
                }
                return task;
            });
            localStorage.setItem('tasks', JSON.stringify(this.tasks));

            target.previousElementSibling.remove();
            target.remove();

            this.renderInfoUnderTasks();

        }
    }

    showNotification(options) {

        let notification = document.createElement('div');
        notification.className = "notification";

        notification.style.top = (options.top || 0) + 'px';
        notification.style.right = (options.right || 0) + 'px';

        notification.innerHTML = options.html;
        document.body.appendChild(notification);

        setTimeout(function () {
            document.body.removeChild(notification);
        }, 2500);
    }

}

export default TasksList;