const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

const deadLine = document.querySelector(".deadline");
const giveAway = document.querySelector(".giveaway");
const items = document.querySelectorAll('.deadline-format h4'); // grabbing the h4 in the deadline-format div

// months are 0 index based so it starts from 0
// hours are in 24 hr format
// Date(year,month,date,hours,minute,seconds);


let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// let futureDate = new Date(2022, 3, 21, 21, 30, 55);

const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0); 

// easy to extract
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
 
// hard to extract
let month = futureDate.getMonth();
month = months[month]; 
let date = futureDate.getDate();
let day = futureDate.getDay();
day = weekdays[day];

giveAway.textContent = `giveaway ends on ${day} ${date} ${month} ${year} ${hours}:${minutes} am`;

// future time in millisecond...getTime() gives time in milliseconds
const futureTime = futureDate.getTime();

function getRemainingTime() {
    const today = new Date().getTime();
    const remaining = futureTime - today;

    // values in milliseconds ~ this way it's clean ~
    const oneMinute = 60 * 1000;
    const oneDay = 24 * 60 * oneMinute;
    const oneHour = 60 * oneMinute;

    // calculate all values
    let days = remaining / oneDay;
    days = Math.floor(days);
    let hours = (remaining % oneDay) / oneHour;
    hours = Math.floor(hours);
    let minutes = (remaining % oneHour) / oneMinute;
    minutes = Math.floor(minutes);
    let seconds = (remaining % oneMinute) / 1000;
    seconds = Math.floor(seconds);

    // set values array
    const values = [days, hours, minutes, seconds];

    function format(item) {
        if (item < 10) {
            return item = `0${item}`;
        }
        else {
            return item;
        }
    }

    items.forEach(( (item, index)=> { // use arrow function 
        item.innerHTML = format(values[index]);
    )});

    if (remaining < 0) {
        clearInterval(countdown);    
        deadLine.innerHTML = `<h4 class="expired">Sorry, this giveaway has expired</h4>`;
    }
}

// countdown
let countdown = setInterval(getRemainingTime, 1000);

// invoking getRemainingTime aftr countdwn is very imp
getRemainingTime();