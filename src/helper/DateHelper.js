export const getDate = function() {
    var date = new Date()
    return date
}
export const getDifferenceDay = function(currentDate, previousDate) {
    return Math.round((currentDate - previousDate)/(1000*60*60*24)) 
}

export const getDifferenceMinuteSeconds = function(currentDate, previousDate) {
    let diff = Math.abs(currentDate.getTime() - previousDate.getTime())
    return [Math.floor(diff/(1000*60)), Math.floor(diff/1000)%60]
}

export const getMillisecondDifference = function(currentDate, previousDate) {
    let diff = Math.abs(currentDate.getTime() - previousDate.getTime())
    return diff%1000
}

export const dayToString = function (day) {
    var dict = {0: "sunday", 1: "monday", 2: "tuesday", 3: "wednesday", 4: "thursday", 5: "friday", 6: "saturday"}
    return dict[day]
}

export const getWeekDifference = function (currentDate, previousDate) {
    const mon_diff = {0:-6, 1:0, 2: -1, 3: -2, 4: -3, 5: -4, 6: -5}
    const monCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + mon_diff[currentDate.getDay()])
    const monPreviousDate = new Date(previousDate.getFullYear(), previousDate.getMonth(), previousDate.getDate() + mon_diff[previousDate.getDay()])
    return Math.floor(getDifferenceDay(monCurrentDate, monPreviousDate)/ 7)
}