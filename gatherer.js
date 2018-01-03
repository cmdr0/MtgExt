window.onbeforeunload = () => chrome.runtime.sendMessage({command: "reload"})

// TODO: Create strings object
console.log('MtgExt 0.0.1 Running...')

let trs = document.querySelectorAll('tr.cardItem')
let cardEntries = [];
trs.forEach(tr => {
  cardEntries.push(new StandardViewCardEntry(tr))
})
cardEntries.forEach(entry => entry.userCell)


function StandardViewCardEntry (rowElement) {
  // Private
  let userCell = document.createElement('td')
  rowElement.appendChild(userCell)

  let getName = _ => rowElement.querySelector('span.cardTitle').innerText
  let getMultiverseIDs = _ => {
    let linkElements = rowElement.querySelectorAll('td.setVersions a')
    let ids = []
    linkElements.forEach(link => ids.push(link.href.split('=')[1]))
    return ids
  }
  let getCardSetElements = _ => rowElement.querySelectorAll('td.setVersions a')

  // Public
  let publicOut = {
    name: getName(),
    multiverseIDs: getMultiverseIDs(),
    cardSetElements: getCardSetElements(),
    update: function() {
      userCell.innerHTML = ''
      let ul = document.createElement('ul')
      this.cardSetElements.forEach(element => {
        let li = document.createElement('li')
        li.appendChild(element)
        ul.appendChild(li)
      })
      userCell.appendChild(ul)
    }
  }

  publicOut.update()
  return publicOut
}
