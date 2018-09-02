
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

// add ordinal to numbers i.e 1st, 2nd, 3rd and 4th
Calendar.prototype.addNumberOrdinal = function (day) {

    // number ordinal labels
    numberOrdinal = { 0: 'th', 1: 'st', 2: 'nd', 3: 'rd', 4: 'th', 5: 'th', 6: 'th', 7: 'th', 8: 'th', 9: 'th'};
    
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

// the current date
Calendar.prototype.getToday = function () {
    var todayObj = new Date();
    var today = todayObj.getDate();
    var weekday = todayObj.getDay();
    var month = todayObj.getMonth();
    var year = todayObj.getFullYear();
    
    return { today:today, weekday:weekday, month:month, year:year }
}

// make Monday first day of the week
Calendar.prototype.startMonday = function (day) {
    if (day == 0) {
        day += 6;
    } else {
        day -= 1;
    }
    return day;
};

// Month properties
Calendar.prototype.monthProps = function (year, month) {
     
    var firstDay = new Date(year, month, 1); // first day of month
    var startOfWeek = firstDay.getDay();
    var monthLength = this.daysInMonth[month]; // number of days this month
    var leapYear = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
    
    // February - leap year
    if (month == 1 && leapYear) {
            monthLength = 29;
      };
    
    return { firstDay:startOfWeek, monthLength:monthLength};
}

// generate Calendar HTML
Calendar.prototype.generateCalendarHTML = function() {

    // todays date, and info about todays month
    var todaysDate = this.getToday(); 
    var monthDetails = this.monthProps(todaysDate.year, todaysDate.month)
    
    // make Monday the first day of the week
    todaysName = this.daysOfWeek[this.startMonday(todaysDate.weekday)];
    firstDay = this.startMonday(monthDetails.firstDay);

    // calendar header
    var monthName = this.monthsName[todaysDate.month]
    var html = '';
    html += '<table class="calendar-table">';
    html += '<tr><th colspan="7">';
    html += todaysName + '&nbsp;' + todaysDate.today + '<sup>' + this.addNumberOrdinal(todaysDate.today) + '</sup>' + '&nbsp;' + monthName + "&nbsp;" + todaysDate.year;
    html += '</th></tr>';
    html += '<tr class="calendar-header">';
    for (var i = 0; i <= 6; i++) {
        html += '<td class="calendar-header-day">';
        html += this.daysOfWeek[i];
        html += '</td>';
    }
    html += '</tr><tr>';
    
    // calendar body
    var day = 1;
    // loop for weeks (rows)
    for (var i = 0; i < 9; i++) {
        // loop for weekdays (cells)
        for (var dayOfWeek = 1; dayOfWeek <= 7; dayOfWeek++) {
            // highlight today's date            
            if (day == todaysDate.today) {
                html += '<td class="calendar-day today">';
            } else {
                html += '<td class="calendar-day">';
            }
            // start adding calendar days from startingDayOfTheWeek
            if (day <=  monthDetails.monthLength && (i > 0 || dayOfWeek >= monthDetails.firstDay)) {
                html += day;
                day++;
            }
            html += '</td>';
        }
        // stop making rows if we've run out of days
        if (day > monthDetails.monthLength) {
            console.log("finished");
            break;
        } else {
            html += '</tr><tr>';
        }
    }
    html += '</tr></table>';

    return this.html = html;
}
