// const params = new URLSearchParams(window.location.search);
// const page = params.get("plan");

// // Map plans to column indexes (2nd col = Design Only, 3rd = Starter, etc.)
// const planToCol = {
//     "design only": 2,
//     "starter": 3,
//     "business": 4,
//     "pro": 5
// };

// // Hide all table cells in all rows except the first child
// document.querySelectorAll("tbody tr td:not(:first-child)").forEach(td => td.style.display = "none");
// document.querySelectorAll("thead tr th:not(:first-child)").forEach(td => td.style.display = "none");

// if (page) {
//     const colIdx = planToCol[page.toLowerCase()] ?? null;

//     if (colIdx !== null) {
//         document.querySelectorAll(`tbody tr td:nth-child(${colIdx})`).forEach(td => td.style.display = "table-cell");
//         document.querySelectorAll(`thead tr th:nth-child(${colIdx})`).forEach(th => th.style.display = "table-cell");
//     }
// }
