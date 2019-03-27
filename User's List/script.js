var button = document.getElementById('button');
var body = document.getElementsByTagName('body')[0];

button.addEventListener('click', getInfo);

function getInfo(event) {
    //Чтобы при повторном нажатии на кнопку не отображало еще одно окно
    if (document.getElementById('1')) {
        event.preventDefault()
    } else {
        if (localStorage.getItem('key')) {
            var obj = JSON.parse(localStorage.getItem('key'));

            //Блок со вкладками пользователей
            var wrap = document.createElement('div');
            wrap.classList.add('wrap');

            for (var i = 1; i <= obj.length; i++) {
                var element = document.createElement('div');
                element.classList.add('user');
                element.textContent = 'User ' + i;
                element.id = i;
                wrap.appendChild(element);
            }
            body.appendChild(wrap);

            //Главный блок с аватаркой и именами
            var mainBlock = document.createElement('div');
            mainBlock.classList.add('main-block');

            //Div с автаркой и сразу задаем ей фото первого пользователя
            var divImg = document.createElement('div');
            var img = document.createElement('img');
            img.src = obj[0].avatar;
            img.classList.add('main-block-avatar');
            divImg.appendChild(img);
            mainBlock.appendChild(divImg);

            //Div с именами
            var description = document.createElement('div');
            description.classList.add('main-block-description');
            description.innerHTML = '<span class="main-block-description-firstName"></span><span></span>';
            mainBlock.appendChild(description);

            var firstName = description.children[0];
            var lastName = description.children[1];

            //Задаем Имя первого пользователя
            firstName.innerHTML = 'First Name: ' + obj[0].first_name;
            lastName.innerHTML = 'Last Name: ' + obj[0].last_name;

            //Делаем первую вкладку активной
            var userOne = document.getElementById('1');
            userOne.classList.add('checked');

            //Обработка переключения вкладок
            wrap.addEventListener('click', showAnotherUser);

            function showAnotherUser(evt) {
                var target = evt.target;

                if (target.classList.contains('user')) {
                    img.src = obj[target.id - 1].avatar;
                    firstName.innerHTML = 'First Name: ' + obj[target.id - 1].first_name;
                    lastName.innerHTML = 'Last Name: ' + obj[target.id - 1].last_name;

                    var elem = document.getElementsByClassName('checked')[0];
                    elem.classList.remove('checked');
                    target.classList.add('checked');
                }
            }

            body.appendChild(mainBlock);
        } else {

            var xhr = new XMLHttpRequest();

            xhr.open('GET', 'https://reqres.in/api/users?page=2', true);

            xhr.onload = function () {
                try {
                    var data = JSON.parse(this.response).data;
                } catch (error) {
                    console.log(error.name + ' : ' + error.message);
                }

                localStorage.setItem('key', JSON.stringify(data));

                //Блок со вкладками пользователей
                var wrap = document.createElement('div');
                wrap.classList.add('wrap');

                for (var i = 1; i <= data.length; i++) {
                    var element = document.createElement('div');
                    element.classList.add('user');
                    element.textContent = 'User ' + i;
                    element.id = i;
                    wrap.appendChild(element);
                }
                body.appendChild(wrap);

                //Главный блок с аватаркой и именами
                var mainBlock = document.createElement('div');
                mainBlock.classList.add('main-block');

                //Div с автаркой и сразу задаем ей фото первого пользователя
                var divImg = document.createElement('div');
                var img = document.createElement('img');
                img.src = data[0].avatar;
                img.classList.add('main-block-avatar');
                divImg.appendChild(img);
                mainBlock.appendChild(divImg);

                //Div с именами
                var description = document.createElement('div');
                description.classList.add('main-block-description');
                description.innerHTML = '<span class="main-block-description-firstName"></span><span></span>';
                mainBlock.appendChild(description);

                var firstName = description.children[0];
                var lastName = description.children[1];

                //Задаем Имя первого пользователя
                firstName.innerHTML = 'First Name: ' + data[0].first_name;
                lastName.innerHTML = 'Last Name: ' + data[0].last_name;

                //Делаем первую вкладку активной
                var userOne = document.getElementById('1');
                userOne.classList.add('checked');

                //Обработка переключения вкладок
                wrap.addEventListener('click', showAnotherUser);

                function showAnotherUser(evt) {
                    var target = evt.target;

                    if (target.classList.contains('user')) {
                        img.src = data[target.id - 1].avatar;
                        firstName.innerHTML = 'First Name: ' + data[target.id - 1].first_name;
                        lastName.innerHTML = 'Last Name: ' + data[target.id - 1].last_name;

                        var elem = document.getElementsByClassName('checked')[0];
                        elem.classList.remove('checked');
                        target.classList.add('checked');
                    }
                }

                body.appendChild(mainBlock);

            };

            xhr.onerror = function () {
                console.log(this.status + ' - ' + this.statusText);
                var error = document.createElement('div');

                error.classList.add('error');
                error.textContent = 'Упс, что-то пошло не так!';

                body.appendChild(error);
            };

            xhr.onloadend = function () {
                console.log('Запрос завершен');
            };

            xhr.send();
        }
    }
}