import React, { Component } from 'react'
// import Chart from 'react-apexcharts'
import dynamic from 'next/dynamic'

const debug = require('debug')('pt:components:CreditScore')

export const CreditScore = class _CreditScore extends Component {
  state = {
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
          gradientToColors: ['#1FAA42'],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: [this.props.label],
    },
    
    series: [this.props.score * 0.1],
  }

  componentDidMount () {
    this.setState({
      apex: dynamic(import('react-apexcharts'), {
        ssr: false,
        loading: () => 0
      })
    })
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

    if (!Chart) { return null }

    return <div className='mixed-chart'>
      <Chart
        options={this.state.options}
        series={this.state.series}
        type='radialBar'
        width='100%'
        height='300'
      />
    </div>
  }
}