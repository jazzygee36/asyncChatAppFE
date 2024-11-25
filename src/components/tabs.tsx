'use client';
import { useState } from 'react';
import Login from './login';
import Register from './register';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div className='w-full max-w-md mx-auto'>
      {/* Tab Navigation */}
      <div className='flex border-b border-gray-300'>
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === 'tab1'
              ? 'border-b-2 border-blue-500 text-blue-500 font-semibold'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('tab1')}
        >
          Login
        </button>
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === 'tab2'
              ? 'border-b-2 border-blue-500 text-blue-500 font-semibold'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('tab2')}
        >
          Sign up
        </button>
      </div>

      {/* Tab Content */}
      <div className='p-7'>
        {activeTab === 'tab1' && (
          <div>
            <Login />
          </div>
        )}
        {activeTab === 'tab2' && (
          <div>
            <Register />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
