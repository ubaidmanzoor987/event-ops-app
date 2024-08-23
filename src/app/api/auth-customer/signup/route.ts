import { LOGIN_ENDPOINT } from '@/store/features/api/endpoints';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const cookiesStore = cookies();
  try {
    const body = await request.json();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://35.173.251.167/dev'}/api${LOGIN_ENDPOINT}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    if (response.ok) {
      const data = await response.json();
      cookiesStore.set('access_token', data.accessToken);
      cookiesStore.set('refresh_token', data.refreshToken);
      cookiesStore.set('user', JSON.stringify(data.user));
      return NextResponse.json({ success: true, ...data });
    }
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      success: false,
      message: 'Failed to get users',
    });
  }
}
