let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productGrid = document.getElementById("productGrid");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const searchInput = document.getElementById("searchInput");
const sortPrice = document.getElementById("sortPrice");
const categoryButtons = document.querySelectorAll(".category");

const cartSidebar = document.getElementById("cartSidebar");
const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");

let selectedCategory = "All";


// Render Products
function renderProducts(){

    productGrid.innerHTML = "";

    const keyword = searchInput.value.toLowerCase();

    let filteredProducts = products.filter(product => {

        const matchCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchSearch =
            product.name.toLowerCase().includes(keyword);

        return matchCategory && matchSearch;

    });

    if(sortPrice.value === "low"){
        filteredProducts.sort((a,b)=>a.price-b.price);
    }
    else if(sortPrice.value === "high"){
        filteredProducts.sort((a,b)=>b.price-a.price);
    }
    filteredProducts.forEach(product => {

        productGrid.innerHTML += `

        <div class="card">

            <img src="${product.image}" alt="${product.name}">

            <div class="card-content">

                <h3>${product.name}</h3>

                <p class="category-text">${product.category}</p>

                <p class="price">₹${product.price}</p>

                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>

        </div>

        `;

    });

}
// Add To Cart
function addToCart(id){

    const item = cart.find(product => product.id === id);

    if(item){

        item.quantity++;

    }

    else{

        cart.push({
            id:id,
            quantity:1
        });

    }

    saveCart();

    renderCart();

}
// Render Cart

function renderCart(){

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(cartItem=>{

        const product = products.find(p=>p.id===cartItem.id);

        total += product.price * cartItem.quantity;

        cartItems.innerHTML += `

        <div class="cart-product">

            <div>

                <h4>${product.name}</h4>

                <p>₹${product.price}</p>

            </div>

            <div>

                <button onclick="decrease(${product.id})">−</button>

                <span> ${cartItem.quantity} </span>

                <button onclick="increase(${product.id})">+</button>

            </div>

        </div>

        `;

    });

    cartTotal.innerText = total;

    updateCount();

}
// Increase Quantity
function increase(id){

    const item = cart.find(p=>p.id===id);

    item.quantity++;

    saveCart();

    renderCart();

}


// Decrease Quantity
function decrease(id){

    const item = cart.find(p=>p.id===id);

    item.quantity--;

    if(item.quantity===0){

        cart = cart.filter(p=>p.id!==id);

    }

    saveCart();

    renderCart();

}

// Update Cart Count
function updateCount(){

    const count = cart.reduce((sum,item)=>sum+item.quantity,0);

    cartCount.innerText = count;

}


// Local Storage


function saveCart(){

    localStorage.setItem("cart",JSON.stringify(cart));

}


// Search

searchInput.addEventListener("input",()=>{

    renderProducts();

});


// Category Filter

categoryButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        categoryButtons.forEach(btn=>btn.classList.remove("active"));

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        renderProducts();

    });

});

sortPrice.addEventListener("change", () => {
    renderProducts();
});

// Cart Sidebar

cartBtn.addEventListener("click",()=>{

    cartSidebar.classList.add("active");

});

closeCart.addEventListener("click",()=>{

    cartSidebar.classList.remove("active");

});


// Initial Load

renderProducts();

renderCart();