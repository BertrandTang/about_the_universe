const planetsTableTbody = document.querySelector(".planets_table tbody");
const resultsNumber = document.querySelector('.number_results')
let url  = "https://swapi.dev/api/planets/";
let planets = [];
let planetsCount = 0;

initialisation(); 

async function initialisation() {
    await getAllPlanets();
    addPlanetsToPlanetTable(planets);
    getPlanetsCount(planetsCount);
}

async function getAllPlanets () {
    while (url !== null) {
        const queryResponse = await fetch(url);
        const responseJson = await queryResponse.json();
        planets = planets.concat(responseJson.results);
        planetsCount = responseJson.count;
        url = responseJson.next ? responseJson.next : null;
    } 
}

function getPlanetsCount(count) {
    resultsNumber.innerHTML = count + " Résultat(s)";
}

function addPlanetsToPlanetTable(dataArray) {
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
            makeVisiblePlanetDetailDisplay();
            const planetNamePlaceholder = document.querySelector(".planet_name");
            planetNamePlaceholder.innerHTML = dataArray[index].name;
            const populationPlaceholder = document.querySelector(".population_info");
            populationPlaceholder.innerHTML = "Population : " + dataArray[index].population;
            const diameterPlaceholder = document.querySelector(".diameter_info");
            diameterPlaceholder.innerHTML = dataArray[index].diameter + " km";
            const climatePlaceholder = document.querySelector(".climate_info");
            climatePlaceholder.innerHTML = dataArray[index].climate;
            const gravityPlaceholder = document.querySelector(".gravity_info");
            gravityPlaceholder.innerHTML = dataArray[index].gravity;
            const terrainPlaceholder = document.querySelector(".terrain_info");
            terrainPlaceholder.innerHTML = dataArray[index].terrain;
        });
    }
}

function makeVisiblePlanetDetailDisplay() {
    const selectMessage = document.querySelector(".select_message");
    selectMessage.classList.add("notvisible");
    const planetCardDetail = document.querySelector(".planet_detail_card");
    planetCardDetail.classList.remove("notvisible");
}