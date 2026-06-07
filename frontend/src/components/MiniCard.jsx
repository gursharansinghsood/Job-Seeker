import React from 'react'

export const MiniCard = ({ item }) => {
  return (
    <div className='bg-background text-text-primary flex flex-col p-5 gap-2 rounded-2xl border border-border items-center justify-center hover:border-primary transition-all duration-300 ease-in-out'>
      <p className={`text-3xl font-bold ${item.color}`}>
        {item.number ?? '—'}
      </p>
      <p className='text-sm font-medium text-text-secondary text-center'>
        {item.text}
      </p>
    </div>
  )
}