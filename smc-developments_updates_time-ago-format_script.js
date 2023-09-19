document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.changelog__date-time-ago').forEach(function(element) {
        // Grab the date from the adjacent hidden field
        let dateTime = new Date(element.previousElementSibling.textContent);
        let now = new Date();
        let difference = now - dateTime;
        
        let minute = 60 * 1000;
        let hour = minute * 60;
        let day = hour * 24;
        let week = day * 7;

        let result = '';
        if (difference < hour) {
            let minutesPassed = Math.floor(difference / minute);
            result = minutesPassed + ' minutes ago';
        } else if (difference < day) {
            let hoursPassed = Math.floor(difference / hour);
            result = hoursPassed + ' hours ago';
        } else if (difference < (2 * day)) {
            let options = { hour: 'numeric', minute: 'numeric' };
            result = 'Yesterday at ' + dateTime.toLocaleTimeString(undefined, options);
        } else if (difference < week) {
            let options = { weekday: 'long', hour: 'numeric', minute: 'numeric' };
            result = dateTime.toLocaleDateString(undefined, options);
        } else {
            let options = { month: 'long', day: 'numeric', year: 'numeric' };
            result = dateTime.toLocaleDateString(undefined, options);
        }
        
        element.textContent = result;
    });
});