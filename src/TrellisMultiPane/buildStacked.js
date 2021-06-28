import {XyDataSeries} from 'scichart/Charting/Model/XyDataSeries'
import {StackedColumnRenderableSeries} from 'scichart/Charting/Visuals/RenderableSeries/StackedColumnRenderableSeries'

// eslint-disable-next-line import/no-anonymous-default-export
export default ({
  dataSeriesMap,
  wasmContext,
  chartData,
  streamSelectorId,
  streamId
}) => {
  const xyDataSeries = new XyDataSeries(wasmContext)
  dataSeriesMap.set(streamSelectorId, xyDataSeries)

  const obj = chartData[streamSelectorId]
  const stroke = obj.stroke
  const uom = obj.uom
  const label = obj.label

  xyDataSeries.dataSeriesName = label

  chartData[streamId].data?.forEach((value) => {
    xyDataSeries.append(value.timestamp, value.value)
  })

  const stackSeries = new StackedColumnRenderableSeries(wasmContext)
  stackSeries.stroke = stroke
  stackSeries.fill = stroke
  stackSeries.dataSeries = xyDataSeries
  stackSeries.stackedGroupId = label

  return {
    stackSeries,
    uom
  }
};
