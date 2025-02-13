export async function fetchData(url) {
    const queryResponse = await fetch(url); // Fetchdata()
    return await queryResponse.json();
};

export function getEntityCount(array, htmlPlaceholder) {
    htmlPlaceholder.innerHTML = array.length + " Résultat(s)";
}

export function sortEntityAscending(Array, Entity) {
    return Array.sort((a, b) => a.Entity - b.Entity);
}