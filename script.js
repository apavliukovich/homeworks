//TASK 1

{
    let name = prompt('Введите ваше имя!');

    const person = {
        name,
        sayHi() {
            alert(`Hi ${this.name}`)
        }
    };
    person.sayHi();
}

//TASK 2

{
    function calc({a: x, b: y}, z = 1) {

        return (x ** y) * z
    }

    calc({a: 2, b: 3}, 23);
}

//TASK 3

{
    const nameAge = ['Vasya', 25];

    function sayHello(name, age) {

        alert(`Hello, I'm ${name} and I'm ${age} years old.`)
    }

    sayHello(...nameAge);
}

//TASK 4

{

    function show(...arr) {
        for (let value of arr) {
            console.log(value);
        }
    }

    show(1, 2, 3, 4);
}

//TASK 5

{
    function countVowelLetters(text) {
        text = text.toLowerCase().split('');

        const vowelLetters = ['а', 'я', 'ы', 'и', 'о', 'ё', 'у', 'ю', 'э', 'е', 'a', 'e', 'i', 'o', 'u', 'y'];

        let counter = 0;

        text.forEach(item => vowelLetters.includes(item) && counter++);

        return counter

        //Регулярное выражение
        //return text.match(/[аяыоёуиюэе]/ig).length
    }

    countVowelLetters('Шла Саша по шоссе И сосала сУшку');
}

//TASK 6

{
    const arrObj = [
        {name: 'Vasya Pupkin', age: 25},
        {name: 'Ivan Petrov', age: 30},
        {name: 'Fedor Ivanov', age: 42}
    ];

    function getObj(arr) {
        const result = {};

        result['Пользователи младше 40'] = arr.filter(item => item.age < 40);

        result['Пользователь с именем Федор'] = arr.find(item => item.name.includes('Fedor'));

        return result
    }

    getObj(arrObj);
}

//TASK 7

{
    function getArrOfObj(...arrOfNames) {
        return arrOfNames.map((item, i) => {
            const obj = {};
            obj[`User ${i + 1}`] = item;

            return obj

        });
    }

    getArrOfObj('Вася', 'Петя', 'Григорий')
}

//TASK 8

{
    const arrOfObj = [
        {name: 'Vasya'},
        {name: 'Piotr', age: 25},
        {salary: '2000$'}
    ];

    function combine(arr) {

        return Object.assign({}, ...arr);

    }

    combine(arrOfObj);
}

//TASK 9

{
    class Animal {

        constructor(name) {
            this._foodAmount = 50;
            this._name = name;
        }

        _getFormattedFoodAmount() {
            return this._foodAmount + 'гр.';
        }

        dailyNorm(amount) {
            if (!arguments.length) return this._foodAmount;

            if (amount < 50 || amount > 500) {
                return 'Недопустимое количество корма.';
            }

            this._foodAmount = amount;
        }

        feed() {
            return `Насыпаем в миску ${this._getFormattedFoodAmount()} корма.`;
        }

    }

    class Cat extends Animal {

        constructor(name) {
            super(name);
        }

        feed() {
            console.log(`${super.feed()}
            Кот доволен ^_^`);
            return this;
        }

        stroke() {
            console.log('Гладим кота.');
            return this;
        }
    }


    const barsik = new Cat('Барсик');

    console.log(barsik._name);

    console.log(barsik.dailyNorm(250));
    console.log(barsik.feed().stroke());
}