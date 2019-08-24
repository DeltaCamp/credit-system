import React, { Component } from 'react'
import ReactTimeout from 'react-timeout'
import dynamic from 'next/dynamic'
import { ethers } from 'ethers'

import { LoadingSpinner } from 'lib/components/LoadingSpinner'
import { withTokenQuery } from 'lib/components/hocs/withTokenQuery'
import { withCreditSystemUserQuery } from 'lib/components/hocs/withCreditSystemUserQuery'

export const DaiBalanceChart = withCreditSystemUserQuery(withTokenQuery(ReactTimeout(class _DaiBalanceChart extends Component {
  state = {
    showChart: false,
    options: {
      chart: {
        stacked: true,
        fontFamily: 'Soleil, Helvetica, Arial, sans-serif',
        toolbar: {
          show: false
        }
      },
      colors: ['#FFC73D', '#008FFB'],
      fill: {
        type: 'solid',
        opacity: 1,
        pattern: {
          style: 'sqaures', // string or array of strings
          width: 60,
          height: 60,
          strokeWidth: 4
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          barHeight: '100%',
          colors: {
            backgroundBarOpacity: 1
          },
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      grid: {
        xaxis: {
          showLines: false
        }
      },
      legend: {
        show: true,
        horizontalAlign: 'right', 

      },
      yaxis: {
        tickAmount: 3.5,
        min: -200,
        max: 500,
        title: {
          text: 'Dai',
        },
      },
      tooltip: {
        shared: false,
        x: {
          formatter: function (val) {
            return val
          }
        },
        y: {
          formatter: function (val) {
            return Math.abs(val)
          }
        }
      },
      title: {
        text: 'Dai Balance & Overdraft Stake',
        offsetX: 50,
      },
      xaxis: {
        show: false,
        categories: ['Dai'],
        title: {
          text: ''
        },
        labels: {
          formatter: function (val) {
            return Math.abs(Math.round(val))
          }
        }
      }
    },
    series: [
      {
        name: 'Balance',
        data: [0]
      },
      {
        name: 'Overdraft Stake',
        data: [0]
      }
    ],
  }


  componentDidMount() {
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
    }, 2500)
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
    const Chart = this.state.apex

    const { tokenQuery, creditSystemUserQuery } = this.props
    const { CreditSystem } = creditSystemUserQuery || {}
    const { Token } = tokenQuery || {}

    const balance = {
      name: 'Balance',
      data: [0]
    }

    const overdraft = {
      name: 'Overdraft Stake',
      data: [0]
    }

    let series = [
      balance,
      overdraft
    ]

    if (Token) {
      const { myBalance } = Token

      balance.data = [parseInt(ethers.utils.formatEther(myBalance), 10)]
    }

    if (CreditSystem) {
      const { stake } = CreditSystem

      overdraft.data = [-parseInt(ethers.utils.formatEther(stake), 10)]
    }

    if (!Chart || !this.state.showChart) {
      return <div className='bar-chart'>
        <LoadingSpinner />
      </div>
    }

    return <div id='chart' className={this.props.className || ''}>
      <Chart
        options={this.state.options}
        series={series}
        type='bar'
        height='350'
        width='100%'
      />
    </div>
  }

})))