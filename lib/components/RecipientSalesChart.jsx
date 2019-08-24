import React, { Component } from 'react'
import ReactTimeout from 'react-timeout'
import dynamic from 'next/dynamic'

import { LoadingSpinner } from 'lib/components/LoadingSpinner'

export const RecipientSalesChart = ReactTimeout(class _RecipientSalesChart extends Component {
  state = {
    showChart: false,
    options: {
      chart: {
        zoom: {
          enabled: false
        },
        fontFamily: 'Soleil, Helvetica, Arial, sans-serif',
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [3],
        curve: 'straight',
        dashArray: [0, 8, 5]
      },
      title: {
        text: this.props.label,
        align: 'center'
      },
      markers: {
        size: 0,

        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        categories: ['Aug 19', 'Aug 20', 'Aug 21', 'Aug 22', 'Aug 23', 'Today'],
      },
      tooltip: {
        y: [{
          title: {
            formatter: function (val) {
              return val + " Dai"
            }
          }
        }]
      },
      grid: {
        borderColor: '#f1f1f1',
      }
    },
    fill: {
      colors: ['#2E932A'],
    },
    series: [
      {
        name: 'Daily Sales',
        data: [987, 690, 720, 1174, 1357, 1102]
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

    if (!Chart || !this.state.showChart) {
      return <div className='bar-chart'>
        <LoadingSpinner />
      </div>
    }

    return <div id='chart' className={this.props.className || ''}>
      <Chart
        options={this.state.options}
        series={this.state.series}
        type='line'
        height='350'
        width='100%'
      />
    </div>
  }

})