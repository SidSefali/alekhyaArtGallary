let auctionEnd = new Date("2026-02-01T18:00:00");

setInterval(() => {
  const diff = auctionEnd - new Date();
  document.getElementById("timer").innerText =
    diff > 0 ? Math.floor(diff/1000)+" sec left" : "Auction Closed";
}, 1000);

function placeBid(){
  stompClient.send("/app/bid",{},JSON.stringify({
    amount: document.getElementById("bidAmount").value
  }));
}
