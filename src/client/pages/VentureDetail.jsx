import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getVenture from '@wasp/queries/getVenture';
import updateVenture from '@wasp/actions/updateVenture';

export function VentureDetail() {
  const { ventureId } = useParams();
  const { data: venture, isLoading, error } = useQuery(getVenture, { ventureId });
  const updateVentureFn = useAction(updateVenture);
  const [name, setName] = useState(venture?.name || '');
  const [location, setLocation] = useState(venture?.location || '');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdateVenture = () => {
    if (!name || !location) return;
    updateVentureFn({ id: venture.id, input: { name, location } });
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>{venture.name}</h1>
      <div className='mb-4'>
        <span className='font-bold'>Location:</span> {venture.location}
      </div>
      <div className='mb-4'>
        <span className='font-bold'>Viability Score:</span> {venture.viabilityScore}
      </div>
      <div className='mb-4'>
        <input
          type='text'
          className='px-1 py-2 border rounded'
          placeholder='New name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <input
          type='text'
          className='px-1 py-2 border rounded'
          placeholder='New location'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <button
        onClick={handleUpdateVenture}
        className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
      >
        Update Venture
      </button>
      <Link to='/' className='bg-red-500 hover:bg-red-700 px-2 py-2 text-white font-bold rounded ml-4'>Cancel</Link>
    </div>
  );
}