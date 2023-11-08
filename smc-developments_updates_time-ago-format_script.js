document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('[data-changelog-datetime]').forEach(function(element) {
        // Find the parent CMS item and the hidden date field using data-attributes
        let cmsItem = element.closest('[data-cms-item]');
        let dateElement = cmsItem ? cmsItem.querySelector('[data-changelog-hidden-date]') : null;

        if (!dateElement) {
            console.error('No date element found for: ', element);
            return;
        }

        let dateTime = new Date(dateElement.textContent);
        let now = new Date();
        let difference = now - dateTime;

        let minute = 60 * 1000;
        let hour = minute * 60;
        let day = hour * 24;

        let result = '';
        if (difference < minute) {
            result = 'Just now';
        } else if (difference < hour) {
            let minutesPassed = Math.round(difference / minute);
            result = minutesPassed + ' minutes ago';
        } else if (difference < day) {
            let hoursPassed = Math.round(difference / hour);
            result = hoursPassed + ' hours ago';
        } else if (difference < (day * 30)) {
            let daysPassed = Math.floor(difference / day);
            result = daysPassed + ' days ago';
        } else {
            // Calculate the month difference
            let yearDiff = now.getFullYear() - dateTime.getFullYear();
            let monthDiff = now.getMonth() - dateTime.getMonth() + (yearDiff * 12);
            let dayDiff = now.getDate() - dateTime.getDate();
            
            if (dayDiff < 0) {
                // If the day part of the 'now' date is less than the day part of the 'dateTime', 
                // it means we haven't completed a month.
                monthDiff -= 1;
            }

            // If monthDiff is 0, it means we're in the same month and should show the day difference.
            if (monthDiff <= 0) {
                let daysPassed = Math.floor(difference / day);
                result = daysPassed + ' days ago';
            } else {
                result = monthDiff === 1 ? '1 month ago' : monthDiff + ' months ago';
            }
        }
        
        element.textContent = result;
    });
});
