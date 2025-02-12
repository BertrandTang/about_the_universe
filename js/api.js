const lifeformsNumberPlaceholder = document.querySelector(".lifeforms_number");
const vehiclesNumberPlaceholder = document.querySelector(".vehicles_number");
const planetsNumberPlaceholder = document.querySelector(".planets_number");
const entityArray = ["species", "vehicles", "planets"];
const planetsTableTbody = document.querySelector(".planets_table tbody");
const resultsNumber = document.querySelector(".number_results");
const urlAllPlanets = "https://swapi.dev/api/planets/";
let nextUrl = url;

async function getAllPlanets() {
    while (nextUrl) {
        const queryOtherPages = await fetch(nextUrl);
        const otherPagesJson = await queryOtherPages.json();
        resultsNumber.innerHTML = otherPagesJson.count + " Résultat(s)";
        const otherDataPlanets = otherPagesJson.results;
        addNewTableCells(otherDataPlanets);
        nextUrl = otherPagesJson.next ? otherPagesJson.next : null;
    }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function addNewTableCells(dataArray) {
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
    }
}

async function getEntityCount(entity) {
    const queryResponse = await fetch(`https://swapi.dev/api/${entity}/`);
    const jsonResponse = await queryResponse.json();
    const entityCount = jsonResponse.count;
    switch (entity) {
        case "species":
            lifeformsNumberPlaceholder.innerHTML = entityCount;
            break;
        case "vehicles":
            vehiclesNumberPlaceholder.innerHTML = entityCount;
            break;
        case "planets":
            planetsNumberPlaceholder.innerHTML = entityCount;
            break;
        default:
            console.error("Entité non reconnue : " + entity);
            break;
    }
}