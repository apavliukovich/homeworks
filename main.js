function func(obj){
    var newObj = {};
    var firstNames = [];
    var nameObj = {};


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
                nameObj[elementNext] = counter;
            }
        }

        if(nameObj[elementPrevious] <= 1){
            delete nameObj[elementPrevious];
        }

    }
    newObj['Дублирующиеся значения'] = nameObj;

    return newObj;
}

var names = { name_one: 'Piotr',
    name_two: 'Vasya',
    name_three: 'Fedya',
    name_four: 'Piotr',
    name_five: 'Fedya'};

func(names);


