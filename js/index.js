const lifeformsNumberPlaceholder = document.querySelector(".lifeforms_number");
const vehiclesNumberPlaceholder = document.querySelector(".vehicles_number");
const planetsNumberPlaceholder = document.querySelector(".planets_number");
const entityArray = ["species", "vehicles", "planets"];
const missionDatePlaceholder = document.querySelector(".mission_date");

initialisation();

async function initialisation() {
    for (let index = 0; index < entityArray.length; index++) {
        getEntityCount(entityArray[index]);
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
