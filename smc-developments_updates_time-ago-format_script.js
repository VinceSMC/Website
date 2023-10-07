document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.changelog__date-time-ago').forEach(function(element) {
        // Find the parent CMS item and the hidden date field
        let cmsItem = element.closest('.cms-item');
        let dateElement = cmsItem ? cmsItem.querySelector('.changelog__hidden-date') : null;

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
        let week = day * 7;
        let month = day * 30;
        let year = day * 365;

        let result = '';
        if (difference < hour) {
            let minutesPassed = Math.floor(difference / minute);
            result = minutesPassed === 1 ? '1 minute ago' : minutesPassed + ' minutes ago';
        } else if (difference < day) {
            let hoursPassed = Math.floor(difference / hour);
            result = hoursPassed === 1 ? '1 hour ago' : hoursPassed + ' hours ago';
        } else if (difference < week) {
            let daysPassed = Math.floor(difference / day);
            result = daysPassed === 1 ? '1 day ago' : daysPassed + ' days ago';
        } else if (difference < (4 * week)) { // Less than 4 weeks
            let weeksPassed = Math.floor(difference / week);
            result = weeksPassed === 1 ? '1 week ago' : weeksPassed + ' weeks ago';
        } else if (difference < year) {
            let monthsPassed = Math.floor(difference / month);
            result = monthsPassed === 1 ? '1 month ago' : monthsPassed + ' months ago';
        } else {
            let yearsPassed = Math.floor(difference / year);
            result = yearsPassed === 1 ? '1 year ago' : yearsPassed + ' years ago';
        }
        
        element.textContent = result;
    });
});
