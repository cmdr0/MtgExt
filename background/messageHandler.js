chrome.runtime.onMessage.addListener((request,sender,respond)  => {
  console.log('[i] Received message:')
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
    console.log('[i] Processing "${request.cmd}"')
    let arguments = request.args || []
    modules[module][command](...arguments)
      .then(data => respond(data))
  } else {
    console.log('[-] Command not recognized')
    respond({error: 'Unknown Command'})
  }
  return true
})

console.log('[+] messageHandler running...')