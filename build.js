const refDate = dayjs("2022-01-01");

// utility function (to get sunday as 7)
const filterIndex = (index) => {
    if (index === 0) return 7;
    return index;
}


// TODO -- BUTTONS
// this object contains methods to handle the navigation buttons
const buttonHandler = {
    initButtons(refDate) {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        prevBtn.addEventListener('click', () => {
            const newDate = refDate.subtract(1, 'month');
            monthBuilder.initMonthData(newDate);
            buttonHandler.initButtons(newDate);
        });

        nextBtn.addEventListener('click', () => {
            const newDate = refDate.add(1, 'month');
            monthBuilder.initMonthData(newDate);
            buttonHandler.initButtons(newDate);
        });
    }
}

buttonHandler.initButtons(refDate);

// MONTH BUILDER
const monthBuilder = {

    tableBody: document.getElementById('calendar-body'),
    calendarTitle: document.getElementById('calendar-title'),

    initMonthData(refDate) {
        // display current month
        this.calendarTitle.textContent = refDate.format('MMMM YYYY');

        // raw data
        const firstDayOfMonth = refDate.startOf('month');
        const lastDayOfMonth = refDate.endOf('month');
        const paddStart = filterIndex(firstDayOfMonth.day()) - 1;
        const paddEnd = 7 - filterIndex(lastDayOfMonth.day());
        const totalDays = lastDayOfMonth.date();
        const nbOfRows = (totalDays + paddStart + paddEnd) / 7;

        // computed data
        const monthArray = monthBuilder.createMonthArray(totalDays, paddStart, paddEnd);
        const weeksArray = monthBuilder.getWeeks(monthArray, nbOfRows);

        monthBuilder.clearRows();
        monthBuilder.insertRows(weeksArray);

        monthBuilder.initCellsListener();
    },

    clearRows() {
        this.tableBody.innerHTML = '';
    },

    createMonthArray(totalDays, paddStart, paddEnd) {
        // fills the month array with days objects

        const fillPaddStart = () => {
            for (let i = 1; i <= paddStart; i++) {
                month.push({
                    type: 'empty',
                    dayNb: null
                });
            }
        }

        const fillActiveDates = () => {
            for (let i = 1; i <= totalDays; i++) {
                month.push({
                    type: 'active',
                    dayNb: i
                });
            }
        }

        const fillPaddEnd = () => {
            for (let i = 1; i <= paddEnd; i++) {
                month.push({
                    type: 'empty',
                    dayNb: null
                });
            }
        }

        const month = [];
        fillPaddStart();
        fillActiveDates();
        fillPaddEnd();

        return month;
    },

    getWeeks(month, nbOfRows) {
        // splits the month array into chunks

        const chunks = [];
        for (let i = 0; i < nbOfRows; i++) {
            chunks.push(month.slice(i * 7, (i * 7) + 7));
        }

        return chunks;
    },

    insertRows(chunks) {

        const createRow = (weekdays, rowNumber) => {
            // get template
            const weekTemplate = document.getElementById('weekTemplate');

            // customize template
            const newRow = document.importNode(weekTemplate.content, true);

            for (let i = 0; i <= 6; i++) {
                if (weekdays[i].type === 'empty') {
                    newRow.querySelector(`td:nth-child(${i + 1})`).classList.add('padding-cell');
                }
                newRow.querySelector(`td:nth-child(${i + 1})`).textContent = weekdays[i].dayNb;
                newRow.querySelector(`td:nth-child(${i + 1})`).dataset.target = rowNumber;
            }

            newRow.querySelector('.row-banner').id = `banner${rowNumber}`;

            this.tableBody.append(newRow);
        }

        // calls 'createRow' function for every row of the month
        for (let i = 0; i < chunks.length; i++) {
            createRow(chunks[i], i + 1);
        }
    },

    initCellsListener() {
        const cells = document.querySelectorAll('.cal-cell');

        cells.forEach(cell => {
           cell.addEventListener('click', (e) => {

               e.target.classList.toggle('bg-warning');
               document.getElementById(`banner${e.target.dataset.target}`).classList.toggle('d-none');
           });
        });
    }

}

monthBuilder.initMonthData(refDate);





// DOM ****************************************************************
// const refDateSpan = document.querySelector('#refDate');
// const monthSpan = document.querySelector('#month');
// const totDaysSpan = document.querySelector('#totDays');
// const firstDaySpan = document.querySelector('#firstDay');
// const paddStartSpan = document.querySelector('#paddStart');
// const lastDaySpan = document.querySelector('#lastDay');
// const paddEndSpan = document.querySelector('#paddEnd');
// const nbOfRowsSpan = document.querySelector('#nbOfRows');


// firstDaySpan.textContent = firstDayOfMonth.format('dddd DD/MM/YYYY') + " / " + filterIndex(firstDayOfMonth.day());
// paddStartSpan.textContent = paddStart;


// refDateSpan.textContent = refDate.format('dddd DD/MM/YYYY') + " / " + filterIndex(refDate.day());
// monthSpan.textContent = refDate.format('MMMM');
// lastDaySpan.textContent = lastDayOfMonth.format('dddd DD/MM/YYYY') + " / " + filterIndex(lastDayOfMonth.day());
// paddEndSpan.textContent = paddEnd;
// totDaysSpan.textContent = totalDays;
// nbOfRowsSpan.textContent = nbOfRows;

