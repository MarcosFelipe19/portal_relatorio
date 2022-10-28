const date = new Date();

let dateTime = {
    date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
    time: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
    date_time: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + " " + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}

module.exports = dateTime;