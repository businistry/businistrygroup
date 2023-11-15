import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getVentures from '@wasp/queries/getVentures';

export function DashboardPage() {
  const { data: ventures, isLoading, error } = useQuery(getVentures);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {ventures.map((venture) => (
        <Link key={venture.id} to={`/venture/${venture.id}`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 block'>
          {venture.name}
        </Link>
      ))}
      <Link to='/new-venture' className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Create New Venture</Link>
    </div>
  );
}