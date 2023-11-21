"use strict"

function renderCoffee(coffee) {
    // The following comment is kept for clarity, but it is not needed.
    // Tables are a little old school, you need to refactor the code so that each coffee is displayed
    // in a div that contains a heading displaying the coffee name, and the type of roast in a paragraph.
    // Don't display the ids, these are only for our application's internal use.

    let html = `
    <div class="coffee">
        <h4>${coffee.name}</h4>
        <p class="${coffee.roast}">${coffee.roast}</p>
        <span title="Click to delete this item" onclick="removeItem(${coffee.id})" class="btnDelete" data-id="${coffee.id}">&times;</span>
    </div>
    `;

    if (coffee.id <= 14) {
        html = `
        <div class="coffee">
            <h4>${coffee.name}</h4>
            <p class="${coffee.roast}">${coffee.roast}</p>
        </div>
        `;
    }

    return html;
}

function renderCoffees(coffees) {
    let html = '';
    for (let i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    if (e) { // Note: Because we call this function in addCoffee(), an 'e' won't be passed in our specific use case.
        e.preventDefault(); // don't submit the form, we just want to update the data
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

// When the page loads, the coffees should be sorted by their ids in ascending order
coffees.sort((a, b) => a.id - b.id);

const submitButton = document.querySelector('#submit');
const clearButton = document.querySelector('#clearBtn');
const roastSelection = document.querySelector('#roast-selection');
const coffeeName = document.querySelector('#coffeeName');

const coffeeContainerElement = document.querySelector('#coffee-container');

submitButton.addEventListener('click', updateCoffees);
clearButton.addEventListener('click', clearSearch);

function clearSearch() {
    roastSelection.value = 'all';
    coffeeName.value = '';
    updateCoffees();
}

function addCoffee(e) {
    e.preventDefault();

    let selectedRoast = document.querySelector('#add-roast-selection').value;
    let selectedName = document.querySelector('#name').value.trim();

    if (selectedName === "") {
        alert("Please enter a coffee name.")
        return;
    }

    let newCoffee = {
        id: 1 + getHighestId(coffees), // coffees.length + 1 // <-- Note: Better alternative
        name: selectedName,
        roast: selectedRoast
    }

    coffees.push(newCoffee);

    saveToLocalStorage('coffeeArrayData', coffees);

    // When the form is submitted, the new coffee should appear on the page, Do this by resetting the current filters
    roastSelection.value = selectedRoast;
    coffeeName.value = selectedName;
    document.querySelector('#name').value = '';
    updateCoffees();
}

const addForm = document.querySelector("#submitForm");
addForm.addEventListener('submit', addCoffee);

roastSelection.addEventListener('change', updateCoffees);
coffeeName.addEventListener('input', updateCoffees);

// (Note that any new coffees you add will be lost when you refresh the page, for an extra challenge,
// research how localStorage works and see if you can find a way to persist the data)

function saveToLocalStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
    return JSON.parse(window.localStorage.getItem(key));
}

let testArray = getFromLocalStorage('coffeeArrayData');

if (testArray) {
    coffees = testArray;
}

function getHighestId(array) {
    return array.reduce((prev, curr) => {
        return prev > curr.id ? prev : curr.id;
    });
}

function removeItem(id) {
    if (id <= 14) {
        alert("You cannot remove an original coffee!");
        return;
    }
    console.log("Remove item with id: " + id);
    let searchIndex = coffees.findIndex((item) => item.id === id);
    if (searchIndex >= 0) {
        coffees.splice(searchIndex, 1);
        saveToLocalStorage('coffeeArrayData', coffees);
        updateCoffees();
    }
}

updateCoffees(); // on startup, update/view all coffees
