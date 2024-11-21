let cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const price = parseInt(e.target.getAttribute('data-price'));
        const productName = e.target.previousElementSibling.previousElementSibling.textContent;
        
        cart.push({ name: productName, price: price });
        updateCart();
    });
});

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    
    cartItems.innerHTML = cart.map(item => `<p>${item.name} - NT$${item.price}</p>`).join('');
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalPrice.innerHTML = `總價: NT$${total}`;
}

document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('您的購物車是空的，請選擇商品!');
    } else {
        alert('感謝您的購買！');
        cart = []; // 清空購物車
        updateCart();
    }
});
