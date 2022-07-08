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

export const hoursToString = function(value, full=false) {
    const hours = Math.floor(value)
    const minutes = Math.floor((value - hours) * 60)
    var hoursString = ""
    var minutesString = ""
    var suffix = (is_min) => { 
        if (is_min) {
            if (minutes > 1) {
                if (full) return " minutes "
                else return " mins "
            } else {
                if (full) return " minute "
                else return " min "
            }
        } else {
            if (hours > 1) {
                if (full) return " hours "
                else return " hrs "
            } else {
                if (full) return " hour "
                else return " hr "
            }
        }
    }  

    // fill in hoursString and minutesString
    if (hours > 0) {
        hoursString = hours.toString() + suffix(false)
    }
    if (minutes > 0 || (minutes === 0 && hours === 0)) {
        minutesString = minutes.toString() + suffix(true) 
    }
    return hoursString + minutesString 
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