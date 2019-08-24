import React from 'react'
import { Slide, ToastContainer } from 'react-toastify'

import { Meta } from './Meta'
import { Nav } from './Nav'

import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'

import 'odometer/themes/odometer-theme-minimal.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-hint/css/index.css'

import 'assets/styles/normalize-opentype.css'
import 'assets/styles/index.css'
import 'assets/styles/utils.css'
import 'assets/styles/animations.css'
import 'assets/styles/loader.css'
import 'assets/styles/transitions.css'

require('lib/ethers-extension')

export const MainLayout = ({ title, children }) => (
  <>
    <ToastContainer
      className='ecs-toast'
      position='top-center'
      autoClose={6000}
      transition={Slide}
    />
    
    <div className='main-grid'>
      <Meta
        title={title}
      />

      <div className='main-content'>
        {children}
      </div>

      <div className='main-nav spinner-hidden'>
        <DynamicApolloWrapper>
          <Nav />
        </DynamicApolloWrapper>
      </div>
    </div>
  </>
)