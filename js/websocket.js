let socket = new SockJS('http://localhost:8080/ws');
let stompClient = Stomp.over(socket);

stompClient.connect({}, () => {
  stompClient.subscribe('/topic/bids', msg => {
    document.getElementById("currentBid").innerText =
      "Highest Bid: $" + JSON.parse(msg.body).amount;
  });
});
