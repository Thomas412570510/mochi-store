const nodemailer = require('nodemailer');

// 創建郵件傳輸器
const transporter = nodemailer.createTransport({
  service: 'gmail',  // 使用 Gmail 發送郵件
  auth: {
    user: 'rachel05140516@gmail.com',  // 替換成你的 Gmail 帳戶
    pass: 'gggx xnwj thxg vssx'    // 這裡是你的 Gmail 密碼
  }
});

// 發送訂單郵件函數
function sendOrderEmail(orderDetails, callback) {
  // 郵件內容
  const mailOptions = {
    from: 'rachel05140516@gmail.com',  // 發件人
    to: orderDetails.email,        // 收件人（顧客的電子郵件）
    subject: 'Mochi Store 訂單確認',  // 郵件主題
    text: `親愛的 ${orderDetails.name} 您好！\n\n感謝您的購買！以下是您的訂單詳細資料：\n\n` + 
          `訂單編號：${orderDetails.orderId}\n` +
          `收件人姓名：${orderDetails.name}\n` +
          `收件人電話：${orderDetails.phone}\n` +
          `門市名稱：${orderDetails.store}\n` +
          `付款方式：${orderDetails.paymentMethod}\n` +
          `總金額：$${orderDetails.totalAmount}\n\n` +
          `您的商品訂單：\n${orderDetails.items}\n\n` +
          `我們會盡快為您處理訂單，謝謝！`
  };
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('發送郵件失敗:', error);  // 這裡會輸出錯誤信息
    return callback(error);
  }
  console.log('郵件發送成功:', info.response);  // 輸出發送成功的信息
  callback(null, info.response);
});

// 測試發送郵件
const orderDetails = {
  name: 'Rebecca',
  email: 'rachel05140516@gmail.com',
  phone: '0987654321',
  store: 'Mochi Store Taipei',
  paymentMethod: '信用卡',
  totalAmount: '999',
  orderId: 'ORD123456789',
  items: '商品1 - 數量：2 - 單價：$500\n商品2 - 數量：1 - 單價：$499'
};

sendOrderEmail(orderDetails, (error, response) => {
  if (error) {
    console.log('發送郵件失敗:', error);
  } else {
    console.log('郵件發送成功:', response);
  }
});

