import Utils from '../helpers/Utils.js';

class Component {
    constructor() {
        this.request = Utils.parseRequestURL();
        this.tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    afterRender() {}
}

export default Component;