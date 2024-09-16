const products = [
    { name: "Ring Video", price: 200, id: 1, quantity: 1, picture: "images/1-ringvideo.png", description: "Smart doorbell camera" },
    { name: "Fire Max", price: 300, id: 2, quantity: 1, picture: "images/2-firemax.png", description: "High-performance tablet" },
    { name: "Airtag", price: 400, id: 3, quantity: 1, picture: "images/3-airtag.png",description: "finding your device easily" },
    { name: "Adaptor", price: 500, id: 4, quantity: 1, picture: "images/4-chargingadaptor.png",description: "fast charge adaptor" },
    { name: "Canon Camara", price: 600, id: 5, quantity: 1, picture: "images/5-canoncamara.png",description: "hight quality camara" },
    { name: "hp Laptop", price: 700, id: 6, quantity: 1, picture: "images/6-hplaptop.png",description: "high quality laptop" },
]

let cart = [];
{/* */}

const productHTML = products.map((product) => `
    <div class="product-card">
    <h2 class="product-name">${product.name}</h2>
    <img class= "product-picture" src="${product.picture}"  style="height: 100px; width: 150px;">   
    <strong>${product.price}</strong>
    <button class="product-btn" id=${product.id}>Add To cart</button>
     <p class="product-desc" style="border: 1px solid var(--gray); border-radius: 0.6rem; height:35px; width:100px; display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;" onclick="showModal(${product.id})">Description</p>
        <div id="myModal_${product.id}" class="modal">
            <div class="modal-content"  style="border: 4px solid var(--gray); border-radius: 1rem;">
                 <span class="close"style="display: flex; justify-content: flex-end;" >&times;</span>
                <h2 style="margin-bottom: 0;">Product Description</h2>
                <div style="display: flex; align-items: flex-start; margin-top:100px;">
                <img class="modal-picture" src="${product.picture}" style="height: 200px; width: 250px; margin-top: 2rem; border: 1px solid var(--gray);">
                <div style="flex-grow: 1;">
                <h1 class="a-size-base-plus a-text-bold"> About this item </h1>
                <ul  style="margin-left: 0; padding-left: 0;">
                <li class="product-li" style="list-style-type:none;">This device has a high quality </li>
                <li class="product-li" style="list-style-type:none;">It has a gaurantee </li>
                </ul>
                <p id="description_${product.id} style="margin-top: 10px;"></p>
                </div>
                </div>
            </div>
        </div>
    </div>
`)
/*  */
function showModal(productId) {
    const modal = document.getElementById(`myModal_${productId}`);
    modal.style.display = "block";
    
    const product = products.find(p => p.id === productId);
    
    document.getElementById(`description_${productId}`).textContent = product.description;
}

window.onclick = function(event) {
    var modals = document.querySelectorAll(".modal");
    modals.forEach(modal => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var spans = document.getElementsByClassName("close");
    Array.from(spans).forEach(span => {
        span.onclick = function() {
            var modal = this.closest('.modal');
            modal.style.display = "none";
        }
    });
});

const result = document.querySelector(".result");
result.innerHTML = productHTML.join("")


/*  */
function updateCart() {
    const cartHTML = cart.map((item) => `
    <div class="cart-item">
    <h3 >${item.name}</h3>
    <img class="cart-picture" src="${item.picture}" style="height:50 px; width:75px;">
        <div class="cart-detail">
            <div class="mid">
            <button onclick={decrItem(${item.id})}>-</button>
            <p>${item.quantity}</p>
            <button onclick={incrItem(${item.id})}>+</button>
            </div>
            <p>${item.price}</p>
            <button onclick={deleteItem(${item.id})} class="caer-product" id=${item.id}>Delete</button>
        </div>
    </div>
    `)

    const cartItems = document.querySelector(".cart-items");
    cartItems.innerHTML = cartHTML.join("")
}


let num = document.querySelectorAll(".product-btn").length;
for (let i = 0; i < num; i++) {

    document.querySelectorAll(".product-btn")[i].addEventListener("click", function (e) {
        addToCart(products, parseInt(e.target.id))
    })

}

/*  */
function addToCart(products, id) {
    const product = products.find((product) => product.id === id);
    const cartProduct = cart.find((product) => product.id === id);

    if (cartProduct != undefined && product.id == cartProduct.id) {
        incrItem(id);
    } else {
        cart.push(product)
    }
    updateCart();
    getTotal(cart);
}

/*  */
function getTotal(cart) {
    let { totalItem, cartTotal } = cart.reduce(
        (total, cartItem) => {

            total.cartTotal += Number(cartItem.price) * Number(cartItem.quantity);
            total.totalItem += cartItem.quantity;


            return total;

        }, { totalItem: 0, cartTotal: 0 }
    );
    const totalItemsHTML = document.querySelector(".noOfItems")
    totalItemsHTML.innerHTML = `${totalItem} items`;
    const totalAmountHTML = document.querySelector(".total")
    totalAmountHTML.innerHTML = `${cartTotal}`
    console.log(totalItem, cartTotal);

}

/*  */
function incrItem(id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i] && cart[i].id == id) {
            cart[i].quantity += 1;
        }
        updateCart()
        getTotal(cart);
    }
    console.log(incrItem)
}

/*  */
function decrItem(id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i] && cart[i].id == id) {
            cart[i].quantity -= 1;
        }
        updateCart()
        getTotal(cart);
    }
}

/*  */
function deleteItem(id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].quantity = 1;
            cart.splice(i, 1)
        }
    }
    updateCart()
    getTotal(cart);

}