import Utils from '../helpers/Utils.js';

class Component {
    constructor() {
        this.request = Utils.parseRequestURL();
    }

    afterRender() {}
}

export default Component;