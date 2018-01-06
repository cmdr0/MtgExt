// TODO: Wrap this into messageHandler format, update messageHandler to handle it
chrome.runtime.sendMessage({cmd:'db getBins'}, data => console.log(data))

// TODO: Create strings object
console.log('MtgExt 0.0.1 Running...')

let cardEntries = (() => {
  let out = []
  let rowElements = document.querySelectorAll('tr.cardItem')
  rowElements.forEach(tr => {
    out.push(new StandardViewCardEntry(tr))
  })
  return out
})()
