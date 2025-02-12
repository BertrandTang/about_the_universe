const planetsTableTbody = document.querySelector(".planets_table tbody");
const resultsNumber = document.querySelector('.number_results')
const url = "https://swapi.dev/api/planets/";
let nextUrl = url;

initialisation(); 

async function initialisation() {
    getAllPlanets();
}

async function getAllPlanets () {
    while (nextUrl){
        const queryOtherPages = await fetch(nextUrl);
        const otherPagesJson = await queryOtherPages.json();
        resultsNumber.innerHTML = otherPagesJson.count + " Résultat(s)";
        const otherDataPlanets = otherPagesJson.results;
        addNewTableCells(otherDataPlanets);
        nextUrl = otherPagesJson.next ? otherPagesJson.next : null;
    }
    
};

function addNewTableCells(dataArray) {
    for (let index = 0; index < dataArray.length; index++) {
        const newRow = document.createElement('tr');
        newRow.classList.add('table-primary');
        const newHeader = document.createElement('th');
        newHeader.textContent = dataArray[index].name;
        newHeader.setAttribute("scope", "row");
        const newCell = document.createElement('td');
        newCell.textContent = dataArray[index].terrain;
        newRow.appendChild(newHeader);
        newRow.appendChild(newCell);
        planetsTableTbody.appendChild(newRow);
    }
}