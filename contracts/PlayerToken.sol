// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract PlayerToken is ERC721URIStorage, Ownable {
  uint256 playersCount;

  constructor() ERC721('Player', 'Player') {
    playersCount = 0;
  }

  function createPlayer(string calldata _uri) public onlyOwner {
    uint256 newItemId = playersCount;
    _mint(address(this), newItemId);
    _setTokenURI(newItemId, _uri);
    playersCount++;
  }

  function createPlayers(string[] calldata _uris) public onlyOwner {
    for (uint256 i = 0; i < _uris.length; i++) {
      uint256 newItemId = playersCount;
      _mint(address(this), newItemId);
      _setTokenURI(newItemId, _uris[i]);
      playersCount++;
    }
  }

  function getPlayers() public view returns (string[] memory) {
    string[] memory playersUri = new string[](playersCount);
    for (uint256 i = 0; i < playersCount; i++) {
      playersUri[i] = tokenURI(i);
    }
    return playersUri;
  }

  function getPlayer(uint256 id) public view returns (string memory) {
    return tokenURI(id);
  }

  function getPlayersCount() public view returns (uint256) {
    return playersCount;
  }
}
