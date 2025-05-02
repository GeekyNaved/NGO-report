// app/api/reports/stats/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month');

    if (!month) {
      return NextResponse.json(
        { message: 'Month is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('ngo');
    const reports = await db.collection('reports').find({ month }).toArray();

    const totalNGOs = new Set(reports.map(r => r.ngoId)).size;
    const peopleHelped = reports.reduce((sum, r) => sum + r.peopleHelped, 0);
    const eventsConducted = reports.reduce((sum, r) => sum + r.eventsConducted, 0);
    const fundsUtilized = reports.reduce((sum, r) => sum + r.fundsUtilized, 0);

    return NextResponse.json({
      totalNGOs,
      peopleHelped,
      eventsConducted,
      fundsUtilized
    });

  } catch (error) {
    console.error('Error fetching report stats:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Explicitly declare other unsupported methods
export async function POST() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}

