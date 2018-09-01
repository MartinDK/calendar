// TODO: Make calendar.js a module

// made a change using Textastic

// labels for the days of the week
daysName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// human-readable month name labels, in order
monthsName = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'
];

// number ordinal labels
numberOrdinal = { 0:'th', 1:'st', 2:'nd', 3:'rd', 4:'th', 5:'th', 6:'th', 7:'th', 8:'th', 9:'th'}

// the days of the week for each month, in order
daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// add number ordinal i.e 1st, 2nd, 3rd and 4th
function addNumberOrdinal(day) {
    var i;
    if ( day >= 30 ) {
        i = day - 30;
    } else if (day >= 20) {
        i = day - 20;
    } else if (day >= 10) {
        i = day - 10;
    } else {
        i = day;
    }
    return numberOrdinal[i];
}

// make Monday first day of the week
function adjustForMondayStart(adjustedDay) {
    if (adjustedDay == 0) {
        adjustedDay += 6;
    } else {
        adjustedDay -= 1;
    }
    return adjustedDay;
};

// create Calendar object
function Calendar() {
    // the current date
    const todayObj = new Date();
    
    // TODO: take variables out of global scope.
    today = todayObj.getDate() ;
    weekday = todayObj.getDay() ;
    month = todayObj.getMonth() ;
    year = todayObj.getFullYear() ;
    var html = '';
}

// generate Calendar HTML
Calendar.prototype.generateCalendarHTML = function() {
    // get first day of month
    var firstDay = new Date(year, month, 1);
    var startingDayOfTheWeek = firstDay.getDay();

    // number of days in month
    var monthLength = daysInMonth[month];

    // compensate for leap year
    if (month == 1) { // February only!
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            monthLength = 29;
        }
    }
    // make Monday the first day of the week
    cal_day_of_the_week = daysName[adjustForMondayStart(weekday)];
    startingDayOfTheWeek = adjustForMondayStart(startingDayOfTheWeek);

    // build the calendar header
    var monthName = monthsName[month]
    var html = '';
    html += '<table class="calendar-table">';
    html += '<tr><th colspan="7">';
    html += cal_day_of_the_week + '&nbsp;' + today + '<sup>' + addNumberOrdinal(today) + '</sup>' + '&nbsp;' + monthName + "&nbsp;" + year;
    html += '</th></tr>';
    html += '<tr class="calendar-header">';
    for (var i = 0; i <= 6; i++) {
        html += '<td class="calendar-header-day">';
        html += daysName[i];
        html += '</td>';
    }
    html += '</tr><tr>';

    // Start counting days from 0
    var day = 1;
    // this loop is for is weeks (rows)
    for (var i = 0; i < 9; i++) {
        // this loop is for weekdays (cells)
        for (var dayOfWeek = 0; dayOfWeek <= 6; dayOfWeek++) {
            // highlight today's date            
            if (day == today && (dayOfWeek >= startingDayOfTheWeek)) {
                html += '<td class="calendar-day today">';
            } else {
                html += '<td class="calendar-day">';
            }
            // start adding calendar days from startingDayOfTheWeek
            if (day <=  monthLength && (i > 0 || dayOfWeek >= startingDayOfTheWeek)) {
                html += day;
                day++;
            }
            html += '</td>';
        }
        // stop making rows if we've run out of days
        if (day > monthLength) {
            break;
        } else {
            html += '</tr><tr>';
        }
    }
    html += '</tr></table>';
    this.html = html;
}
// complete Calendar HTML
Calendar.prototype.calendarHTML = function() {
    return this.html;
}
