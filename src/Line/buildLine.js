import {XyDataSeries} from 'scichart/Charting/Model/XyDataSeries'
import {EllipsePointMarker} from 'scichart/Charting/Visuals/PointMarkers/EllipsePointMarker'
import {FastLineRenderableSeries} from 'scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries'
import {FadeAnimation} from 'scichart/Charting/Visuals/RenderableSeries/Animations/FadeAnimation'

// eslint-disable-next-line import/no-anonymous-default-export
export default (theme, wasmContext, chartData, streamSelectorId, streamId) => {
  const xyDataSeries = new XyDataSeries(wasmContext)

  const obj = chartData[streamSelectorId]
  const stroke = obj.stroke
  xyDataSeries.dataSeriesName = obj.label

  chartData[streamId].data?.forEach((value) => {
    xyDataSeries.append(value.timestamp, value.value)
  })
  const isSinglePoint = chartData[streamId].data?.length === 1

  const lineSeries = new FastLineRenderableSeries(wasmContext, {
    stroke,
    strokeThickness: obj.strokeThickness,
    strokeDashArray: obj.strokeDashArray,
    dataSeries: xyDataSeries,
    animation: new FadeAnimation({duration: 500}),
    yAxisId: obj.axisId
  })

  if (isSinglePoint) {
    lineSeries.pointMarker = new EllipsePointMarker(wasmContext, {
      width: 9,
      height: 9,
      strokeThickness: obj.strokeThickness,
      stroke,
      fill: stroke
    })
  }

  return lineSeries
};
