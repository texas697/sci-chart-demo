import {EHorizontalAnchorPoint, EVerticalAnchorPoint} from 'scichart/types/AnchorPoint'
import {ECoordinateMode} from 'scichart/Charting/Visuals/Annotations/AnnotationBase'
import {EAnnotationLayer} from 'scichart/Charting/Visuals/Annotations/IAnnotation'

export const clearChart = ({
  sciChartSurface,
  dataSeriesMap,
  flatData
}) => {
  const seriesArray = sciChartSurface.renderableSeries.asArray()
  seriesArray.forEach((rs) => {
    if (!rs.isStacked) {
      rs.dataSeries.delete()
    }
    rs.delete()
    sciChartSurface.renderableSeries.remove(rs)
    sciChartSurface.zoomExtents()
  })

  sciChartSurface.renderableSeries.clear()

  flatData.forEach((stream) => {
    const streamSelectorId = stream.streamId
    dataSeriesMap.forEach((ds) => {
      ds.delete()
      dataSeriesMap.delete(streamSelectorId)
      dataSeriesMap.delete(streamSelectorId * 2)
      ds.clear()
    })
  })
  dataSeriesMap.clear()
}

export const buildChartTitle = (uom) => ({
  text: uom,
  horizontalAnchorPoint: EHorizontalAnchorPoint.Left,
  verticalAnchorPoint: EVerticalAnchorPoint.Top,
  xCoordShift: 5,
  yCoordShift: 5,
  fontSize: 16,
  fontWeight: 'Bold',
  textColor: '#FFFFFF',
  xCoordinateMode: ECoordinateMode.Relative,
  yCoordinateMode: ECoordinateMode.Pixel,
  annotationLayer: EAnnotationLayer.BelowChart
})

export const formatXAxisDates = (timestamp) => new Date(timestamp * 1000).toLocaleDateString('en-us', {
  month: 'short',
  year: 'numeric',
  day: 'numeric'
})

export const getTrellisChartHeight = (uomKeys, windowHeight) => {
  return uomKeys.length <= 3 ? windowHeight : uomKeys.length > 3 && uomKeys.length <= 6 ? windowHeight / 2 : windowHeight / 3
}

export const getTrellisChartWidth = (uomKeys) => (uomKeys.length === 1 ? 12 : uomKeys.length === 2 ? 6 : 4)
