'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ ngoId: '', month: '', peopleHelped: '', eventsConducted: '', fundsUtilized: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message || 'Report submitted!');
    setForm({ ngoId: '', month: '', peopleHelped: '', eventsConducted: '', fundsUtilized: '' });
  };

  return (
    <main className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Submit Monthly Report</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['ngoId', 'month', 'peopleHelped', 'eventsConducted', 'fundsUtilized'].map(field => (
          <input
            key={field}
            type={field === 'month' ? 'month' : 'text'}
            name={field}
            placeholder={field}
            value={form[field as keyof typeof form]}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
      {message && <p className="mt-4">{message}</p>}
      <button
        onClick={() => router.push('/admin')}
        className="bg-gray-600 my-6 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
      >
        Go to Dashboard
      </button>
    </main>
  );
}
