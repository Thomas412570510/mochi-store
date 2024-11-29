const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Email 發送設定
const transporter = nodemailer.createTransport({
    service: 'Gmail', // 或其他郵件服務供應商
    auth: {
        user: 'zxc55815@gmail.com',
        pass: 'cindy931103'
    }
});

// 處理發送 Email 的 API
app.post('/send-email', (req, res) => {
    const { customerEmail, orderDetails, totalPrice } = req.body;

    const mailOptions = {
        from: 'rachel05140516@gmail.com',
        to: customerEmail,
        subject: '訂單確認 - Mochi Store',
        text: `
            您好，感謝您的訂單！
            訂單詳情：${orderDetails}
            總金額：NT$${totalPrice}
            我們會盡快處理您的訂單。
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Email 發送失敗');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email 發送成功');
        }
    });
});

// 啟動伺服器
app.listen(3000, () => {
    console.log('伺服器已啟動，監聽 3000 port');
});
