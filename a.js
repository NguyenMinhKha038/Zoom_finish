const arr = [];


function generateRandomNumber1() {
    return Math.round(Math.random()*100) ;
}

function generateRandomNumber2() {
    return console.log(+(Math.random()*50).toString().substr(2,2));
}
generateRandomNumber2();