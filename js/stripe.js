function checkout(){
    alert("Redirecting to secure Stripe Checkout");
    window.location.href="https://checkout.stripe.com/pay/test";
   }
   
//const stripe = Stripe("pk_test_xxx");

//function checkout(sessionId){
  //stripe.redirectToCheckout({ sessionId });
//}
