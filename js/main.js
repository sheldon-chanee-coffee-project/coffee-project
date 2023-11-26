"use strict";

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    { id: 1, name: 'Light City', roast: 'light' },
    { id: 2, name: 'Half City', roast: 'light' },
    { id: 3, name: 'Cinnamon', roast: 'light' },
    { id: 4, name: 'City', roast: 'medium' },
    { id: 5, name: 'American', roast: 'medium' },
    { id: 6, name: 'Breakfast', roast: 'medium' },
    { id: 7, name: 'High', roast: 'dark' },
    { id: 8, name: 'Continental', roast: 'dark' },
    { id: 9, name: 'New Orleans', roast: 'dark' },
    { id: 10, name: 'European', roast: 'dark' },
    { id: 11, name: 'Espresso', roast: 'dark' },
    { id: 12, name: 'Viennese', roast: 'dark' },
    { id: 13, name: 'Italian', roast: 'dark' },
    { id: 14, name: 'French', roast: 'dark' },
];

const coffeeContainerElement = document.querySelector('#coffee-container');

const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', updateCoffees);

const btnClear = document.querySelector('#btnClear');
btnClear.addEventListener('click', clearAddForm);

const roastSelection = document.querySelector('#roast-selection');
roastSelection.addEventListener('change', updateCoffees);

const coffeeName = document.querySelector('#coffeeName');
coffeeName.addEventListener('input', updateCoffees);

const addForm = document.querySelector("#submitForm");
addForm.addEventListener('submit', addCoffee);

const addRoastSelection = document.querySelector('#add-roast-selection');
const addCoffeeName = document.querySelector('#name');

function renderCoffee(coffee) {
    let htmlOneCofffee = `
    <div class="coffee ${coffee.roast}">
        <h4 class="w-100 text-center">${coffee.name}</h4>
        <p class="w-100 text-center">${coffee.roast}</p>
        <button class="deleteBtn" type="button" onclick="deleteCoffeeById(${coffee.id})">Delete</button>
    </div>
    `;

    let htmlOneOriginalCofffee = `
    <div class="coffee ${coffee.roast}">
        <h4 class="w-100 text-center">${coffee.name}</h4>
        <p class="w-100 text-center">${coffee.roast}</p>
    </div>
    `;

    if (coffee.id > 14) {
        return htmlOneCofffee;
    } else {
        return htmlOneOriginalCofffee;
    }
}

function renderCoffees(coffees) {
    let html = '';
    for (let i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    if (e) {
        e.preventDefault();
    }
    const selectedRoast = roastSelection.value.toLowerCase();
    const selectedCoffeeName = coffeeName.value.toLowerCase().trim();

    const filteredCoffees = [];

    coffees.forEach(coffee => {
        let cRoast = coffee.roast.toLowerCase();
        let cName = coffee.name.toLowerCase();
        let shouldCoffeeBeAdd = (selectedCoffeeName === "" || cName.indexOf(selectedCoffeeName) >= 0) && (selectedRoast === "all" || cRoast === selectedRoast);
        if (shouldCoffeeBeAdd === true) {
            filteredCoffees.push(coffee)
        }
    });
    coffeeContainerElement.innerHTML = renderCoffees(filteredCoffees);
}

function getHighestId(array) {
    return array.reduce((prev, curr) => {
        return prev > curr.id ? prev : curr.id;
    });
}

function addCoffee(e) {
    e.preventDefault();

    let selectedRoast = addRoastSelection.value;
    let selectedName = addCoffeeName.value.trim();

    if (selectedName === "") {
        alert("Please enter a coffee name.")
        return;
    }

    let newCoffee = {
        id: getHighestId(coffees) + 1, name: selectedName, roast: selectedRoast
    }

    coffees.push(newCoffee);
    saveToLocalStorage('coffeeArrayData', coffees);
    roastSelection.value = selectedRoast;
    coffeeName.value = selectedName;
    addCoffeeName.value = '';
    updateCoffees();
}

/**
 * deleteCoffeeById - function to delete a coffee by id
 * @param {*} id 
 * @param {*} array 
 */
function deleteCoffeeById(id) {
    let confirmDelete = confirm("Are you sure you want to delete this coffee?");
    if (confirmDelete === true) {
        let index = coffees.findIndex(coffee => coffee.id === id);
        if (index >= 0) {
            coffees.splice(index, 1);
        }
        saveToLocalStorage('coffeeArrayData', coffees);
        updateCoffees();
    }
}

function clearAddForm() {
    roastSelection.value = 'all';
    coffeeName.value = '';
    updateCoffees();
}

// (Note that any new coffees you add will be lost when you refresh the page, for an extra challenge,
// research how localStorage works and see if you can find a way to persist the data).
function saveToLocalStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
    return JSON.parse(window.localStorage.getItem(key));
}

function initialize() {

    let loadedCoffees = getFromLocalStorage('coffeeArrayData');

    if (loadedCoffees) {
        coffees = loadedCoffees;
    }

    coffees.sort((a, b) => a.id - b.id);

    coffeeContainerElement.innerHTML = renderCoffees(coffees);
}

initialize();