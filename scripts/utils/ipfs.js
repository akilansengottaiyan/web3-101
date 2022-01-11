const _storeFiles = async (files, web3StorageClient) => {
  const cid = await web3StorageClient.put(files)
  const imageUrls = []
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    imageUrls.push(`https://${cid}.ipfs.dweb.link${file.name}`)
  }
  return imageUrls
}
const uploadFilesInPathToIpfs = async (path) => {
  const Web3Storage = require('web3.storage')
  const files = await Web3Storage.getFilesFromPath(path)
  const client = new Web3Storage.Web3Storage({
    token: process.env.WEB3_STORAGE_TOKEN
  })
  const fileUrls = await _storeFiles(files, client)
  return fileUrls
}

exports.uploadFilesInPathToIpfs = uploadFilesInPathToIpfs
