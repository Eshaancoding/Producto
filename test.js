function getDay () {
    var date = new Date()
    return date
}
function getDifferenceDay (currentDate, previousDate) {
    return Math.round((currentDate - previousDate)/(1000*60*60*24))
}

function getWeekDifference (currentDate, previousDate) {
    const mon_diff = {0:-6, 1:0, 2: -1, 3: -2, 4: -3, 5: -4, 6: -5}
    const monCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + mon_diff[currentDate.getDay()])
    const monPreviousDate = new Date(previousDate.getFullYear(), previousDate.getMonth(), previousDate.getDate() + mon_diff[previousDate.getDay()])
    return Math.floor(getDifferenceDay(monCurrentDate, monPreviousDate)/ 7)
}

const previousDay = 26
const previousMonth = 5
const previousYear = 2022
const previousDate = new Date(previousYear, previousMonth, previousDay)

const currentDay = 27 
const currentMonth = 5
const currentYear = 2022
const currentDate = new Date(currentYear, currentMonth, currentDay)

console.log("Current date", currentDate.getDate(), currentDate.getMonth() + 1, currentDate.getFullYear())
console.log("Previous date", previousDate.getDate(), previousDate.getMonth() + 1, previousDate.getFullYear())

console.log("Difference day:",getDifferenceDay(currentDate, previousDate))
console.log("Week difference",getWeekDifference(currentDate, previousDate))


function roundtoSecond (num) {
    return Math.round((num + Number.EPSILON) * 100) / 100
}

console.log(roundtoSecond(16/234))