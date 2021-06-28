import {XyDataSeries} from 'scichart/Charting/Model/XyDataSeries'
import {StackedColumnRenderableSeries} from 'scichart/Charting/Visuals/RenderableSeries/StackedColumnRenderableSeries'
import {DATA1, DATA2, DATA3, DATA4, DATA5, DATA6} from '../../config'

const xValues = DATA1.map(x => x.timestamp)
const series1Data = DATA1.map(x => x.value)
const series2Data = DATA2.map(x => x.value)
const series3Data = DATA3.map(x => x.value)
const series4Data = DATA4.map(x => x.value)
const series5Data = DATA5.map(x => x.value)
const series6Data = DATA6.map(x => x.value)

export default (wasmContext) => {
  const dataSeries1 = new XyDataSeries(wasmContext, {
    xValues,
    yValues: series1Data,
    dataSeriesName: 'Emissions-Total (CO2e)'
  })
  const dataSeries2 = new XyDataSeries(wasmContext, {
    xValues,
    yValues: series2Data,
    dataSeriesName: 'Energy Produced-Total'
  })
  const dataSeries3 = new XyDataSeries(wasmContext, {
    xValues,
    yValues: series3Data,
    dataSeriesName: 'Energy Consumed-Total'
  })
  const dataSeries4 = new XyDataSeries(wasmContext, {
    xValues,
    yValues: series4Data,
    dataSeriesName: 'Intensity-CH4'
  })
  const dataSeries5 = new XyDataSeries(wasmContext, {
    xValues,
    yValues: series5Data,
    dataSeriesName: 'Intensity-CO2'
  })
  const dataSeries6 = new XyDataSeries(wasmContext, {
    xValues,
    yValues: series6Data,
    dataSeriesName: 'Energy Loss-Captured Gas'
  })

  const rendSeries1 = new StackedColumnRenderableSeries(wasmContext)
  rendSeries1.fill = '#0077BE'
  rendSeries1.strokeThickness = 1
  rendSeries1.dataSeries = dataSeries1
  rendSeries1.stackedGroupId = 'CO2e'

  const rendSeries2 = new StackedColumnRenderableSeries(wasmContext)
  rendSeries2.fill = '#681a1e'
  rendSeries2.strokeThickness = 1
  rendSeries2.dataSeries = dataSeries2
  rendSeries2.stackedGroupId = 'GWH'

  const rendSeries3 = new StackedColumnRenderableSeries(wasmContext)
  rendSeries3.fill = '#b694ef'
  rendSeries3.strokeThickness = 1
  rendSeries3.dataSeries = dataSeries3
  rendSeries3.stackedGroupId = 'GWH'

  const rendSeries4 = new StackedColumnRenderableSeries(wasmContext)
  rendSeries4.fill = '#58C6F2'
  rendSeries4.strokeThickness = 1
  rendSeries4.dataSeries = dataSeries4
  rendSeries4.stackedGroupId = '% MCF / MCF'

  const rendSeries5 = new StackedColumnRenderableSeries(wasmContext)
  rendSeries5.fill = '#8CDBF9'
  rendSeries5.strokeThickness = 1
  rendSeries5.dataSeries = dataSeries5
  rendSeries5.stackedGroupId = 'MT CO2e / MBOE'

  const rendSeries6 = new StackedColumnRenderableSeries(wasmContext)
  rendSeries6.fill = '#bd4a1c'
  rendSeries6.strokeThickness = 1
  rendSeries6.dataSeries = dataSeries6
  rendSeries6.stackedGroupId = '%'

  return {
    rendSeries1,
    rendSeries2,
    rendSeries3,
    rendSeries4,
    rendSeries5,
    rendSeries6
  }
}
