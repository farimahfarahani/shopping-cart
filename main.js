const products = [
    { name: "product 1", price: 200, id: 1, quantity: 1, picture: "javascript.png" },
    { name: "product 2", price: 300, id: 2, quantity: 1, picture: ""  },
    { name: "product 3", price: 400, id: 3, quantity: 1, picture: ""  },
    { name: "product 4", price: 500, id: 4, quantity: 1, picture: ""  },
    { name: "product 5", price: 600, id: 5, quantity: 1, picture: ""  },
    { name: "product 6", price: 700, id: 6, quantity: 1, picture: ""  },
]

let cart = [];


const productHTML = products.map((product) => `
    <div class="product-card ">
    <h2 class="product-name">${product.name}</h2>
    
    <strong>${product.price}</strong>
    <button class="product-btn" id=${product.id}>Add To cart</button>
    </div>
`)

const result = document.querySelector(".result");
result.innerHTML = productHTML.join("")


/*  */
function updateCart() {
    const cartHTML = cart.map((item) => `
    <div class="cart-item">
    <h3 >${item.name}</h3>
        <div class="cart-detail">
            <div class="mid">
            <button onclick={decrItem(${item.id})}>-</button>
            <p>${item.quantity}</p>
            <button onclick={incrItem(${item.id})}>+</button>
            </div>
            <p>${item.price}</p>
            <button onclick={deleteItem(${item.id})} class="caer-product" id=${item.id}>D</button>
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
    console.log( totalItem, cartTotal);
    
}


function incrItem(id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i] && cart[i].id == id) {
            cart[i].quantity += 1;
        }
        updateCart()
        getTotal(cart);
    }
}

function decrItem(id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i] && cart[i].id == id) {
            cart[i].quantity -= 1;
        }
        updateCart()
        getTotal(cart);
    }
}


function deleteItem(id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].quantity = 1;
            cart.splice(i,1)
        }
    }
     updateCart()
     getTotal(cart);

}