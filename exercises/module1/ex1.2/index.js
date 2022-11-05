
function addDateTime(message) {
    const dateTimeNow = new Date();
    console.log(dateTimeNow.toLocaleDateString()); // 17/08/2020
    console.log(dateTimeNow.toLocaleTimeString()); // 13:26:15

    return dateTimeNow.toDateString() + " " + dateTimeNow.toLocaleTimeString() + " : " + message;
}

alert(addDateTime("Ceci est un test"))