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
}
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

        newRow.addEventListener("click", () => {
            const selectMessage = document.querySelector(".select_message");
            selectMessage.classList.add("notvisible");
            const planetCardDetail = document.querySelector(".planet_detail_card");
            planetCardDetail.classList.remove("notvisible");
            const planetNamePlaceholder = document.querySelector(".planet_name");
            planetNamePlaceholder.innerHTML = dataArray[index].name;
            const populationPlaceholder = document.querySelector(".population_info");
            populationPlaceholder.innerHTML = "Population : " + dataArray[index].population;
            const diameterPlaceholder = document.querySelector(".diameter_info");
            diameterPlaceholder.innerHTML = dataArray[index].diameter;
            const climatePlaceholder = document.querySelector(".climate_info");
            climatePlaceholder.innerHTML = dataArray[index].climate;
            const gravityPlaceholder = document.querySelector(".gravity_info");
            gravityPlaceholder.innerHTML = dataArray[index].gravity;
            const terrainPlaceholder = document.querySelector(".terrain_info");
            terrainPlaceholder.innerHTML = dataArray[index].terrain;
        });
    }
}