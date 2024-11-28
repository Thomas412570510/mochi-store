const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// 中間件解析 JSON 和 URL-encoded 請求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 訂單寄送路由
app.post('/checkout', async (req, res) => {
    const { email, orderDetails } = req.body;

    // 設置 Nodemailer 傳輸器
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // 或其他 SMTP 服務，如 Outlook、Yahoo
        auth: {
            user: 'your-email@gmail.com', // 替換為你的郵件
            pass: 'your-email-password', // 替換為你的郵件密碼或應用專用密碼
        },
    });

    // 構建郵件內容
    const mailOptions = {
        from: 'your-email@gmail.com', // 寄件者
        to: email, // 收件者
        subject: '您的訂單資訊',
        html: `
            <h2>感謝您的訂購！</h2>
            <p>以下是您的訂單細節：</p>
            <pre>${orderDetails}</pre>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: '訂單已寄出！' });
    } catch (error) {
        console.error('郵件發送失敗：', error);
        res.status(500).json({ message: '郵件發送失敗！', error });
    }
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`伺服器運行於 http://localhost:${PORT}`);
});
