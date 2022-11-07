const date = new Date()

let dateTime = {
    date: date.toLocaleDateString(),
    time: (date.getHours()-3) + ":" + date.getMinutes() + ":" + date.getSeconds(),
    date_time: date.toLocaleDateString().toLocaleString() + " " +  (date.getHours()-3) + ":" + date.getMinutes() + ":" + date.getSeconds(),
}

module.exports = dateTime;