//Task 1
function isPalyndrome(word){
    return (word.toLowerCase() === word.toLowerCase().split('').reverse().join(''))? true : false;
}

console.log(isPalyndrome('Шалаш'))

//Task 2
function isAnagram(a,b){
    return (a.toLowerCase().split('').sort().join('') === b.toLowerCase().split('').sort().join('')) ? true : false;
}

console.log(isAnagram('кот', 'отко'))

//Task 3
function divideArr(arr,n){
    var result = [];

    while(arr.length) result.push(arr.splice(0,n));

    return result
}

console.log(divideArr([1, 2, 3, 4, 5], 2))

//Task 4
function getNumberOfVowel(str){
    var vowel = ["а", "о", "и", "е", "ё", "э", "ы", "у", "ю", "я"];
    var selfstr = str.toLowerCase().split('');
    var count = 0;

    for(var i = 0; i < vowel.length; i++) {
        // if(selfstr.indexOf(vowel[i]) > 0){
        //     count++;
    // }
        for(var j = 0; j < selfstr.length; j++){
            if(vowel[i] === selfstr[j]) count++;
        }
    }

    return count
}

console.log(getNumberOfVowel('Привет, всем МИР!'))

//Task 5
function countRepeat(p) {
    var strArr = p.toLowerCase().split(' ');
    var strStr = strArr.join(' ');
    var maxCount,
        repeatWord,
        obj = {},
        arrKey = [],
        arrValues = [];

    for(var i = 0; i < strArr.length-i-1; i++) {
        obj[strArr[i]] = strStr.split( strArr[i]).length-1;
    }

    for(var k in obj){
        arrKey.push(k);
        arrValues.push(obj[k]);
    }

    maxCount = arrValues[0];
    for(var j = 0; j < arrK.length; j++){
        if(maxCount <= arrValues[j]){
            maxCount = arrValues[j];
            repeatWord = '"' + arrKey[j] + '"';
        }
    }

    return 'Максимальное число повторений у слова '+ repeatWord+ ' - ' +maxCount+'.'
}

var str = 'Привет привет как дела привеТ дела дела дела';

console.log(countRepeat(str))

//Task 6
function doSmth(p){
    var str1 = p.split('?').join('.');
    var str2 = str1.split('!').join('.');
    var arr = str2.split('.');

    arr.pop();// Предполагаем, что любой текст заканчиватеся .,!,?. Либо вомзожен вариант ниже
    // for(var j = 0; j < arr.length; j++){
    //     if(arr[i] === "" ) arr.splice(i,1)
    // }
    for (var i = 0; i < arr.length; i++){
        var comma = arr[i].split(',').join('');
        var dash = comma.split('-').join('');
        var strLength = dash.split(' ').join('').length;
        console.log('Строка: '+arr[i]+' - Количество букв в строке - '+ strLength);

    }

}

var p = 'Сегодня понедельник! Я, например, делаю домашнюю работу? Периодически.';

doSmth(p);