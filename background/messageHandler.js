
chrome.runtime.onMessage.addListener((request,sender,respond)  => {
  switch (request.cmd) {
    case "db getBins":
      chromeStorageHandler.getBins()
        .then(data => {
          respond({response:data})
        })
    break
    case "db addBin":
      chromeStorageHandler.addBin(...request.args)
        .then(data => {
          respond({response:data})
        })
    break
    case "db getCardLocations":
      chromeStorageHandler.getCardLocations(...request.args)
        .then(data => {
          respond({response.data})
        })
    default:
      // return error
      break
  }
})
