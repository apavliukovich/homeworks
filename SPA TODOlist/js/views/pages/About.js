import Component from '../../views/Component.js';

class About extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
                <div class="about"> 
                    <h1 class="page-title">Welcome!</h1>                   
                    <p class="about__info">So, here is an application, where you can manage information about your daily tasks.<br>Enjoy!</p>
                    <a class="about__btn-start button" href="#/tasks" title="Click here to get started!">Start using</a>
                </div>
            `);
        });
    }
}

export default About;