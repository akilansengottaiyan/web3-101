// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/math/Math.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import './PlayerToken.sol';
import './Participants.sol';

contract Auction is PlayerToken, Participants {
  using Math for *;
  bool isAuctionLive;
  uint256 currentPlayerIndex;
  uint256 a = 100;
  uint256 b = 7;
  uint256 abc = uint256(100) / 7;
  struct Bid {
    address bidder;
    uint256 bidAmount;
    uint256 bidAt; // time at which bid was placed. Its needed since elapse time of one minute is allowed for other bidders to bid before the curentbidder claims his playerToken;
  }
  Bid currentBid;
  event AuctionStarted();
  event AuctionEnded();
  event PlayerSold(Bid indexed bid, uint256 indexed soldPlayer);

  constructor(address priceFeedAddress) Participants(priceFeedAddress) {}

  modifier liveAuction() {
    require(isAuctionLive == true, 'Auction is not live');
    _;
  }

  function startAuction() public onlyOwner {
    require(isAuctionLive == false, 'Auction is already live');
    isAuctionLive = true;
    currentPlayerIndex = 0;
    emit AuctionStarted();
  }

  function endAuction() public liveAuction {
    isAuctionLive = false;
    currentBid = Bid(address(0), 0, 0);
    emit AuctionEnded();
  }

  function bidForPlayer(uint256 bidAmount) public liveAuction {
    Participant memory p = participants[isParticipantPresent[msg.sender]];
    require(
      currentBid.bidder != msg.sender,
      'Bit already placed.Please wait for others'
    );
    require(bidAmount <= p.remainingBudgetToBid, 'Insufficient balance');
    require(
      bidAmount >= currentBid.bidAmount + 10,
      'Bid amount should be atleast 10 units greater than the last bid'
    );
    require(bidAmount % 10 == 0, 'Bid amount should be a multiple of 10');
    currentBid = Bid(msg.sender, bidAmount, block.timestamp);
  }

  function transferPlayer() private {
    _transfer(address(this), msg.sender, currentPlayerIndex);
    Participant storage p = participants[isParticipantPresent[msg.sender]];
    p.remainingBudgetToBid -= currentBid.bidAmount;
    p.ownedPlayers.push(currentPlayerIndex);
  }

  function claimPlayer() public payable liveAuction {
    require(
      msg.sender == currentBid.bidder,
      'Raise your bid to claim the player'
    );
    require(
      block.timestamp - currentBid.bidAt > 20 seconds,
      'Need to wait 1 minute for others to bid'
    );
    transferPlayer();
    emit PlayerSold(currentBid, currentPlayerIndex);
    if (currentPlayerIndex == playersCount - 1) {
      endAuction();
      return;
    }
    currentPlayerIndex += 1;
    currentBid = Bid(address(0), 0, 0);
  }
}
