document.addEventListener("DOMContentLoaded", function () {
    initialisation();
});

const planetsTableTbody = document.querySelector(".planets_table tbody");
const resultsNumber = document.querySelector(".number_results");
const filterSelect = document.querySelector(".filter");
let url = "https://swapi.dev/api/planets/";
let planets = [];

async function initialisation() {
    await getAllPlanets();
    addPlanetsToPlanetTable(sortPopulationAscending(planets));
    getPlanetsCount(planets);
}
async function getAllPlanets() {
    while (url !== null) {
        const queryResponse = await fetch(url);
        const responseJson = await queryResponse.json();
        planets = planets.concat(responseJson.results);
        planetsCount = responseJson.count;
        url = responseJson.next ? responseJson.next : null;
    }
}

function getPlanetsCount(array) {
    resultsNumber.innerHTML = array.length + " Résultat(s)";
}

function addPlanetsToPlanetTable(dataArray) {
    for (let index = 0; index < dataArray.length; index++) {
        const newRow = document.createElement("tr");
        newRow.classList.add("table-primary");
        const newHeader = document.createElement("th");
        newHeader.textContent = dataArray[index].name;
        newHeader.setAttribute("scope", "row");
        const newCell = document.createElement("td");
        newCell.textContent = dataArray[index].terrain;
        newRow.appendChild(newHeader);
        newRow.appendChild(newCell);
        planetsTableTbody.appendChild(newRow);

        newRow.addEventListener("click", () => {
            makeVisiblePlanetDetailDisplay();
            const planetNamePlaceholder = document.querySelector(".planet_name");
            planetNamePlaceholder.innerHTML = dataArray[index].name;
            const populationPlaceholder = document.querySelector(".population_info");
            populationPlaceholder.innerHTML =
                "Population : " + dataArray[index].population;
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

filterSelect.addEventListener("change", (event) => {
    let filterValue = event.target.value;
    console.log(filterValue);
    switch (filterValue) {
        case "1":
            planetsTableTbody.innerHTML = "";
            const planetsFiltered1 = planets.filter(planet => {
                const inhabitants = parseInt(planet.population);
                return inhabitants <= 100000;
            })
            addPlanetsToPlanetTable(sortPopulationAscending(planetsFiltered1));
            getPlanetsCount(planetsFiltered1)
            break;
        case "2":
            planetsTableTbody.innerHTML = "";
            const planetsFiltered2 = planets.filter(planet => {
                const inhabitants = parseInt(planet.population);
                return 100000 <= inhabitants && inhabitants <= 100000000;
            })
            addPlanetsToPlanetTable(sortPopulationAscending(planetsFiltered2));
            getPlanetsCount(planetsFiltered2)
            break;
        case "3":
            planetsTableTbody.innerHTML = "";
            const planetsFiltered3 = planets.filter(planet => {
                const inhabitants = parseInt(planet.population);
                return inhabitants > 100000000;
            })
            addPlanetsToPlanetTable(sortPopulationAscending(planetsFiltered3));
            getPlanetsCount(planetsFiltered3)
            break;
        default: "0";
            planetsTableTbody.innerHTML = "";
            addPlanetsToPlanetTable(sortPopulationAscending(planets));
            getPlanetsCount(planets)
            break;
    }
});

function sortPopulationAscending(Array) {
    return Array.sort((a, b) => a.population - b.population);
}
