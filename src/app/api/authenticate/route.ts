import bcrypt from "bcryptjs";
import * as cookie from "cookie";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const { password } = body;
	const correctPasswordHash = process.env.PAGE_ACCESS_PASSWORD_HASH;

	if (!correctPasswordHash) {
		console.error("PAGE_ACCESS_PASSWORD_HASH environment variable is not set");
		return NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}

	try {
		// Compare provided password with hashed password
		const isValid = await bcrypt.compare(password, correctPasswordHash);

		if (isValid) {
			const response = NextResponse.json({ success: true }, { status: 200 });

			response.headers.set(
				"Set-Cookie",
				cookie.serialize("authToken", "authenticated", {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
					maxAge: 60 * 60, // 1 hour
					sameSite: "strict",
					path: "/",
				}),
			);

			return response;
		}
		return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
	} catch (error) {
		console.error("Authentication error:", error);
		return NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}
}
