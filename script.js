// 取得本地存儲的購物車
let cart = JSON.parse(localStorage.getItem("cart")) || []; 
let totalPrice = 0;

// 顯示購物車商品
function displayCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ""; // 清空原有內容

    // 顯示所有商品
    cart.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50">
            <p>${item.name}</p>
            <p>價格: $${item.price}</p>
            <p>數量: ${item.quantity}</p>
            <button class="remove-item" onclick="removeItem(${item.id})">移除</button>
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

// 移除商品
function removeItem(productId) {
    // 找到並移除商品
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart)); // 更新本地存儲
    displayCartItems(); // 重新顯示購物車
}

// 觸發結帳操作
document.getElementById("checkout-button")?.addEventListener("click", function() {
    if (cart.length === 0) {
        alert("購物車為空，無法結帳！");
        return;
    }
    // 跳轉到付款頁面並傳遞總金額
    window.location.href = "payment.html?totalPrice=" + totalPrice;
});

// 取得 URL 參數
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        totalPrice: params.get("totalPrice") || 0 // 如果沒有參數，設為 0
    };
}

// 顯示總金額
function displayTotalPrice() {
    const { totalPrice } = getUrlParams();
    document.getElementById("total-amount").innerText = `總金額: $${totalPrice}`;
}

// 付款表單提交處理
document.getElementById("payment-form")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const store = document.getElementById("store").value;
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    // 顯示訂單確認訊息
    alert(`訂單確認：\n姓名：${name}\n電話：${phone}\n門市：${store}\n付款方式：${paymentMethod}\n總金額：$${getUrlParams().totalPrice}`);

    // 清空購物車並跳轉至完成頁面
    localStorage.removeItem("cart");
    window.location.href = "thankyou.html"; // 跳轉到完成頁面
});

// 初始化頁面
displayCartItems();
displayTotalPrice();

// 確保結帳按鈕正常
console.log("Cart:", cart);
console.log("Total Price:", totalPrice);

