let cart = [];  // 用來存放購物車內的商品

// 顯示或隱藏購物車
function toggleCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.style.display = cartContainer.style.display === 'block' ? 'none' : 'block';
}

// 更新購物車顯示
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    
    // 清空購物車列表
    cartItems.innerHTML = '';
    
    // 顯示購物車中的商品
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        cartItems.appendChild(li);
    });
    
    // 更新購物車商品數量
    cartCount.textContent = cart.length;
}

// 為每個 "加入購物車" 按鈕設置事件
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.previousElementSibling.textContent;  // 取得商品名稱
        cart.push(productName);  // 把商品加入購物車
        updateCart();  // 更新購物車顯示
    });
});
