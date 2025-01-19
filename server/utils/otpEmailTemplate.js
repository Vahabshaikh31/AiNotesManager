// utils/otpEmailTemplate.js

export const generateOtpEmailMessage = (otp) => {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
          }
          .content {
            font-size: 16px;
            line-height: 1.6;
            color: #555;
          }
          .otp {
            font-size: 24px;
            font-weight: bold;
            color: #2c3e50;
            background-color: #ecf0f1;
            padding: 10px;
            border-radius: 4px;
            display: inline-block;
            margin: 20px 0;
          }
          .footer {
            font-size: 14px;
            color: #999;
            text-align: center;
            margin-top: 30px;
          }
          .footer a {
            color: #3498db;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>OTP Verification</h1>
          </div>
          <div class="content">
            <p>Dear User,</p>
            <p>We have received a request to verify your account. Please use the following One-Time Password (OTP) to complete the verification process:</p>
            <div class="otp">${otp}</div>
            <p>This OTP is valid for the next 10 minutes.</p>
            <p>If you did not request this, please ignore this email.</p>
            <p>Best regards,</p>
            <p><strong>Your Company Name</strong></p>
          </div>
          <div class="footer">
            <p>If you have any questions, feel free to <a href="mailto:support@yourcompany.com">contact us</a>.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
