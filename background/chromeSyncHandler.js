let chromeStorageHandler = (_ => {

  let syncGet = function(key) {
    return new Promise (function (resolve, reject) {
      chrome.storage.sync.get(key, data => {
        resolve(data[key])
      })
    })
  }

  let syncSet = function(key, value) {
    return new Promise (function (resolve, reject) {
      let obj = {}
      obj[key]=value
      chrome.storage.sync.set(obj, _ => {
        resolve()
      })
    })
  }

  let logError = (error) => {
    console.log(error)
    console.log(error.stack)
  }

  return {

    getBins: async function () {
      try {
        let out = await syncGet('bins') || []
        return out
      } catch {
        logError(error)
        return false
      }
    },

    addBin: async function (binName) {
      try {
        let bins = await this.getBins() || []
        let index = bins.indexOf(binName)
        if (index == -1) {
          bins.push(binName)
          await syncSet('bins', bins)
        }
        return true
      } catch {
        logError(error)
        return false
      }
    },

    // TODO: RemoveBin
    // Cycle through every card
    // Move each into 'unbinned'
    // Splice bin out of bins key

    getCardLocations: async function (multiverseID) {
      try {
        let out = await syncGet(multiverseID) || []
        return out
      } catch (error) {
        logError(error)
        return false
      }
    },

    binCard: async function (multiverseID, binName) {
      try {
        addBin(binName)
        let cardLocations = await this.getCardLocations(multiverseID)
        cardLocations.push(binName)
        await syncSet(multiverseID, cardLocations)
        return true
      } catch (error) {
        logError(error)
        return false
      }
    },

    unbinCard: async function (multiverseID, binName) {
      try {
        let cardLocations = await this.getCardLocations(multiverseID)
        let index = cardLocations.indexOf(binName)
        if (index == -1) throw new Error("Bin '"+binName+"' not attached to ID '"+multiverseID+"'")
        cardLocations.splice(index, 1)
        await syncSet(multiverseID, cardLocations)
        return true
      } catch (error) {
        logError(error)
        return false
      }
    },

    moveCard: async function (multiverseID, oldBinName, newBinName) {
      try {
        addBin(newBinName)
        let cardLocations = await this.getCardLocations(multiverseID)
        let index = cardLocations.indexOf(oldBinName)
        if (index == -1) throw new Error("Bin '"+oldBinName+"' not attached to ID '"+multiverseID+"'")
        cardLocations.splice(index, 1)
        cardLocations.push(newBinName)
        await syncSet(multiverseID, cardLocations)
        return true
      } catch (error) {
        logError(error)
        return false
      }
    }
  }
})()
