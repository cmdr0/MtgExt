// chrome.browserAction.onClicked.addListener(tab => {chrome.runtime.reload(); chrome.tabs.reload(tab.id)})
chrome.runtime.onMessage.addListener(req => {
  if (req.command == "reload") chrome.runtime.reload()
})
