// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import '@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';

contract PlayerToken is ERC721URIStorageUpgradeable, OwnableUpgradeable {
  uint256 playersCount;

  function initialize() public initializer {
    playersCount = 0;
    __ERC721_init('Player', 'Player');
    __Ownable_init();
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
