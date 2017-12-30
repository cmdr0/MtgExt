window.onbeforeunload = () => chrome.runtime.sendMessage({command: "reload"})

// TODO: Create strings object
console.log("MtgExt 0.0.1 Running...")

let trs = document.querySelectorAll("tr.cardItem")
let cardEntries = [];
trs.forEach(tr => {
  cardEntries.push(new StandardViewCardEntry(tr))
})


function StandardViewCardEntry (rowElement) {
  // Private
  let userCell = document.createElement('td')
  rowElement.appendChild(userCell)

  let getName = _ => rowElement.querySelector("span.cardTitle").innerText
  let getMultiverseIDs = _ => {
    let linkElements = rowElement.querySelectorAll("td.setVersions a")
    let urls = []
    linkElements.forEach(link => urls.push(link.href.split('=')[1]))
    return urls
  }
  // Public
  return {
    name: getName(),
    multiverseIDs: getMultiverseIDs(),
  }
}
