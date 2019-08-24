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
          <div className='flex flex-col justify-start sm:justify-center main-content--vertical-aligner'>
            <div className='flex justify-center'>
              <div className='main-content--vertical-offset'>
                <div className='spinner-small'>
                  <DynamicApolloWrapper>
                    <ECSCurrent />
                  </DynamicApolloWrapper>
                </div>
              </div>
            </div>
          </div>
        </MainLayout>
      </>
    }
  }
)