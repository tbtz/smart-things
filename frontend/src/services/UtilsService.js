class UtilsService {
    formatDate(date) {
        date = new Date(date);

        let dayNames = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
        let dayName = dayNames[date.getDay()];

        let day = date.getDate();
        if (day < 10) day = '0' + day;
        let month = date.getMonth() + 1;
        if (month < 10) month = '0' + month;
        let year = date.getFullYear().toString().substr(-2);

        let hours = date.getHours()
        if (hours < 10) hours = '0' + hours;
        let minutes = date.getMinutes();
        if (minutes < 10) minutes = '0' + minutes;

        return `${day}.${month}.${year}, ${hours}:${minutes} Uhr`;
    }

    formatShortDate(date) {
        date = new Date(date);

        let dayNames = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
        let dayName = dayNames[date.getDay()];

        let day = date.getDate();
        if (day < 10) day = '0' + day;
        let month = date.getMonth() + 1;
        if (month < 10) month = '0' + month;
        let year = date.getFullYear().toString().substr(-2);

        return `${day}.${month}.${year}`;
    }

    sortArrayByKey(array, key) {
        return array.sort(function (a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? +1 : ((x > y) ? -1 : 0));
        });
    }
}

export default new UtilsService();
