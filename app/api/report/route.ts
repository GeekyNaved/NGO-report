// app/api/report/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function POST(request: Request) {
  try {
    const { ngoId, month, peopleHelped, eventsConducted, fundsUtilized } = await request.json();

    if (!ngoId || !month) {
      return NextResponse.json(
        { message: 'Missing fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('ngo');

    await db.collection('reports').insertOne({
      ngoId,
      month,
      peopleHelped: parseInt(peopleHelped),
      eventsConducted: parseInt(eventsConducted),
      fundsUtilized: parseFloat(fundsUtilized),
    });

    return NextResponse.json(
      { message: 'Report submitted successfully' },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Explicitly declare other unsupported methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}