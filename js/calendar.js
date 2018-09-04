
function Calendar() {
    // labels for the days of the week
    this.daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    // months array in order
    this.monthsName = ['January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'];

    // the days of the week for each month, in order
    this.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}
// add ordinal i.e 1st, 2nd, 3rd and 4th
Calendar.prototype.dateOrdinal = function (date) {

    // number ordinal labels
    numberOrdinal = { 0: 'th', 1: 'st', 2: 'nd', 3: 'rd', 4: 'th', 5: 'th', 6: 'th', 7: 'th', 8: 'th', 9: 'th'};
    
    let i;
    if ( date >= 30 ) {
        i = date - 30;
    } else if (date >= 20) {
        i = date - 20;
    } else if (date >= 10) {
        i = date - 10;
    } else {
        i = date;
    }
    return numberOrdinal[i];
}
// the current date
Calendar.prototype.getToday = function () {
    let todayObj = new Date();
    let today = todayObj.getDate();
    let weekday = todayObj.getDay();
    let month = todayObj.getMonth();
    let year = todayObj.getFullYear();
    
    return { today:today, weekday:weekday, month:month, year:year };
}
// Tue 4th September 2018
Calendar.prototype.readableDate = function (date) {
    let todaysName = this.daysOfWeek[this.startMonday(date.weekday)];
    let readableDate = todaysName + '&nbsp;' + date.today + '<sup>' + this.dateOrdinal(date.today) + '</sup>' + '&nbsp;' + this.monthsName[date.month] + "&nbsp;" + date.year;
    return readableDate;
};
// make Monday start of the week
Calendar.prototype.startMonday = function (day) {
    if (day == 0) {
        day += 6;
    } else {
        day -= 1;
    }
    return day;
};
// Month properties
Calendar.prototype.monthProps = function (dateObj) {
    
    let year = dateObj.year;
    let month = dateObj.month;

     
    let startOfMonth = new Date(year, month, 1); // first day of month
    let startOfWeek = startOfMonth.getDay();
    let lengthOfMonth = this.daysInMonth[month]; // number of days this month
    let leapYear = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
    
    // February - leap year
    if (month == 1 && leapYear) {
            lengthOfMonth = 29;
      };
    
    return { startOfMonth:startOfWeek, lengthOfMonth:lengthOfMonth};
}
Calendar.prototype.calendarTitle = function (dateStr) {
    let html = "";
    html += '<table class="calendar-table">';
    html += '<tr><th colspan="7">';
    html += dateStr;
    html += '</th></tr>';
    html += '<tr class="calendar-header">';
    for (let i = 0; i <= 6; i++) {
        html += '<td class="calendar-header-day">';
        html += this.daysOfWeek[i];
        html += '</td>';
    }
    html += '</tr><tr>';

    return html;
}
Calendar.prototype.calendarRow = function (today, monthDetails, i) {
    let html = "";
    let lengthOfMonth = monthDetails.lengthOfMonth;
    let startOfMonth = monthDetails.startOfMonth;
    this.dayCounter= dayCounter + 1;

    // loop for weekdays (cells)
    for (let dayOfWeek = 1; dayOfWeek <= 7; dayOfWeek++) {

        html += '<td class="calendar-day';

        // Add today class          
        if (dayCounter == today) { html += ' today'; }

        // start adding calendar days from startingDayOfTheWeek
        if (i > 0 || dayOfWeek >= startOfMonth) {
            html += `" id = "day">${dayCounter}`;
            dayCounter++;
        } else {
            html += `">`;
        }
        html += '</td>';
    }
    // stop at end of month
    if (dayCounter > lengthOfMonth) {
        return html;
    } else {
        html += '</tr><tr>';
    }

    return html
}
Calendar.prototype.calendarBody = function (monthDetails, todaysDate) {

    let html = "";
    let today = todaysDate.today;
    this.dayCounter = 0

    // loop for weeks (rows)
    for (let i = 0; i < 6; i++) {

        html += this.calendarRow(today, monthDetails, i);

    }
    html += '</tr></table>';
    return html;
}
// Build calendar HTML
Calendar.prototype.calendarHTML = function() {

    let todaysDate = this.getToday(); 
    let monthDetails = this.monthProps(todaysDate);
    let readableDate = this.readableDate(todaysDate);
    let html = '';
    
    startOfMonth = this.startMonday(monthDetails.startOfMonth);

    html += this.calendarTitle(readableDate);
    html += this.calendarBody(monthDetails, todaysDate);
    
    return html;
}
