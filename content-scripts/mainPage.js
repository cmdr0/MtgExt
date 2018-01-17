let topDiv = document.querySelector('.introtogatherer')
let headerDiv = topDiv.querySelector('span')
let infoDiv = topDiv.querySelector('p')

// infoDiv.style.display = 'none'
infoDiv.innerHTML = ''

headerDiv.innerText += ' (w/MtgExt)'

let infoString =
`MtgExt by Matt 'CmdrZero' Evans
mattevans404@gmail.com`

let dropdown = new Gui.BinDropdown()
messageSender.send({cmd:'db getBins'})
  .then(bins => {
    if (!bins) return // TODO: Error handle
    dropdown.update(bins)
  })
dropdown.style.width = '100%'

// TODO: Refactor this out eventually
let fileSelect = new Gui.FileSelect(evt => {
  let binValue = dropdown.selectedValue()
  if (!binValue) {
    evt.target.value = null
    return console.log(`ERROR: BinValue: ${binValue}`)
  }

  let file = evt.target.files[0]
  if (!file) return

  let reader = new FileReader()
  reader.onload = e => {
    let contents = e.target.result
    handleFile(contents)
    evt.target.files = null
  }
  reader.readAsText(file)
})
fileSelect.style.width = '100%'

function handleFile (contents) {
  let cards = getObjectsFromCSV(contents)
  cards.forEach(card => {
    messageSender.send(
      {cmd:'db binCard', args:[card.MultiverseID, dropdown.selectedValue()]}
    )
  })
}

function getObjectsFromCSV (contents) {
  let array = contents.split('\n')
  let header = array.shift()
  headers = header.split(' | ')
  array = array.map(card => {
    let out = {}
    cardValues = card.split(' | ')
    headers.forEach((key, index) => {
      out[key] = cardValues[index]
    })
    return out
  })
  return array
}
// End Refactor

let table = new Gui.Table([
  new Gui.TableRow([
    new Gui.TableCell(infoString, null, 3),
    new Gui.TableCell('Populate Bin from CSV:')
  ]),
  new Gui.TableRow([
    new Gui.TableCell(dropdown)
  ]),
  new Gui.TableRow([
    new Gui.TableCell(fileSelect)
  ])
])
table.style.width = '100%'

infoDiv.appendChild(table)
