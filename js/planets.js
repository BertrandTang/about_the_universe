import { fetchData } from './api.js';
import { getEntityCount } from './api.js';
import { sortEntityAscending } from './api.js';

document.addEventListener("DOMContentLoaded", function () {
    initialisation();
});

const planetsTableTbody = document.querySelector(".planets_table tbody");
const resultsNumber = document.querySelector(".number_results");
const filterSelect = document.querySelector(".filter");
const searchBar = document.querySelector(".searchbar");

let url = "https://swapi.dev/api/planets/";
let planets = [];

async function initialisation() {
    await getAllPlanets();
    addPlanetsToPlanetTable(sortEntityAscending(planets,  "population"));
    getEntityCount(planets, resultsNumber);
}
async function getAllPlanets() {
    while (url !== null) {
        const response = await fetchData(url);
        planets = planets.concat(response.results);
        url = response.next ? response.next : null;
    }
}
function addPlanetsToPlanetTable(dataArray) {
    planetsTableTbody.innerHTML = "";
    for (let index = 0; index < dataArray.length; index++) {
        const newRow = document.createElement("tr");
        newRow.classList.add("table-primary");
        const newHeader = document.createElement("th");
        newHeader.setAttribute("scope", "row");
        const newCell = document.createElement("td");
        newHeader.textContent = dataArray[index].name;
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
    let planetsFiltered = [];
    switch (filterValue) {
        case "1":
            planetsFiltered = planets.filter(planet => {
                const inhabitants = parseInt(planet.population);
                return inhabitants <= 100000;
            })
            break;
        case "2":
            planetsFiltered = planets.filter(planet => {
                const inhabitants = parseInt(planet.population);
                return 100000 <= inhabitants && inhabitants <= 100000000;
            })
            break;
        case "3":
            planetsFiltered = planets.filter(planet => {
                const inhabitants = parseInt(planet.population);
                return inhabitants > 100000000;
            })
            break;
        default: "0";
            break;
    }
    addPlanetsToPlanetTable(sortEntityAscending(planetsFiltered, "population"));
    getEntityCount(planetsFiltered, resultsNumber)
});
searchBar.addEventListener('input', (event) => {
    const inputEntered = event.target.value.toLowerCase();
    console.log(inputEntered);
    const searchedPlanet = planets.filter(planet =>
        planet.name.toLowerCase().startsWith(inputEntered)
    );
    const filteredInput = searchedPlanet.sort();
    addPlanetsToPlanetTable(filteredInput);
    getEntityCount(filteredInput, resultsNumber)
});
