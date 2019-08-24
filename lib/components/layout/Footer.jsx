import React from 'react'
import Link from 'next/link'

// import DeltaCampWhiteLogo from 'assets/images/delta-camp-white-logo3.svg'

export const Footer = () => (
  <footer className='bg-purple-1100 text-white'>
    <div className='container md:flex pt-6 pb-6 lg:p-12'>

      <div className='lg:w-1/2 items-center justify-between py-4'>
        &copy; {new Date().getFullYear()} PoolTogether - <Link href='/privacy'>
          <a href='/privacy'>
            Privacy
          </a>
        </Link> - <Link href='/terms'>
          <a href='/terms'>
            Terms
          </a>
        </Link>
      </div>

      <nav className='lg:w-1/2 items-center justify-between flex-wrap py-4'>
        <div
          className='w-full sm:flex flex-grow lg:items-center lg:w-auto'
        >
          <div className='text-sm lg:flex-grow'></div>

          <Link href='/audits'>
            <a href='#' className='block md:inline-block font-sans-regular text-bold text-sm text-white pr-6 lg:pr-0 lg:pl-16 pt-1 leading-none mt-4 lg:mt-0'>
              Audits
            </a>
          </Link>

          <a
            href='https://github.com/pooltogether'
            className='block md:inline-block font-sans-regular text-bold text-sm text-white pr-6 lg:pr-0 lg:pl-16 pt-1 leading-none mt-4 lg:mt-0'
          >
            GitHub
          </a>
        </div>
      </nav>

      
    </div>
  </footer>
)