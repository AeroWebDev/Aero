const params = new URLSearchParams(window.location.search);

const page = params.get("plan");

// Hide all table cells in all rows except the first child
document.querySelectorAll("tbody tr td:not(:first-child)").forEach(td => td.style.display = "none");
document.querySelectorAll("thead tr th:not(:first-child)").forEach(td => td.style.display = "none");


let colIdx = null;
switch (page) {
    case "Design Only":
        console.log(1);
        colIdx = 2; // second column
        break;
    case "Starter":
        console.log(2);
        colIdx = 3; // third column
        break;
    case "Business":
        console.log(3);
        colIdx = 4; // fourth column
        break;
    case "Pro":
        console.log(4);
        colIdx = 5; // fifth column
        break;
    default:
        // No column to show
        break;
}

// Show the correct column for all rows if a valid plan is selected, except the first child
if (colIdx !== null) {
    document.querySelectorAll(`tbody tr td:nth-child(${colIdx})`).forEach(td => td.style.display = "table-cell");
    document.querySelectorAll(`thead tr th:nth-child(${colIdx})`).forEach(th => th.style.display = "table-cell");

}