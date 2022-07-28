import events from './seeds.js';


// this object holds the state of the current month
const monthParams = {
    year: 2022,
    month: 8
}


// ************************************************************************************
// DOM
const calTitle = document.getElementById('calendar-title');
const calCount = document.getElementById('calendar-count');
const calBody = document.getElementById('calendar-body');

// ************************************************************************************


// this object contains methods to handle the navigation buttons
const buttonHandler = {

    initButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        prevBtn.addEventListener('click', () => {
            monthParams.month--;
            if (monthParams.month < 0) monthParams.month = 11;

            renderer.displayMonth();

        });
        nextBtn.addEventListener('click', () => {
            monthParams.month++;
            if (monthParams.month < 0) monthParams.month = 11;

            renderer.displayMonth();

        });
    }
}

buttonHandler.initButtons();


// this object contains methods to display calendar on the page
const renderer = {

    displayMonth() {
        const firstDayOfMonth = new Date(monthParams.year, monthParams.month, 1);

        const firstDayLocal = firstDayOfMonth.toLocaleString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });

        // this will inject the month name in the header
        // console.log(firstDayLocal.split(' '));

        // str.charAt(0).toUpperCase() + str.slice(1);
        const displayMonth = firstDayLocal.split(' ')[2].charAt(0).toUpperCase() + firstDayLocal.split(' ')[2].slice(1);
        const displayYear = firstDayLocal.split(' ')[3];
        calTitle.innerText = displayMonth + ' ' + displayYear;

        // month starts on day
        const startingOn = firstDayOfMonth.getDay();

        // total days
        const totalDays = new Date(monthParams.year, monthParams.month + 1, 0).getDate();
        calCount.innerText = `Total jours = ${totalDays}`;

        renderer.injectContent(totalDays, startingOn);
    },

    injectContent(totalDays, startingOn) {
        let row = 1;
        let htmlContent = '<tr class="d-flex text-center" data-mainrow="1">';

        // console.clear();
        for (let i = 1; i <= totalDays + startingOn; i++) {

            // if (i === startingOn) {
            //     console.log(i + ' <<<<<');
            // } else {
            //     console.log(i)
            // }

            // FIXME -- startingOn will become 'paddingDays'

            if (i > startingOn - 1) {
                htmlContent += `<td class="cal-cell" data-day="${i - (startingOn - 1)}" data-row="${row}">${i - (startingOn - 1)}</td>`;
            } else {
                htmlContent += `<td class="cal-cell padding-cell">${i - startingOn}</td>`;
            }

            // check if new row
            if (i % 7 === 0) {
                row++;
                htmlContent += `</tr><tr class="d-flex text-center" data-mainrow="${row}">`;
            }
        }

        htmlContent += '</tr>';


        calBody.innerHTML = htmlContent;
    }

}

renderer.displayMonth();


const cellProvider = {

    initCells() {

        const cells = document.querySelectorAll('.cal-cell[data-day]');

        cells.forEach(cell => {
            cell.addEventListener('click', (e) => {

                // remove bg from the previously selected cell
                cells.forEach(cell => cell.classList.remove('bg-warning'));
                // remove temporary row if existing

                if (document.querySelector('#temporaryRow')) {
                    document.querySelector('#temporaryRow').remove();
                }

                e.target.classList.add('bg-warning');

                const targetRow = document.querySelector(`tr[data-mainrow='${parseInt(e.target.dataset.row) + 1}']`);
                const temporaryRow = document.createElement('tr');
                temporaryRow.id = 'temporaryRow';
                temporaryRow.innerHTML = '<td></td>';
                temporaryRow.style.height = '120px';
                temporaryRow.classList.add('bg-info');

                calBody.insertBefore(temporaryRow, targetRow);

            })
        });
    },

    insertRow() {

    },
}

cellProvider.initCells();



