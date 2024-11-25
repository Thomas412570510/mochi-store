// 確保cart變數只在這裡宣告一次
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// 設定倒數計時的時間（例如：1 小時 30 分鐘）
const countdownEndTime = new Date().getTime() + 90 * 60 * 1000; // 90 分鐘後

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownEndTime - now;

    if (distance <= 0) {
        document.getElementById('timer').innerText = "折扣結束!";
        clearInterval(countdownInterval);
    } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('timer').innerText = `${hours}時 ${minutes}分 ${seconds}秒`;
    }
}

const countdownInterval = setInterval(updateCountdown, 1000); // 每秒更新一次

// 顯示購物車商品
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>你的購物車是空的。</p>';
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50">
            <p>${item.name}</p>
            <p>價格: NT$${item.price}</p>
            <p>數量: ${item.quantity}</p>
            <button class="remove-item" data-id="${item.id}">移除</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    calculateTotalPrice();
}

// 計算總金額
function calculateTotalPrice() {
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
    });

    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.innerText = `總金額: NT$${totalPrice}`;
    }
}

// 點擊「加入購物車」按鈕
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        const productPrice = parseInt(this.getAttribute('data-price'));
        const productName = this.previousElementSibling.previousElementSibling.innerText;
        const productImage = this.previousElementSibling.src;

        const existingItemIndex = cart.findIndex(item => item.id === productId);
        if (existingItemIndex === -1) {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        } else {
            cart[existingItemIndex].quantity++;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    });
});

// 移除商品
document.getElementById('cart-items').addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-item')) {
        const productId = event.target.getAttribute('data-id');
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }
});

// 點擊「結帳」按鈕的行為
document.getElementById('checkout-button').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('購物車為空，無法結帳！');
        return;
    }

    // 計算總金額
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    // 將總金額存入 localStorage
    localStorage.setItem('totalAmount', totalPrice);

    // 跳轉到付款頁面
    window.location.href = 'payment.html';
});

// 初始化購物車顯示
displayCartItems();
