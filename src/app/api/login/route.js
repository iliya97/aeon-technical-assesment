import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, encryptedPassword } = body;

    // Simple validation
    if (!username || !encryptedPassword) {
      return NextResponse.json(
        { error: 'Username and encrypted password are required' },
        { status: 400 }
      );
    }

    // Mock API - simply accept any encrypted password and return success
    // In a real application, you would validate credentials here
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        username: username,
        loginTime: new Date().toISOString()
      }
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
