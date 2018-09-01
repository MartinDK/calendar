// TODO: Make calendar.js a module

// TODO: move caledar properties into Calendar class
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
function adjustForMondayStart(day) {
    if (day == 0) {
        day += 6;
    } else {
        day -= 1;
    }
    return day;
};

// create Calendar object
function Calendar() {
  // EMPTY
}

Calendar.prototype.getToday = function () {
    // the current date
    var todayObj = new Date();
    
    var today = todayObj.getDate();
    var weekday = todayObj.getDay();
    var month = todayObj.getMonth();
    var year = todayObj.getFullYear();
    
    return { today:today, weekday:weekday, month:month, year:year }
}

// Month properties
Calendar.prototype.monthProps = function (year, month) {
    
    // get first day of month
    var firstDay = new Date(year, month, 1);
    startOfWeek = firstDay.getDay();
    
    // number of days in month
    monthLength = daysInMonth[month];
    
    return { firstDay:startOfWeek, monthLength:monthLength};
}

// TODO: break generateValendarHTML into smaller functions

// generate Calendar HTML
Calendar.prototype.generateCalendarHTML = function() {

    // todays date, and info about todays month
    var todaysDate = this.getToday(); 
    var monthDetail = this.monthProps(todaysDate.year, todaysDate.month)
    
    // compensate for leap year
    if (todaysDate.month == 1) { // February only!
        if ((todaysDate.year % 4 == 0 && todaysDate.year % 100 != 0) || todaysDate.year % 400 == 0) {
            monthLength = 29;
        }
    }
    // make Monday the first day of the week
    todaysName = daysName[adjustForMondayStart(todaysDate.weekday)];
    firstDay = adjustForMondayStart(monthDetail.firstDay);

    // build the calendar header
    var monthName = monthsName[todaysDate.month]
    var html = '';
    html += '<table class="calendar-table">';
    html += '<tr><th colspan="7">';
    html += todaysName + '&nbsp;' + todaysDate.today + '<sup>' + addNumberOrdinal(todaysDate.today) + '</sup>' + '&nbsp;' + monthName + "&nbsp;" + todaysDate.year;
    html += '</th></tr>';
    html += '<tr class="calendar-header">';
    for (var i = 0; i <= 6; i++) {
        html += '<td class="calendar-header-day">';
        html += daysName[i];
        html += '</td>';
    }
    html += '</tr><tr>';
    
    // Build Calendar
    var day = 1;
    // loop for weeks (rows)
    for (var i = 0; i < 9; i++) {
        // loop for weekdays (cells)
        for (var dayOfWeek = 1; dayOfWeek <= 7; dayOfWeek++) {
            // highlight today's date            
            if (day == todaysDate.today && (dayOfWeek >= monthDetail.firstDay)) {
                html += '<td class="calendar-day today">';
            } else {
                html += '<td class="calendar-day">';
            }
            // start adding calendar days from startingDayOfTheWeek
            if (day <=  monthDetail.monthLength && (i > 0 || dayOfWeek >= monthDetail.firstDay)) {
                html += day;
                day++;
            }
            html += '</td>';
        }
        // stop making rows if we've run out of days
        if (day > monthDetail.monthLength) {
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
