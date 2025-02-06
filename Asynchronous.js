//Asynchronous Prograamming
console.log('Put the water to boil');
console.log('Water is boiling');
sertTimeout(()=> {

    console.log('Boiling water is poured into the cup');
}, 5000)
console.log('The tea is ready');