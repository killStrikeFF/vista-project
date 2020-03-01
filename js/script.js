document.addEventListener('DOMContentLoaded', () => {

    let btnHere = document.querySelector('.btn-pat-here'),
        btnHereCol = document.querySelector('.btn-pat-here-col'),
        btnQuit = document.querySelector('.btn-pat-quit'),
        btnQuitCol = document.querySelector('.btn-pat-quit-col'),
        tableHere = document.querySelector('.table-here'),
        tableQuit = document.querySelector('.table-quit'),
        fioPat = document.querySelector('.fioPat'),
        oldPat = document.querySelector('.oldPat'),
        diagPat = document.querySelector('.diagPat');
    

    /* function of create a few atribure element */
    function setAttributes(el, options) {
        Object.keys(options).forEach(function(attr) {
        el.setAttribute(attr, options[attr]);
        });
    };

    /* сколько лет */
    function get_current_age(date) {
          return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
    };
        

    /* запросы на сервер */
    const getHerePat = handler => {
        fetch('/presentList.json')
            .then(response => response.json())
            .then(handler);
    };

    const getQuitPat = handler => {
        fetch('https://yadi.sk/d/Sk_vcJ1MIDs6ug')
            .then(response => response.json())
            .then(handler);
    };


    /* генерация пациентов */
    const createPatHere = (historyNumber, firstName, lastName, patrName, birthDate, diagnosis, bedNumber) => {
        blockPat = document.createElement('div');
        blockPat.className = 'table-here-info';

        setAttributes(blockPat, {"data-first-name": firstName,
                                "data-last-name": lastName,
                                "data-patr-name": patrName,
                                "data-birth-date": birthDate,
                                "data-diagnosis": diagnosis
        });

        blockPat.innerHTML = `  <p class="table-here-info-td" data-history-number="${historyNumber}">${historyNumber}</p>
                                <p class="table-here-info-td">${firstName} ${lastName} ${patrName}</p>
                                <p class="table-here-info-td">${bedNumber}</p>   `;
        return blockPat;
    };

    const createPatQuit = (historyNumber, firstName, lastName, patrName, birthDate, diagnosis, cause) => {
        blockPat = document.createElement('div');
        blockPat.className = 'table-quit-info';

        setAttributes(blockPat, {"data-first-name": firstName,
                                "data-last-name": lastName,
                                "data-patr-name": patrName,
                                "data-birth-date": birthDate,
                                "data-diagnosis": diagnosis
        });

        blockPat.innerHTML = `  <p class="table-quit-info-td" data-history-number="${historyNumber}">${historyNumber}</p>
                                <p class="table-quit-info-td">${firstName} ${lastName} ${patrName}</p>
                                <p class="table-quit-info-td">${cause}</p>   `;
        return blockPat;
    };


    /* рендеры */
    const renderPatHere = patients => {
        if(patients.length) {
            patients.forEach(({historyNumber, firstName, lastName, patrName, birthDate, diagnosis, bedNumber}) => {
                tableHere.appendChild(createPatHere(historyNumber, firstName, lastName, patrName, birthDate, diagnosis, bedNumber));
            });
        }

        btnHereCol.innerHTML = patients.length;
    };

    const renderPatQuit = patients => {
        if(patients.length) {
            patients.forEach(({historyNumber, firstName, lastName, patrName, birthDate, diagnosis, cause}) => {
                tableQuit.appendChild(createPatQuit(historyNumber, firstName, lastName, patrName, birthDate, diagnosis, cause));
            });
        }

        btnQuitCol.innerHTML = patients.length;
    };

    
    /* хендлеры */
    const handlerTabHere = event => {
        const target = event.target;
        
        if (target.classList.contains('table-here-info-td')) {
            const el = target.parentNode;

            fioPat.value = el.dataset.firstName + ' ' + el.dataset.lastName  + ' ' + el.dataset.patrName;
            oldPat.value = get_current_age(el.dataset.birthDate);
            diagPat.value = el.dataset.diagnosis;
        }
    };

    const handlerTabQuit = event => {
        const target = event.target;
        
        if (target.classList.contains('table-quit-info-td')) {
            const el = target.parentNode;

            fioPat.value = el.dataset.firstName + ' ' + el.dataset.lastName  + ' ' + el.dataset.patrName;
            oldPat.value = get_current_age(el.dataset.birthDate);
            diagPat.value = el.dataset.diagnosis;
        }
    };


    /* события */
    btnHere.addEventListener('click', () => {
        tableHere.style.display = 'block';
        tableQuit.style.display = 'none';
        fioPat.value = '';
        oldPat.value = '';
        diagPat.value = '';

        btnHere.classList.add('button-active');
        btnQuit.classList.remove('button-active');
    });

    btnQuit.addEventListener('click', () => {
        tableQuit.style.display = 'block';
        tableHere.style.display = 'none';
        fioPat.value = '';
        oldPat.value = '';
        diagPat.value = '';

        btnQuit.classList.add('button-active');
        btnHere.classList.remove('button-active');
    });


    /* инициализация */
    getHerePat(renderPatHere);
    getQuitPat(renderPatQuit);
    btnHere.classList.add('button-active');

    /* события */

    tableHere.addEventListener('click', handlerTabHere);
    tableQuit.addEventListener('click', handlerTabQuit);
    

});
