//TAsk 1
function Animal(name) {
    this._foodAmount = 50;
    this._name = name;
}
    Animal.prototype._getFormattedFoodAmount = function() {
        return this._foodAmount + 'гр.';
    }

    Animal.prototype.dailyNorm = function(amount) {
        if (!arguments.length) return this._foodAmount;

        if (amount < 50 || amount > 500) {
            return 'Недопустимое количество корма.';
        }

        this._foodAmount = amount;
    }

    Animal.prototype.feed = function() {
        return 'Насыпаем в миску ' + this._getFormattedFoodAmount() + ' корма.';
    }


function Cat(name) {
    Animal.apply(this, arguments);
}

    Cat.prototype = Object.create(Animal.prototype);
    Cat.prototype.constructor = Cat;

    Cat.prototype.feed = function (){
        console.log(Animal.prototype.feed.apply(this,arguments)+'\n'+'Кот доволен ^_^') ;
        return this;
    }

    Cat.prototype.stroke = function(){
        console.log('Гладим кота.');
        return this;
    }


var barsik = new Cat('Барсик');

console.log(barsik._name);

console.log(barsik.dailyNorm(250));
console.log(barsik.feed().stroke());

barsik = null;


//Task 2
function makeCopy(Obj) {
    if(Obj == null || typeof(Obj) != 'object') return Obj;

    var value;
    var clone = Array.isArray(Obj) ? [] : {};

    for (var k in Obj) {
        value = Obj[k];
        clone[k] = (typeof value === "object") ? makeCopy(value) : value;
    }

    return clone;
}

var original = {
    name: 'Vasya',
    surname:'Dron',
    arr:[1,2,3],
    v:{
        patronym:[1,{it: function(){}},4],
        cat : 3
    }
};
var copy = makeCopy(original);
console.log(copy);

//Task 3
function isEqual(aObj, bObj) {
    if (aObj instanceof Number || aObj instanceof String || aObj instanceof Boolean) {
        aObj = aObj.valueOf();
    }
    if (bObj instanceof Number || bObj instanceof String || bObj instanceof Boolean) {
        bObj = bObj.valueOf();
    }

    if (aObj === bObj) {
        return true;
    }

    if (aObj == null || typeof aObj != "object" || bObj == null || typeof bObj != "object") {
        return false;
    }

    if (Object.keys(aObj).length !== Object.keys(bObj).length) {
        return false;
    }

    for (var k in bObj) {
        if (!(k in aObj) || !isEqual(aObj[k], bObj[k])) {
            return false;
        }
    }

    return true;
}

var a = {name:'Vasya', surname: 'Grisha', arr:[1,2,3], y:{patronym:'Evgen'}};
var b = {name:'Vasya', surname: 'Grisha', arr:[1,2,3], y:{patronym:'Evgen'}};


console.log(isEqual(a,b));


