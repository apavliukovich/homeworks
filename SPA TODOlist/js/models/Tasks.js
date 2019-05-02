import Utils from '../helpers/Utils.js';

class Tasks {
    constructor() {
        this.defaultTasks = [
            {
                id: Utils.generateID(),
                title: 'Task 1',
                description: 'Task 1',
                status: 'In Progress'
            },
            {
                id: Utils.generateID(),
                title: 'Task 2',
                description: 'Task 2',
                status: 'In Progress'
            },
            {
                id: Utils.generateID(),
                title: 'Task 3',
                description: 'Task 3',
                status: 'In Progress'
            },
            {
                id: Utils.generateID(),
                title: 'Task 4',
                description: 'Task 4',
                status: 'In Progress'
            },
            {
                id: Utils.generateID(),
                title: 'Task 5',
                description: 'Task 5',
                status: 'In Progress'
            }
        ];
    }

    getDefaultTasks() {
        return this.defaultTasks;
    }
}

export default Tasks;