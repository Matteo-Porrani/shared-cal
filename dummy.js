// 1.
// this will create a date object for current day
const today = new Date();
console.log(today);

console.log(today.toString());
// Thu Jul 28 2022 22:20:19 GMT+0200 (heure d’été d’Europe centrale)
console.log(today.toDateString());
// Thu Jul 28 2022
console.log(today.toLocaleDateString());
// 28/07/2022

// 2.
// this will create a date object from a string
const someday = new Date('2022-08-01T11:30:00+02:00');
console.log(someday);

console.log(someday.toString());
// Mon Aug 01 2022 11:30:00 GMT+0200 (heure d’été d’Europe centrale)


// 3.
// this will create a date object from 3 numerical arguments
const otherday = new Date(2022, 7, 1);
console.log(otherday);

console.log(otherday.toString());
// Mon Aug 01 2022 00:00:00 GMT+0200 (heure d’été d’Europe centrale)


//.4
// this will create a date from a different kind of string
const birthday = new Date('May 31, 1978');
console.log(birthday);



