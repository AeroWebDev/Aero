const params = new URLSearchParams(window.location.search);

const page = params.get("plan");
const table = document.querySelector(".pricing-table");

console.log(page);

switch (page) {
    case `Desing Only`:
        console.log(1);
        break;

    default:
        break;
}