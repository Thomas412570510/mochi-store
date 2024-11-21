// 購物車商品數量和總金額
let cart = JSON.parse(localStorage.getItem("cart")) || []; // 取得本地存儲的購物車
let totalPrice = 0;

// 顯示購物車商品
function displayCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ""; // 清空原有內容

    cart.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50">
            <p>${item.name}</p>
            <p>價格: $${item.price}</p>
            <p>數量: ${item.quantity}</p>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
    
    calculateTotalPrice(); // 更新總金額
}

// 計算總金額
function calculateTotalPrice() {
    totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
    });

    document.getElementById("total-price").innerText = `總金額: $${totalPrice}`;
}

// 觸發結帳操作
document.getElementById("checkout-button").addEventListener("click", function() {
    alert(`您已成功結帳，總金額是 $${totalPrice}`);
    localStorage.removeItem("cart"); // 清空購物車
    cart = []; // 重置購物車
    displayCartItems(); // 顯示空購物車
});

// 初始化頁面
displayCartItems();

