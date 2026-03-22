import React, { useState } from 'react';
import { CreateTrainForm } from './forms/CreateTrainForm';
import { CreateTrainSeatClassForm } from './forms/CreateTrainSeatClassForm';
import { CreateTrainTimeForm } from './forms/CreateTrainTimeForm';
import { CreateRouteForm } from './forms/CreateRouteForm';
import { CreateStationForm } from './forms/CreateStationForm';
import { AddTrainInfoForm } from './forms/AddTrainInfoForm';
import { CreatePlatformForm } from './forms/CreatePlatformForm';

export function DataManagement() {
  const [activeForm, setActiveForm] = useState('train');

  const tabs = [
    { id: 'train', label: 'Train' },
    { id: 'trainInfo', label: 'Train Info' },
    { id: 'trainTime', label: 'Train Time' },
    { id: 'seatClass', label: 'Seat Class' },
    { id: 'route', label: 'Route' },
    { id: 'station', label: 'Station' },
    { id: 'platform', label: 'Platform' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex overflow-x-auto border-b border-slate-200 pb-px">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveForm(tab.id)}
            className={`whitespace-nowrap px-4 py-2 border-b-2 font-medium text-sm transition-colors ${
              activeForm === tab.id
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="pt-4">
        {activeForm === 'train' && <CreateTrainForm />}
        {activeForm === 'trainInfo' && <AddTrainInfoForm />}
        {activeForm === 'trainTime' && <CreateTrainTimeForm />}
        {activeForm === 'seatClass' && <CreateTrainSeatClassForm />}
        {activeForm === 'route' && <CreateRouteForm />}
        {activeForm === 'station' && <CreateStationForm />}
        {activeForm === 'platform' && <CreatePlatformForm />}
      </div>
    </div>
  );
}
