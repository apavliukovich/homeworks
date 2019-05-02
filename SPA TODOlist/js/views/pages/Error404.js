import Component from '../../views/Component.js';

class Error404 extends Component{
    render() {
        return new Promise(resolve => {
            resolve(`                
                <h1 class="page-title">404 Error - Page Not Found</h1>              
            `);
        });
    }
}

export default Error404;