import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username } = body;

    // Simple validation
    if (!username || username.trim().length === 0) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    // Return static secure word for any username (as per requirements)
    return NextResponse.json({
      success: true,
      secureWord: 'secure123',
      message: 'Secure word retrieved successfully'
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
