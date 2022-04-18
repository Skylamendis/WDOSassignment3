let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let CloseCart = document.querySelector('#close-cart');
var hiddenInp = document.getElementsByClassName("hidden");

/*cartIcon.onclick = () =>{
    hiddenInp.style.display = "incline";
}

CloseCart.onclick = () =>{
    hiddenInp.style.display = "incline"
}*/

/*for the pop cart */
const openCartButtons = document.querySelectorAll('[data-cart-target]');
const closeCartButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openCartButtons.forEach(button => {
    button.addEventListener('click',() =>{
        const cart = document.querySelector(button.dataset.cartTarget);
        openCart(cart)
    })
})

closeCartButtons.forEach(button => {
    button.addEventListener('click',() =>{
        const cart = button.closest('.cart');
        closeCart(cart)
    })
})

function openCart(cart){
    if (cart == null)return
    cart.classList.add('active');
    overlay.classList.add('active');
}

function closeCart(cart){
    if (cart == null)return
    cart.classList.remove('active');
    overlay.classList.remove('active');
}

if(document.readyState == 'loading'){
    document.addEventListener("DOMContentLoaded",ready);
}
else{
    ready()
}

function ready(){
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for( var i = 0; i < removeCartButtons.length;i++){
        var button = removeCartButtons[i];
        button.addEventListener('click',removeCartItem);
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change",quantityChanged);
    }
    var addCart = document.getElementsByClassName('add-to-cart');
    for( var i = 0; i < addCart.length;i++){
        var button = addCart[i];
        button.addEventListener("click",addCartClicked);
    }
    document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

function buyButtonClicked(){
    alert('Thank you for your order');
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstElementChild);
    }
    updateTotal();
}

function removeCartItem(event){
    var buttonClicked = event.taregt;
    buttonClicked.parentElement.remove();
    updateTotal();
}

function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value)|| input.value <= 0){
        input.value = 1;
    }
    updateTotal();
}

function addCartClicked(event){
    var  button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title,price,productImg);
    updateTotal();
}

function addProductToCart(title,price,productImg){
    var cartShopBox = document.createElement("div");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for(var i = 0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title){
        alert("You have already add this item to cart")
        }
    }
var cartBoxContent =` <img src="${productImg}" alt="" class="cart-img">
                      <div class="detail-box">
                      <div class="cart-product-title">${title}</div>
                      <div class="cart-price">${price}</div>
                      <input type="number" value="1" class="cart-quantity">
                      </div>
                      <i class="fa-solid fa-trash cart-remove"></i>`;
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox
.getElementsByClassName('cart-remove')[0]
.addEventListener('click', removeCart);
cartShopBox
.getElementsByClassName("cart-quantity")[0]
.addEventListener('change', quantityChanged);
}

function updateTotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for(var i = 0; i < removeCartButtons.length;i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.relace("LKR",""));
        var quantity = quantityElement.value;
        total = total + price * quantity;

        document.getElementsByClassName('total-price')[0].innerText = 'LKR' + total;
    }
}

/*add to favourites

const inpKey = document.getElementsByClassName("product-info");
const btnFavourite = document.getElementsByClassName("addfavorites");
const outputFavourite = document.getElementsByClassName("lsOutput");

btnFavourite.onclick = AddToFavourites();{
    const key = inpKey.value;
    localStorage.setItem(inpKey);
    location.reload();
}

display on the cart page
for(let i = 0; i < localStorage.length; i++){
    const key = localStorage.key(i);

    outputFavourite.innerHTML += `${key}`;
}
-this code didnt work*/

