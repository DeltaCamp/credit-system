import React, { Component } from 'react'
import { withRouter } from 'next/router'

import { ECSCurrent } from 'lib/components/ECSCurrent'
import { MainLayout } from 'lib/components/layout/MainLayout'
import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'

export const ECSLayout = withRouter(
  class _ECSLayout extends Component {

    render() {
      return <>
        <MainLayout>
          <div className='flex flex-col justify-start p-8'>
            <DynamicApolloWrapper>
              <ECSCurrent />
            </DynamicApolloWrapper>
          </div>
        </MainLayout>
      </>
    }
  }
)