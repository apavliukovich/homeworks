import Utils from './helpers/Utils.js';

import Header from './views/partials/Header.js';
import Footer from './views/partials/Footer.js';

import About from './views/pages/About.js';
import Error404 from './views/pages/Error404.js';

import AddAndList from './views/pages/tasks/AddAndList.js';
import InfoAndEdit from './views/pages/tasks/InfoAndEdit.js';

const Routes = {
    '/': About,
    '/tasks': AddAndList,
    '/task/:id': InfoAndEdit,
    '/task/:id/edit': InfoAndEdit
};

function router() {
    const headerContainer = document.getElementsByClassName('header-container')[0],
          contentContainer = document.getElementsByClassName('content-container')[0],
          footerContainer = document.getElementsByClassName('footer-container')[0],
          header = new Header(),
          footer = new Footer();

    header.render().then(html => {
        headerContainer.innerHTML = html;
        header.afterRender();
    });

    const request = Utils.parseRequestURL(),
        parsedURL = `/${request.resource || ''}${request.id ? '/:id' : ''}${request.action ? `/${request.action}` : ''}`,
        page = Routes[parsedURL] ? new Routes[parsedURL]() :  new Error404();

    page.render().then(html => {
        contentContainer.innerHTML = html;
        page.afterRender();
    });

    footer.render().then(html => {
        footerContainer.innerHTML = html;
        footer.afterRender();
    });
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);