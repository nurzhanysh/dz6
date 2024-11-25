const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
const tabsParent = document.querySelector('.tab_content_items')

let currentTab =0

const hideTabContent = () => {
    tabContentBlocks.forEach((block)=> {
        block.style.display = 'none'
    })
    tabs.forEach((tab) => {
        tab.classList.remove('tab_content_item_active')
})
}
const showTabContent = (id = 0) => {
    tabContentBlocks[id].style.display = 'block'; 
    tabs[id].classList.add('tab_content_item_active');
};

const switchTab = () => {
    hideTabContent()
    currentTab = (currentTab +1) % tabs.length
    showTabContent(currentTab)
}

hideTabContent();
showTabContent();
setInterval(switchTab,3000)

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')){
        tabs.forEach((tab,tabIndex) => {
           if(event.target===tab) {
            hideTabContent()
            currentTab= tabIndex
            showTabContent(tabIndex)
           }
        })
    }
}
const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

const converter = (element, targetElement) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open('GET', '../data/converter.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();

        request.onload = () => {
            const data = JSON.parse(request.response);
            if (element.id === 'som') {
                targetElement.value = (element.value / data.usd).toFixed(2);
                updateOtherCurrencies('som', element.value, data);
            }
            if (element.id === 'usd') {
                targetElement.value = (element.value * data.usd).toFixed(2);
                updateOtherCurrencies('usd', element.value, data);
            }
            if (element.id === 'eur') {
                targetElement.value = (element.value * data.eur).toFixed(2);
                updateOtherCurrencies('eur', element.value, data);
            }
            if (element.value === '') {
                targetElement.value = '';
                resetOtherInputs(element.id);
            }
        }
    };
};


const updateOtherCurrencies = (baseCurrency, value, data) => {
    if (baseCurrency === 'som') {
        usdInput.value = (value / data.usd).toFixed(2);
        eurInput.value = (value / data.eur).toFixed(2);
    }
    if (baseCurrency === 'usd') {
        somInput.value = (value * data.usd).toFixed(2);
        eurInput.value = (value * data.usd / data.eur).toFixed(2);
    }
    if (baseCurrency === 'eur') {
        somInput.value = (value * data.eur).toFixed(2);
        usdInput.value = (value * data.eur / data.usd).toFixed(2);
    }
};


const resetOtherInputs = (id) => {
    if (id !== 'som') somInput.value = '';
    if (id !== 'usd') usdInput.value = '';
    if (id !== 'eur') eurInput.value = '';
};

converter(somInput, usdInput);
converter(usdInput, somInput);
converter(eurInput, somInput);



//switcher 6
const nextButton = document.querySelector('#btn-next');
const prevButton = document.querySelector('#btn-prev');
const cardBlock = document.querySelector('.card');

let cardIndex = 1; // Начальный индекс карточки
const maxCards = 200; // Максимальное количество карточек

// Функция для загрузки данных и отображения карточки
const loadCard = () => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${cardIndex}`)
        .then((response) => response.json())
        .then((data) => {
            cardBlock.innerHTML = `
                <p>Заголовок: ${data.title}</p>
                <p>Статус: ${data.completed ? 'Выполнено' : 'Не выполнено'}</p>
                <span>ID: ${data.id}</span>
            `;
        })
        .catch((error) => {
            console.error('Ошибка при загрузке данных:', error);
        });
};


const changeCard = (direction) => {
    if (direction === 'next') {
        cardIndex = cardIndex < maxCards ? cardIndex + 1 : 1; 
    } else if (direction === 'prev') {
        cardIndex = cardIndex > 1 ? cardIndex - 1 : maxCards; 
    }
    loadCard();
};


nextButton.onclick = () => changeCard('next');
prevButton.onclick = () => changeCard('prev');


loadCard();


fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => {
        console.log('Данные из /posts:', data);
    })
    .catch((error) => {
        console.error('Ошибка при загрузке данных из /posts:', error);
    });