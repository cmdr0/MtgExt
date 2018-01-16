function StandardViewCardEntry (rowElement) {

  function SetEntry (setElement) {
    return {
      element: setElement,
      multiverseID: setElement.href.split('=')[1],
      name: setElement.querySelector('img').title.split('(')[0]
    }
  }

  // TODO: Factor out into model
  function InventoryTable (setEntry) {

    let dropdown = new Gui.BinDropdown()
    messageSender.send({cmd:'db getBins'})
      .then(bins => {
        if (!bins) return // TODO: Error handle
        dropdown.update(bins)
      })

    let binButton = new Gui.Button('+', e => {
      let binValue = dropdown.selectedValue()
      if (!binValue) return console.log(`ERROR: BinValue: ${binValue}`)// TODO: Error handle
      messageSender.send(
        {cmd:'db binCard', args:[setEntry.multiverseID, binValue]}
      ).then(response => {
        if (!response) return // TODO: Error handle
        update()
      })
    })

    let table = new Gui.Table([
      new Gui.TableRow([
        new Gui.TableCell(setEntry.element),
        new Gui.TableCell(setEntry.name, 3)
      ]),
      new Gui.TableRow([
        new Gui.TableCell(''),
        new Gui.TableCell(''),
        new Gui.TableCell(binButton),
        new Gui.TableCell(dropdown)
      ])
    ])

    messageSender.send(
      {cmd:'db getCardLocations', args:[setEntry.multiverseID]}
    ).then(bins => {
      let binCounts = {}
      bins.forEach(bin => {binCounts[bin] = (binCounts[bin] || 0) + 1})
      for (bin in binCounts) {
        let binByValue = bin

        let removeButton = new Gui.Button('-', e => {
          messageSender.send(
            {cmd:'db removeCard', args:[setEntry.multiverseID, binByValue]}
          ).then(response => {
            if (!response) return // TODO: Error handle
            update()
          })
        })

        let addButton = new Gui.Button('+', e => {
          messageSender.send(
            {cmd:'db binCard', args:[setEntry.multiverseID, binByValue]}
          ).then(response => {
            if (!response) return // TODO: Error handle
            update()
          })
        })

        table.insertBefore(
          new Gui.TableRow([
            new Gui.TableCell(removeButton),
            new Gui.TableCell(binCounts[bin]),
            new Gui.TableCell(addButton),
            new Gui.TableCell(bin)
          ]),
          table.lastChild
        )
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

  // TODO: Yeah, unfuck this so it updates instead of re-creating everything
  // Currently makes an obnoxious 'blink' for every action
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
