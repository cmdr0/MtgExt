let Gui = (() => {

  return {
    Table: function (rows) {
      let table = document.createElement('table')
      rows.forEach(tr => {table.appendChild(tr)})
      return table
    },

    TableRow: function (cells) {
      let tr = document.createElement('tr')
      cells.forEach(td => {tr.appendChild(td)})
      return tr
    },

    TableCell: function (cellContent, colspan, rowspan) {
      let td = document.createElement('td')
      if (cellContent instanceof HTMLElement) td.appendChild(cellContent)
      else td.innerText = cellContent
      if (colspan) td.colSpan = colspan
      if (rowspan) td.rowSpan = rowspan
      return td
    },

    Button: function (text, clickFunc, styleObj) {
      let button = document.createElement('button')
      button.innerText = text
      button.onclick = clickFunc
      button.type = 'button'
      return button
    },

    BinDropdown: function (startingBins) {
      let dropdown = document.createElement('select')
      dropdown.clear = () => {
        for (let i = dropdown.options.length; i > 0; --i) {
          dropdown.remove(0)
        }
      }
      dropdown.update = bins => {
        let defaultOption = document.createElement('option')
        defaultOption.text = 'Select a Bin'
        defaultOption.value = ''
        dropdown.clear()
        dropdown.appendChild(defaultOption)
        bins.forEach(bin => {
          let option = document.createElement('option')
          option.text = bin
          option.value = bin
          dropdown.appendChild(option)
        })
      }
      dropdown.selectedValue = () => {
        return dropdown.options[dropdown.selectedIndex].value
      }
      if (!startingBins) startingBins = []
      dropdown.update(startingBins)
      return dropdown
    },

    FileSelect: function (fileHandleFunc) {
      let fileSelect = document.createElement('input')
      fileSelect.type = 'file'
      fileSelect.onchange = fileHandleFunc
      return fileSelect
    }
  }

})()
