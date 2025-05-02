'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [month, setMonth] = useState('');
  const [data, setData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (month) {
      fetch(`/api/dashboard?month=${month}`).then(res => res.json()).then(setData);
    }
  }, [month]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <input type="month" onChange={e => setMonth(e.target.value)} className="border p-2 rounded" />
      {data ? (
        <div className="mt-6 space-y-2">
          <p>Total NGOs Reporting: {data.totalNGOs}</p>
          <p>Total People Helped: {data.peopleHelped}</p>
          <p>Total Events Conducted: {data.eventsConducted}</p>
          <p>Total Funds Utilized: ₹{data.fundsUtilized}</p>
        </div>
      ) : month ? <p>Loading...</p> : null}
      <button
        onClick={() => router.push('/')}
        className="bg-gray-600 mx-5 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
      >
        Home
      </button>
    </div>
  );
}
