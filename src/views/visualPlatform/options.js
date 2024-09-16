export const options3 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#4080FF', // 设置指示线的颜色
          width: 2, // 设置指示线的宽度
          type: 'dashed',
          shadowColor: '#482ff7'
        }
      },
      backgroundColor: '#FFFFFF'
      // formatter: function (params) {
      //   return `<div class="tooltip_box">
      //         <p class="title">${params[0].name}</p>
      //         <p class="bottom_value"> <span>Number of cases</span>${params[0].value}</p>
      //       </div>`
      // }
    },
    legend: {
      show: true,
      textStyle: {
        color: 'white',
      }
    },
    xAxis: {
      type: 'category',
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#86909C'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#E5E8EF'
        }
      },
      axisLabel: {
        formatter: function (params) {
          if (params.length > 10) {
            return params.slice(0, 10) + "\n" + params.slice(-8)
          } else {
            return params
          }
        }
        // interval: 0
        // rotate:15,//倾斜度 -90 至 90 默认为0
        // margin:8,
        // textStyle:{
        //   color:"#000000"
        // }
      },
      // data: rows.map(v => v.updateTime)
    },
    yAxis: [
      {
        type: 'value',
        name: '空气温度',
        position: 'left',
        nameTextStyle: {
          color: 'white',
          fontSize: 12,
          lineHeight: 40
        },
        axisTick: {
          //去除刻度线
          show: false
        },
        axisLine: {
          show: false,
          //轴线样式
          lineStyle: {
            color: '#86909C'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        },
        axisLabel: {
          formatter: '{value}℃'
        }
      },
      {
        type: 'value',
        name: '空气湿度',
        position: 'right',
        nameTextStyle: {
          color: 'white',
          fontSize: 12,
          lineHeight: 40
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#86909C'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        },
        axisLabel: {
          formatter: '{value}% rh'
        }
      },
    ],
    grid: {
      left: '3%',
      right: '3%',
      bottom: '2%',
      top: '18%',
      containLabel: true
    },
    series: [
      {
        name: '空气温度',
        // data: rows.map(v => v.temperature),
        type: 'line',
        yAxisIndex: 0,
        showSymbol: false, // 初始化不显示标记
        symbolSize: 8,
        lineStyle: {
          width: 2,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#cc83ff' },
              { offset: 1, color: '#cc83ff' }
            ],
            global: false // 缺省为 false
          }
        },
      },
      {
        name: '空气湿度',
        // data: rows.map(v => v.humidity),
        type: 'line',
        yAxisIndex: 1,
        showSymbol: false, // 初始化不显示标记
        symbolSize: 8,
        lineStyle: {
          width: 2,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#f6bd42' },
              { offset: 1, color: '#f6bd42' }
            ],
            global: false // 缺省为 false
          }
        }
      },
    ]
}
export const options2 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#4080FF', // 设置指示线的颜色
        width: 2, // 设置指示线的宽度
        type: 'dashed',
        shadowColor: '#482ff7'
      }
    },
    backgroundColor: '#FFFFFF'
    // formatter: function (params) {
    //   return `<div class="tooltip_box">
    //         <p class="title">${params[0].name}</p>
    //         <p class="bottom_value"> <span>Number of cases</span>${params[0].value}</p>
    //       </div>`
    // }
  },
  legend: {
    show: true,
    textStyle: {
      color: 'white',
    }
  },
  xAxis: {
    type: 'category',
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#86909C'
      }
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: '#E5E8EF'
      }
    },
    axisLabel: {
      formatter: function (params) {
        if (params.length > 10) {
          return params.slice(0, 10) + "\n" + params.slice(-8)
        } else {
          return params
        }
      }
      // interval: 0
      // rotate:15,//倾斜度 -90 至 90 默认为0
      // margin:8,
      // textStyle:{
      //   color:"#000000"
      // }
    },
    // data: rows.map(v => v.updateTime)
  },
  yAxis: [
    {
      type: 'value',
      name: 'xxx',
      position: 'left',
      nameTextStyle: {
        color: 'white',
        fontSize: 12,
        lineHeight: 40
      },
      axisTick: {
        //去除刻度线
        show: false
      },
      axisLine: {
        show: false,
        //轴线样式
        lineStyle: {
          color: '#86909C'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      },
      axisLabel: {
        formatter: '{value}'
      }
    },
  ],
  grid: {
    left: '3%',
    right: '3%',
    bottom: '2%',
    top: '18%',
    containLabel: true
  },
  series: [
    {
      name: '趋势',
      // data: rows.map(v => v.temperature),
      type: 'line',
      yAxisIndex: 0,
      showSymbol: false, // 初始化不显示标记
      symbolSize: 8,
      lineStyle: {
        width: 2,
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#cc83ff' },
            { offset: 1, color: '#cc83ff' }
          ],
          global: false // 缺省为 false
        }
      },
    },
  ]
}
const downColor  = 'red';
const upColor = 'green';
export const options1 = {
  animation: false,
  legend: {
      bottom: 10,
      left: 'center',
      data: ['Dow-Jones index']
  },
  tooltip: {
      trigger: 'axis',
      axisPointer: {
          type: 'cross'
      },
      // backgroundColor: 'rgba(245, 245, 245, 0.8)',
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      textStyle: {
          color: '#000'
      },
      position: function (pos, params, el, elRect, size) {
          var obj = {top: 10};
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
          return obj;
      }
      // extraCssText: 'width: 170px'
  },
  axisPointer: {
      link: {xAxisIndex: 'all'},
      label: {
          backgroundColor: '#777'
      }
  },
  // brush: {
  //     xAxisIndex: 'all',
  //     brushLink: 'all',
  //     outOfBrush: {
  //         colorAlpha: 0.1
  //     }
  // },
  visualMap: {
      show: false,
      seriesIndex: 5,
      dimension: 2,
      pieces: [{
          value: 1,
          color: downColor
      }, {
          value: -1,
          color: upColor
      }]
  },
  grid: [
      {
          left: '5%',
          right: '0%',
          height: '60%'
      },
      {
        left: '5%',
        right: '0%',
        height: '60%'
    },
  ],
  xAxis: [
      {
          type: 'category',
          // data: data.categoryData,
          scale: true,
          boundaryGap: false,
          axisLine: {onZero: false},
          splitLine: {show: false},
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax',
          axisPointer: {
              z: 100
          }
      },
      {
          type: 'category',
          gridIndex: 1,
          // data: data.categoryData,
          scale: true,
          boundaryGap: false,
          axisLine: {onZero: false},
          axisTick: {show: false},
          splitLine: {show: false},
          axisLabel: {show: false},
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax'
      }
  ],
  yAxis: [
      {
          scale: true,
          splitArea: {
              show: true
          }
      },
      {
          scale: true,
          gridIndex: 1,
          splitNumber: 2,
          axisLabel: {show: false},
          axisLine: {show: false},
          axisTick: {show: false},
          splitLine: {show: false}
      }
  ],
  series: [
      {
          name: '',
          type: 'line',
          // data: data.values,
          itemStyle: {
              color: upColor,
              borderColor: null,
          },
          smooth: true,
          tooltip: {
              formatter: function (param) {
                  param = param[0];
                  return [
                      'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                      'Open: ' + param.data[0] + '<br/>',
                      'Close: ' + param.data[1] + '<br/>',
                      'Lowest: ' + param.data[2] + '<br/>',
                      'Highest: ' + param.data[3] + '<br/>'
                  ].join('');
              }
          }
      },
  ]
}
export const tableData = [{
  a: '报警类型',
  b: '报警类型',
  c: '报警类型',
  d: '报警类型',
  e: '报警类型',
  f: '报警类型',
},{
  a: '报警类型1',
  b: '报警类型1',
  c: '报警类型1',
  d: '报警类型1',
  e: '报警类型1',
  f: '报警类型1',
}]