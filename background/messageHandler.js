// TODO: Strings object?  MessageHandler.log?
chrome.runtime.onMessage.addListener((request,sender,respond)  => {
  console.log('messageHandler: [i] Received message:')
  console.dir(request)
  let modules = {
    db: chromeStorageHandler
  }
  let module, command
  if (
    request.cmd &&
    ([module, command] = request.cmd.split(' ')) &&
    modules.hasOwnProperty(module) &&
    modules[module].hasOwnProperty(command)
  ) {
    console.log(`messageHandler: [i] Processing: ${request.cmd}`)
    let arguments = request.args || []
    modules[module][command](...arguments)
      .then(data => {
        console.log(`messageHandler: [+] Returning:`)
        console.dir(data)
        respond(data)
      })
  } else {
    console.log('messageHandler: [-] Command not recognized')
    respond({error: 'Unknown Command'})
  }
  return true
})

console.log('messageHandler: [+] running...')
