
export const getDate = function() {
    var date = new Date()
    return date
}
export const getDifferenceDay = function(currentDate, previousDate) {
    if (currentDate == null || previousDate == null) return -1
    return Math.round((currentDate - previousDate)/(1000*60*60*24)) 
}

export const getDifferenceMinuteSeconds = function(currentDate, previousDate) {
    if (currentDate == null || previousDate == null) return [-1,-1]
    let diff = Math.abs(currentDate.getTime() - previousDate.getTime())
    return [Math.floor(diff/(1000*60)), Math.floor(diff/1000)%60]
}

export const getMillisecondDifference = function(currentDate, previousDate) {
    if (currentDate == null || previousDate == null) return -1
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
    if (currentDate == null || previousDate == null) return -1
    const mon_diff = {0:-6, 1:0, 2: -1, 3: -2, 4: -3, 5: -4, 6: -5}
    const monCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + mon_diff[currentDate.getDay()])
    const monPreviousDate = new Date(previousDate.getFullYear(), previousDate.getMonth(), previousDate.getDate() + mon_diff[previousDate.getDay()])
    return Math.floor(getDifferenceDay(monCurrentDate, monPreviousDate)/ 7)
}

export const determineIfBetweenTime = function (startTime, endTime, marginMinutes=10) {
    if (startTime == null || endTime == null) return false
    // parse params
    const startTimeHrs = parseInt(startTime.split(":")[0])    
    const startTimeMin = parseInt(startTime.split(":")[1])    
    const endTimeHrs = parseInt(endTime.split(":")[0])    
    const endTimeMin = parseInt(endTime.split(":")[1])    
   
    // get current time
    const time = new Date()
    const currentHrs = time.getHours()
    const currentMin = time.getMinutes()
    if (startTimeMin-marginMinutes <= currentMin && endTimeMin+marginMinutes >= currentMin && 
        startTimeHrs <= currentHrs && endTimeHrs >= currentHrs) 
    {
        return true
    } else {
        return false
    }
}

export const sortTimeFunction = function (a, b) {
    // if bad habit we are going it last
    if (a["isBadHabit"] && !b["isBadHabit"]) return 1;
    if (b["isBadHabit"] && !a["isBadHabit"]) return -1;
    if (b["isBadHabit"] && a["isBadHabit"]) return 0;
    if (a["startTime"] == null || b["startTime"] == null) return 0;
    const aStartTime = a["startTime"]
    const bStartTime = b["startTime"]
    const aStartTimeHrs = parseInt(aStartTime.split(":")[0])    
    const aStartTimeMin = parseInt(aStartTime.split(":")[1])    
    const bStartTimeHrs = parseInt(bStartTime.split(":")[0])    
    const bStartTimeMin = parseInt(bStartTime.split(":")[1])    


    if (aStartTimeHrs > bStartTimeHrs) return 1;
    else if (aStartTimeHrs === bStartTimeHrs && aStartTimeMin > bStartTimeMin) return 1; 
    else if (aStartTimeHrs < bStartTimeHrs) return -1; 
    else if (aStartTimeHrs === bStartTimeHrs && aStartTimeMin < bStartTimeMin) return -1;
    else return 0; 
}