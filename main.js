function func(obj){
    var newObj = {};
    var firstNames = [];
    var doubleNameObj = {};


    for (var k in obj){
        newObj[k+`_length`] = obj[k].length;
        firstNames.push(obj[k]);
    }

    for(var i = 0; i < firstNames.length; i++){
        var elementPrevious = firstNames[i];
        var counter = 0;

        for(var j = 0; j < firstNames.length; j++){
            var elementNext = firstNames[j];
            if(elementPrevious === elementNext){
                counter++;
                doubleNameObj[elementNext] = counter;
            }
        }

        if(doubleNameObj[elementPrevious] <= 1){
            delete doubleNameObj[elementPrevious];
        }

    }
    newObj['Дублирующиеся значения'] = doubleNameObj;

    return newObj;
}

var names = { name_one: 'Piotr',
    name_two: 'Vasya',
    name_three: 'Fedya',
    name_four: 'Piotr',
    name_five: 'Fedya'};

func(names);


