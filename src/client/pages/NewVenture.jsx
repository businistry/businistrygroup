import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAction } from '@wasp/actions';
import { useQuery } from '@wasp/queries';
import createVenture from '@wasp/actions/createVenture';
import getVentures from '@wasp/queries/getVentures';

export function NewVenturePage() {
  const createVentureFn = useAction(createVenture);
  const history = useHistory();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const venture = await createVentureFn({ name, location });
    history.push(`/venture/${venture.id}`);
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold'>Create New Venture</h1>

      <form className='mt-4' onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>Name:</label>
          <input className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='name' name='name' type='text' placeholder='Enter name' required value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='location'>Location:</label>
          <input className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='location' name='location' type='text' placeholder='Enter location' required value={location} onChange={e => setLocation(e.target.value)} />
        </div>

        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='submit'>Create</button>
      </form>
    </div>
  );
}