// 取得本地存儲的購物車
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 顯示購物車商品
function displayCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ""; // 清空原有內容

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>你的購物車是空的。</p>";
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <img src="https://via.placeholder.com/50" alt="${item.name}" width="50">
                <p>${item.name}</p>
                <p>價格: NT$${item.price}</p>
                <p>數量: ${item.quantity}</p>
                <button class="remove-item" onclick="removeItem(${item.id})">移除</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    calculateTotalPrice(); // 更新總金額
}

// 計算總金額
function calculateTotalPrice() {
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
    });

    document.getElementById("total-price").innerText = `總金額: NT$${totalPrice}`;
}

// 移除商品
function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart)); // 更新本地存儲
    displayCartItems(); // 重新顯示購物車
}

// 加入購物車事件處理
document.getElementById("products").addEventListener("click", function(event) {
    if (event.target.classList.contains("add-to-cart")) {
        const productId = event.target.dataset.id;
        const productName = event.target.closest(".product-card").querySelector("p").innerText;
        const productPrice = event.target.dataset.price;

        const product = cart.find(item => item.id === productId);

        if (product) {
            product.quantity += 1; // 如果商品已在購物車，數量+1
        } else {
            cart.push({ 
                id: productId, 
                name: productName, 
                price: parseInt(productPrice),
                quantity: 1 
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart)); // 更新本地存儲
        displayCartItems(); // 重新顯示購物車
    }
});

// 初始顯示購物車商品
displayCartItems();


