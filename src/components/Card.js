import React from 'react'
function Card({title, value}) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
  <p className="text-neutral-400 text-sm">{title}</p>
  <p className="text-2xl md:text-3xl font-bold mt-2">{value}</p>
</div>

  )
}

export default Card