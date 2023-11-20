"use strict"

function renderCoffee(coffee) {
    // The following comment is kept for clarity, but it is not needed.
    // Tables are a little old school, you need to refactor the code so that each coffee is displayed
    // in a div that contains a heading displaying the coffee name, and the type of roast in a paragraph.
    // Don't display the ids, these are only for our application's internal use.

    let html = `
    <div class="coffee">
        <h3>${coffee.name}</h3>
        <p>${coffee.roast}</p>
    </div>
    `;

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
    alert("submit clicked...");
    e.preventDefault(); // don't submit the form, we just want to update the data
    const selectedRoast = roastSelection.value;
    const filteredCoffees = [];
    coffees.forEach(coffee => {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

// When the page loads, the coffees should be sorted by their ids in ascending order
coffees.sort((a, b) => a.id - b.id);

const submitButton = document.querySelector('#submit');
const roastSelection = document.querySelector('#roast-selection');

const coffeeContainerElement = document.querySelector('#coffee-container');
coffeeContainerElement.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);
