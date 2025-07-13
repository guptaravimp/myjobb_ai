exports.otpTemplate = (otp) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>MyJobb AI - OTP Verification</title>
		<style>
			* {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
			}
			
			body {
				background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
				font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
				font-size: 16px;
				line-height: 1.6;
				color: #333333;
				padding: 20px 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				background: #ffffff;
				border-radius: 16px;
				box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
				overflow: hidden;
			}
			
			.header {
				background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
				padding: 40px 30px;
				text-align: center;
				color: white;
			}
			
			.logo {
				font-size: 32px;
				font-weight: bold;
				margin-bottom: 10px;
				text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
			}
			
			.subtitle {
				font-size: 18px;
				opacity: 0.9;
				font-weight: 300;
			}
			
			.content {
				padding: 40px 30px;
				text-align: center;
			}
			
			.title {
				font-size: 24px;
				font-weight: bold;
				color: #1f2937;
				margin-bottom: 20px;
			}
			
			.description {
				font-size: 16px;
				color: #6b7280;
				margin-bottom: 30px;
				line-height: 1.6;
			}
			
			.otp-container {
				background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
				border: 2px solid #e5e7eb;
				border-radius: 12px;
				padding: 30px;
				margin: 30px 0;
				position: relative;
			}
			
			.otp-label {
				font-size: 14px;
				color: #6b7280;
				margin-bottom: 15px;
				text-transform: uppercase;
				letter-spacing: 1px;
				font-weight: 600;
			}
			
			.otp-code {
				font-size: 48px;
				font-weight: bold;
				color: #2563eb;
				letter-spacing: 8px;
				font-family: 'Courier New', monospace;
				text-shadow: 0 2px 4px rgba(37, 99, 235, 0.1);
			}
			
			.timer {
				background: #fef3c7;
				border: 1px solid #f59e0b;
				border-radius: 8px;
				padding: 15px;
				margin: 20px 0;
				text-align: center;
			}
			
			.timer-text {
				font-size: 14px;
				color: #92400e;
				font-weight: 500;
			}
			
			.security-note {
				background: #f0f9ff;
				border: 1px solid #0ea5e9;
				border-radius: 8px;
				padding: 15px;
				margin: 20px 0;
				text-align: left;
			}
			
			.security-title {
				font-size: 14px;
				font-weight: bold;
				color: #0c4a6e;
				margin-bottom: 8px;
			}
			
			.security-text {
				font-size: 14px;
				color: #0369a1;
				line-height: 1.5;
			}
			
			.footer {
				background: #f8fafc;
				padding: 30px;
				text-align: center;
				border-top: 1px solid #e5e7eb;
			}
			
			.support {
				font-size: 14px;
				color: #6b7280;
				margin-bottom: 15px;
			}
			
			.support a {
				color: #2563eb;
				text-decoration: none;
				font-weight: 500;
			}
			
			.support a:hover {
				text-decoration: underline;
			}
			
			.disclaimer {
				font-size: 12px;
				color: #9ca3af;
				line-height: 1.4;
			}
			
			@media (max-width: 600px) {
				.container {
					margin: 10px;
					border-radius: 12px;
				}
				
				.header, .content, .footer {
					padding: 20px;
				}
				
				.otp-code {
					font-size: 36px;
					letter-spacing: 6px;
				}
				
				.title {
					font-size: 20px;
				}
			}
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<div class="header">
				<div class="logo">MyJobb AI</div>
				<div class="subtitle">Your AI-Powered Job Search Partner</div>
			</div>
			
			<div class="content">
				<div class="title">🔐 Verify Your Email Address</div>
				<div class="description">
					Thank you for joining MyJobb AI! To complete your registration and start your journey, 
					please use the verification code below.
				</div>
				
				<div class="otp-container">
					<div class="otp-label">Your Verification Code</div>
					<div class="otp-code">${otp}</div>
				</div>
				
				<div class="timer">
					<div class="timer-text">⏰ This code expires in 5 minutes</div>
				</div>
				
				<div class="security-note">
					<div class="security-title">🔒 Security Notice</div>
					<div class="security-text">
						• Never share this code with anyone<br>
						• MyJobb AI will never ask for your password via email<br>
						• If you didn't request this code, please ignore this email
					</div>
				</div>
			</div>
			
			<div class="footer">
				<div class="support">
					Need help? Contact us at <a href="mailto:support@myjobbai.com">support@myjobbai.com</a>
				</div>
				<div class="disclaimer">
					This email was sent to verify your account. If you didn't create an account with MyJobb AI, 
					please disregard this email. For security reasons, this verification code will expire in 5 minutes.
				</div>
			</div>
		</div>
	</body>
	
	</html>`;
};


exports.ConfirmationEmail = (courseName, name) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Course Registration Confirmation</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .cta {
                display: inline-block;
                padding: 10px 20px;
                background-color: #FFD60A;
                color: #000000;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href="https://studynotion-edtech-project.vercel.app"><img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png"
                    alt="StudyNotion Logo"></a>
            <div class="message">Course Registration Confirmation</div>
            <div class="body">
                <p>Dear ${name},</p>
                <p>You have successfully registered for the course <span class="highlight">"${courseName}"</span>. We
                    are excited to have you as a participant!</p>
                <p>Please log in to your learning dashboard to access the course materials and start your learning journey.
                </p>
                <a class="cta" href="https://studynotion-edtech-project.vercel.app/dashboard">Go to Dashboard</a>
            </div>
            <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
                    href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!</div>
        </div>
    </body>
    
    </html>`;
  };

exports.WelcomeEmail = (username, email) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to MyJobb AI</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-size: 16px;
                line-height: 1.6;
                color: #333333;
                padding: 20px 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 16px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            
            .header {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                padding: 40px 30px;
                text-align: center;
                color: white;
            }
            
            .logo {
                font-size: 32px;
                font-weight: bold;
                margin-bottom: 10px;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .subtitle {
                font-size: 18px;
                opacity: 0.9;
                font-weight: 300;
            }
            
            .content {
                padding: 40px 30px;
                text-align: center;
            }
            
            .title {
                font-size: 28px;
                font-weight: bold;
                color: #1f2937;
                margin-bottom: 20px;
            }
            
            .welcome-message {
                font-size: 18px;
                color: #6b7280;
                margin-bottom: 30px;
                line-height: 1.6;
            }
            
            .account-info {
                background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
                border: 2px solid #0ea5e9;
                border-radius: 12px;
                padding: 25px;
                margin: 30px 0;
                text-align: left;
            }
            
            .info-title {
                font-size: 16px;
                font-weight: bold;
                color: #0c4a6e;
                margin-bottom: 15px;
            }
            
            .info-item {
                margin: 10px 0;
                font-size: 14px;
                color: #0369a1;
            }
            
            .features {
                background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                border: 2px solid #e5e7eb;
                border-radius: 12px;
                padding: 25px;
                margin: 30px 0;
                text-align: left;
            }
            
            .features-title {
                font-size: 18px;
                font-weight: bold;
                color: #1f2937;
                margin-bottom: 20px;
                text-align: center;
            }
            
            .feature-item {
                margin: 12px 0;
                padding-left: 25px;
                position: relative;
                font-size: 14px;
                color: #374151;
            }
            
            .feature-item:before {
                content: "✓";
                color: #10b981;
                font-weight: bold;
                position: absolute;
                left: 0;
                font-size: 16px;
            }
            
            .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
                color: white;
                text-decoration: none;
                padding: 15px 30px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: bold;
                margin: 20px 0;
                transition: all 0.3s ease;
                box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
            }
            
            .cta-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3);
            }
            
            .footer {
                background: #f8fafc;
                padding: 30px;
                text-align: center;
                border-top: 1px solid #e5e7eb;
            }
            
            .support {
                font-size: 14px;
                color: #6b7280;
                margin-bottom: 15px;
            }
            
            .support a {
                color: #2563eb;
                text-decoration: none;
                font-weight: 500;
            }
            
            .support a:hover {
                text-decoration: underline;
            }
            
            .disclaimer {
                font-size: 12px;
                color: #9ca3af;
                line-height: 1.4;
            }
            
            @media (max-width: 600px) {
                .container {
                    margin: 10px;
                    border-radius: 12px;
                }
                
                .header, .content, .footer {
                    padding: 20px;
                }
                
                .title {
                    font-size: 24px;
                }
                
                .welcome-message {
                    font-size: 16px;
                }
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🎉 Welcome to MyJobb AI!</div>
                <div class="subtitle">Your AI-Powered Job Search Partner</div>
            </div>
            
            <div class="content">
                <div class="title">Hello, ${username}! 👋</div>
                <div class="welcome-message">
                    Welcome to MyJobb AI! We're thrilled to have you as part of our community. 
                    Your account has been successfully created and verified. You're now ready to 
                    start your journey with AI-powered job matching!
                </div>
                
                <div class="account-info">
                    <div class="info-title">📋 Your Account Details</div>
                    <div class="info-item"><strong>Username:</strong> ${username}</div>
                    <div class="info-item"><strong>Email:</strong> ${email}</div>
                    <div class="info-item"><strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">✅ Active</span></div>
                </div>
                
                <div class="features">
                    <div class="features-title">🚀 What You Can Do Now</div>
                    <div class="feature-item">Access your personalized dashboard</div>
                    <div class="feature-item">Explore AI-powered job matching</div>
                    <div class="feature-item">Track your application progress</div>
                    <div class="feature-item">Connect with potential employers</div>
                    <div class="feature-item">Get personalized career insights</div>
                    <div class="feature-item">Receive job recommendations</div>
                </div>
                
                <a href="http://localhost:3000" class="cta-button">
                    🚀 Access Your Dashboard
                </a>
            </div>
            
            <div class="footer">
                <div class="support">
                    Need help? Contact us at <a href="mailto:support@myjobbai.com">support@myjobbai.com</a>
                </div>
                <div class="disclaimer">
                    This email was sent to ${email}. If you didn't create an account with MyJobb AI, 
                    please disregard this email. Thank you for choosing MyJobb AI!
                </div>
            </div>
        </div>
    </body>
    
    </html>`;
};