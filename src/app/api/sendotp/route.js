import { NextResponse } from "next/server";
import { DBConnect } from "../../../lib/config/DBConnection";
import { OTP, User } from "../../../lib/models";
import mailSender from "../../../lib/mailSender";
import { otpTemplate } from "../../../lib/emailVerificationTemplate";

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request) {
    try {
        console.log("Starting OTP creation process...");
        await DBConnect();
        console.log("Database connected, processing request...");
        const { email,username,password } = await request.json();

        if (!email) {
            return NextResponse.json(
                { success: false, message: "Email is required" },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { success: false, message: "User already exists with this email" },
                { status: 400 }
            );
        }

        console.log("Checking for existing OTP...");
        const existingOTP = await OTP.findOne({ email });
        console.log("Existing OTP found:", existingOTP ? "Yes" : "No");
        if (existingOTP) {
            console.log("Deleting existing OTP...");
            await OTP.deleteOne({ email });
            console.log("Existing OTP deleted");
        }

        const otp = generateOTP();
        const otpBody = {
            email,
            otp,
        };

        console.log("Creating OTP with body:", otpBody);
        const otpVerification = await OTP.create(otpBody);
        console.log("OTP created successfully:", otpVerification);

        // Send email manually
        try {
            await mailSender(email, "Verification Email From devcode", otpTemplate(otp));
            console.log("Email sent successfully");
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
            // Continue with the response even if email fails
        }

        return NextResponse.json(
            {
                success: true,
                message: "OTP sent successfully",
                data: {
                    username,
                    password,
                    email: otpVerification.email,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending OTP:", error);
        return NextResponse.json(
            { success: false, message: "Failed to send OTP" },
            { status: 500 }
        );
    }
}

 