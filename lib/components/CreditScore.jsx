import React, { Component } from 'react'
import ReactTimeout from 'react-timeout'
import dynamic from 'next/dynamic'
import { ethers } from 'ethers'

import { LoadingSpinner } from 'lib/components/LoadingSpinner'
import { withCreditSystemUserQuery } from 'lib/components/hocs/withCreditSystemUserQuery'

const debug = require('debug')('pt:components:CreditScore')

export const CreditScore = withCreditSystemUserQuery(ReactTimeout(class _CreditScore extends Component {
  state = {
    showChart: false,

    options: {
      chart: {
        fontFamily: 'Soleil, Helvetica, Arial, sans-serif'
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          hollow: {
            margin: 0,
            size: '75%',
            background: '#fff',
            position: 'front'
          },
          track: {
            background: '#fff',
            strokeWidth: '10%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -1,
              left: 0,
              blur: 4,
              opacity: 0.85
            }
          },

          dataLabels: {
            name: {
              offsetY: -10,
              show: true,
              color: '#737373',
              fontSize: '17px'
            },
            value: {
              formatter: function (val) {
                return parseInt(val * 10);
              },
              color: '#111',
              fontSize: '36px',
              show: true,
            },
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#64F488'], // ending color, adjust this!
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: [this.props.label],
      colors: ['#34EFA8'], // starting color, adjust this!
    },
    series: [0],
  }

  componentDidMount () {
    this.setState({
      apex: dynamic(import('react-apexcharts'), {
        ssr: false,
        loading: () => 0
      })
    })

    this.props.setTimeout(() => {
      this.setState({
        showChart: true
      })
    }, 1500)
  }

  updateChart() {
    this.setState({
      options: {
        ...this.state.options,
        xaxis: {
          ...this.state.options.xaxis,
          categories: ['X1', 'X2', 'X3'] // see docs on how to update properly
        }
      }
    })
  }

  render() {
    const { creditSystemUserQuery } = this.props
    const { CreditSystem } = creditSystemUserQuery || {}

    let series = [0]

    if (CreditSystem) {
      const { creditScore } = CreditSystem
      series = [parseInt(ethers.utils.formatEther(creditScore), 10) * 0.1]
    }

    const Chart = this.state.apex

    if (!Chart || !this.state.showChart) {
      return <div className='mixed-chart'>
        <LoadingSpinner />
      </div>
    }

    return <div className='mixed-chart'>
      <Chart
        options={this.state.options}
        series={series}
        type='radialBar'
        width='100%'
        height='260'
      />
    </div>
  }
}))