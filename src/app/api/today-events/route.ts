import { NextResponse } from 'next/server';
import { generateMockEvents } from '../utils';

// Handler for GET
export async function GET() {
  try {
    const events = generateMockEvents(3);
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to get today events' },
      { status: 400 }
    );
  }
}
