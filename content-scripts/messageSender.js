let messageSender = (() => {

  function send (obj) {
    return new Promise(
      function(resolve, reject) {
        chrome.runtime.sendMessage(obj, resolve)
      }
    )
  }

  return {
    send: send
  }
})()
