import { NextResponse } from "next/server";
import { DBConnect } from "../../../lib/config/DBConnection";
import { OTP, User } from "../../../lib/models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mailSender from "../../../lib/mailSender";
import { WelcomeEmail } from "../../../lib/emailVerificationTemplate";

export async function POST(request) {
    try {
        await DBConnect();
        const { email, otp, username, password } = await request.json();

        if (!email || !otp  || !password) {
            return NextResponse.json(
                { success: false, message: "All fields are required" },
                { status: 400 }
            );
        }

        const otpVerification = await OTP.findOne({ email });
        if (!otpVerification) {
            return NextResponse.json(
                { success: false, message: "OTP not found or expired" },
                { status: 400 }
            );
        }

        if (otpVerification.otp !== otp) {
            return NextResponse.json(
                { success: false, message: "Invalid OTP" },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { success: false, message: "User already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const token = jwt.sign(
            { email: email },
            process.env.JWT_SECRET || "your-secret-key",
            { expiresIn: "24h" }
        );

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            token,
        });

        await OTP.deleteOne({ email });

        // Send welcome email
        try {
            await mailSender(email, "Welcome to MyJobb AI!", WelcomeEmail(username, email));
            console.log("Welcome email sent successfully");
        } catch (emailError) {
            console.error("Welcome email sending failed:", emailError);
            // Continue with the response even if email fails
        }

        return NextResponse.json(
            {
                success: true,
                message: "User registered successfully",
                data: {
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                    },
                    token,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return NextResponse.json(
            { success: false, message: "Failed to verify OTP" },
            { status: 500 }
        );
    }
}

 