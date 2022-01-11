/*
   2. Read from players.json
   3. Write players data with img to new files
*/
const generatePlayersMeta = (players, imgUrls, targetPath) => {
  const fs = require('fs')
  players.map((eachPlayer, index) => {
    eachPlayer.image = imgUrls[index]
    fs.writeFileSync(
      `${targetPath}/player-${index}.json`,
      JSON.stringify(eachPlayer)
    )
    return eachPlayer
  })
}
exports.generatePlayersMeta = generatePlayersMeta
