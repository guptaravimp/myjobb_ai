import { NextResponse } from "next/server";
import { DBConnect } from "../../../lib/config/DBConnection";
import { User } from "../../../lib/models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        await DBConnect();
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "Email and password are required" },
                { status: 400 }
            );
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found. Please sign up first." },
                { status: 404 }
            );
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { success: false, message: "Invalid password" },
                { status: 401 }
            );
        }

        // Generate JWT token
        const payload = {
            userId: user._id,
            email: user.email,
            username: user.username,
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET || "your-secret-key",
            { expiresIn: "24h" }
        );

        // Update user's token in database
        user.token = token;
        await user.save();

        // Return success response
        return NextResponse.json(
            {
                success: true,
                message: "Login successful",
                data: {
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                    },
                    token,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { success: false, message: "Login failed. Please try again." },
            { status: 500 }
        );
    }
}
