// TODO: Create strings object
console.log("MtgExt 0.0.1 Running...")

let trs = document.querySelectorAll("tr.cardItem")
trs.forEach(tr => {
    let td = document.createElement("td")
    td.innerText = "Words!"
    tr.appendChild(td)
})