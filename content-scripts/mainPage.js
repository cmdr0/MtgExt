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

let fileSelect = new Gui.FileSelect(evt => {
  let binValue = dropdown.selectedValue()
  if (!binValue) return console.log(`ERROR: BinValue: ${binValue}`)

  let file = evt.target.files[0]
  if (!file) return

  let reader = new FileReader()
  reader.onload = e => {
    let contents = e.target.result
    handleFile(contents)
  }
  reader.readAsText(file)
})
fileSelect.style.width = '100%'

function handleFile (contents) {
  console.log(contents)
}

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
