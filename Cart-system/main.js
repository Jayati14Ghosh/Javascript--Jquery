function productnumquantity(){
  let productnum = document.getElementsByClassName("cart-single-quantity-number");
  for (let i = 0; i < productnum.length; i++){
    let productprice = document.getElementsByClassName("cart-single-price");
    let productOption = productnum[i];
    productOption.addEventListener("click", function(e){
      let getval = e.target.value;
      let multiply = parseInt(productprice[i].innerText) * getval;
      let productQuanPrice = document.getElementsByClassName("cart-single-price-total")[i].value = multiply;
      let selectedproducts = document.getElementsByClassName("cart-single-quantity-select")[i].innerHTML = getval;
      totalcartprice();
    });
  }
}
productnumquantity();

function totalcartprice(){
  let cartprice = document.getElementsByClassName("cart-total-price");
  let cartitemcontainer = document.getElementsByClassName("cart-single-item-container");
  let total = 0;
  for(let i = 0; i < cartitemcontainer.length; i++){
    let productprice = document.getElementsByClassName("cart-single-price")[i].innerHTML;
    let selectedproducts = document.getElementsByClassName("cart-single-quantity-select")[i].innerHTML;
    total += parseInt(selectedproducts) * parseInt(productprice);
    let updateCartTotalPrice = document.getElementsByClassName("cart-total-price")[0].innerHTML = total;
  }

}
totalcartprice();

function remove(){
  let removebtn = document.getElementsByClassName("cart-single-remove");
  for(let i = 0; i < removebtn.length; i++)
  {
    removebtn[i].addEventListener("click", function(){
      this.parentNode.parentNode.remove();
      totalcartprice();
    });
  }
}
remove();

function addToCart(){
  let productContainer = document.getElementsByClassName("product-container");
  let addToCartBtn = document.getElementsByClassName("add-to-cart");

  document.querySelectorAll(".add-to-cart").forEach((item, i) => {
    addToCartBtn[i].addEventListener("click", function(){
      let cardMainBody = this.parentNode.parentNode;
      let cardBody = this.parentNode;
      let getSrc = cardMainBody.children[0].src;
      let getTitle = cardBody.children[0].innerHTML;
      let getPrice = cardBody.children[1].innerHTML.substring(1);
      addItemToCart(getSrc, getTitle, getPrice);
    });
});
}
function addItemToCart(getSrc, getTitle, getPrice){
  var node = document.createElement("div");
      node.setAttribute("class", "cart-single-item-container d-flex align align-items-center flex-wrap py-4 border-bottom");
  var textnode = node.innerHTML=`<div class="col-12 col-md-6 col-lg-4 py-3">
      <img src="${getSrc}" style="width:70px; height:70px;" class="cart-single-img d-inline">
      <b class="cart-single-title d-inline fs-5 ps-3">${getTitle}</b>
    </div>
    <div class="col-12 col-md-6 col-lg-4 py-3">
      <span>Price - </span><b class="fs-5">$<span class="cart-single-price">${getPrice}</span></b>
      <span class="ps-5">Total - </span><b class="fs-5">$</b><input type="text" value="${getPrice}" class="cart-single-price-total border-0 fw-bolder fs-5" readonly style="width:60px;">
    </div>
    <div class="col-12 col-md-6 offset-md-6 offset-lg-0 col-lg-4 py-3  d-flex align align-items-center justify-content-between">
    <span>Quantity - <b class="cart-single-quantity-select fs-5">1</b></span>
      <select class="cart-single-quantity-number form-select" aria-label="Default select example" style="width:60px;">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
      <button class="cart-single-remove btn btn-danger rounded-0">Remove</button>
    </div>`;
      let cartitems = document.getElementById("cart-items");
      let cartitemnames = document.getElementsByClassName("cart-single-title");
      for(let i = 0; i < cartitemnames.length; i++){
        if(cartitemnames[i].innerText == getTitle){
          let quantityinput = document.getElementsByClassName("cart-single-quantity-select")[i].innerHTML = parseFloat(document.getElementsByClassName("cart-single-quantity-select")[i].innerHTML)+1;
          let singlecartprice = document.getElementsByClassName("cart-single-price")[i].innerHTML;
          let multiply = parseInt(quantityinput) * parseInt(singlecartprice);
          let getsinglecarttotalprice = document.getElementsByClassName("cart-single-price-total")[i].value = multiply;
          console.log(getsinglecarttotalprice);

          totalcartprice();
          remove();
          productnumquantity();
          return false;
        }

      }
  cartitems.appendChild(node);
  totalcartprice();
  remove();
  productnumquantity();
}
addToCart();
