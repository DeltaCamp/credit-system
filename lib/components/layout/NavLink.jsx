import React from 'react'

export function NavLink({href, children}) {
  return (
    <a href={href} className='inline-block font-sans-regular text-bold text-sm leading-none border rounded text-black border-white hover:text-indigo-500 pr-6 lg:pr-0 lg:pl-8 py-2'>
      {children}
    </a>
  )
}