// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

contract Participants is OwnableUpgradeable {
  uint256 maxParticipants;
  AggregatorV3Interface public priceFeed;
  struct Participant {
    uint256 id;
    string name;
    address location;
    uint256[] ownedPlayers;
    uint256 points;
    uint256 remainingBudgetToBid;
  }
  Participant[] participants;
  address public priceFeedAddress;
  event ParticipantAdded(string indexed name, uint256 totalParticipants);

  mapping(address => uint256) isParticipantPresent;

  function initialize(address _priceFeedAddress) public virtual initializer {
    __Ownable_init();
    priceFeedAddress = _priceFeedAddress;
    priceFeed = AggregatorV3Interface(priceFeedAddress);
    maxParticipants = 5;
  }

  function getPriceFeedAddress() external view returns (address) {
    return priceFeedAddress;
  }

  function getLatestPrice() public view returns (int256) {
    (, int256 price, , , ) = priceFeed.latestRoundData();
    return price;
  }

  function addParticipant(string memory name) public payable {
    require(
      ((msg.value) * uint256(getLatestPrice() / 10**8)) / 10**18 > 100,
      'Value should be greater than $100'
    );
    require(
      isParticipantPresent[msg.sender] == 0 &&
        (participants.length == 0 || participants[0].location != msg.sender),
      'Participant already present'
    );
    require(
      participants.length < maxParticipants,
      'Maximum no of participants reached'
    );
    Participant memory p;
    p.name = name;
    p.location = msg.sender;
    p.remainingBudgetToBid = 100;
    p.id = participants.length;
    isParticipantPresent[msg.sender] = p.id;
    participants.push(p);
    emit ParticipantAdded(name, participants.length);
  }

  function getParticipants() public view returns (Participant[] memory) {
    return participants;
  }

  function getParticipant(uint256 id) public view returns (Participant memory) {
    require(id < participants.length, 'Invalid id');
    return participants[id];
  }

  function getParticipantViaMapping() public view returns (Participant memory) {
    uint256 id = isParticipantPresent[msg.sender];
    return participants[id];
  }

  function modifyMaxParticipants(uint256 newValue) public onlyOwner {
    maxParticipants = newValue;
  }
}
