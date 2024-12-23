import React from 'react';

export default function MainPage({ data = 'Default Data' }) {
    return (
        <div className='min-h-screen'>
            <h1 className='text-4xl'>{data}</h1>
        </div>
    );
}
