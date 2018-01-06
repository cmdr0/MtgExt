function StandardViewCardEntry (rowElement) {

  function SetEntry (setElement) {
    return {
      element: setElement,
      multiverseID: setElement.href.split('=')[1],
      name: setElement.querySelector('img').title.split('(')[0]
    }
  }

  function InventoryTable (setEntry) {
    let table = document.createElement('table')
    let topRow = (() => {
      let tr = document.createElement('tr')
      let setIconCell = document.createElement('td')
        setIconCell.appendChild(setEntry.element)
      let setNameCell = document.createElement('td')
        setNameCell.innerText = setEntry.name
      tr.appendChild(setIconCell)
      tr.appendChild(setNameCell)
      return tr
    })()
    let bottomRow = (() => {
      let tr = document.createElement('tr')
      let firstCell = document.createElement('td')
      let secondCell = document.createElement('td')
        secondCell.innerText = '--- SPACE RESERVED ---'
      tr.appendChild(firstCell)
      tr.appendChild(secondCell)
      return tr
    })()
    table.appendChild(topRow)
    table.appendChild(bottomRow)
    chrome.runtime.sendMessage({cmd:'db getCardLocations', args:[setEntry.multiverseID]}, bins => {
      // Returns an object with bin counts
      let binCounts = (() => {
        let out = {}
        bins.forEach(bin => {out[bin] = (out[bin] || 0) + 1})
        return out
      })()
      for (bin in binCounts) {
        let countRow = (() => {
          let tr = table.insertRow(1)
          let qtyCell = document.createElement('td')
            qtyCell.innerText = binCounts[bin]
          let binCell = document.createElement('td')
            binCell.innerText = bin
          tr.appendChild(qtyCell)
          tr.appendChild(binCell)
          return tr
        })()
        table.insertRow()
      }
    })
    return table
  }

  let name = rowElement.querySelector('span.cardTitle').innerText
  let setsCell = rowElement.querySelector('td.setVersions')
  let setEntries = (() => {
    let out = []
    setsCell.querySelectorAll('a').forEach(a => out.push(new SetEntry(a)))
    return out
  })()

  let update = () => {
    setsCell.innerHTML = ''
    setEntries.forEach(setEntry => {
      setsCell.appendChild(new InventoryTable(setEntry))
    })
  }
  update()

  return {
    update: update
  }
}
