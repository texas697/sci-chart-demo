import {EHorizontalAnchorPoint, EVerticalAnchorPoint} from 'scichart/types/AnchorPoint'
import {ECoordinateMode} from 'scichart/Charting/Visuals/Annotations/AnnotationBase'
import {EAnnotationLayer} from 'scichart/Charting/Visuals/Annotations/IAnnotation'
import createChart from './create'

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

// eslint-disable-next-line import/no-anonymous-default-export
export default async ({
  theme,
  trellisChartData,
  uomKeys,
  mergedChartData,
  chartTrellisRef,
  verticalGroup
}) => {
  const _chartData = async () => {
    for (let i = 0; i < uomKeys.length; i += 1) { // eslint-disable-line

      // eslint-disable-next-line
      const {
        wasmContext,
        sciChartSurface,
        dataSeriesMap,
        uomKey
      } = await createChart({
        i,
        uomKeys,
        mergedChartData,
        trellisChartData,
        theme,
        verticalGroup
      })

      chartTrellisRef.push({
        wasmContext,
        sciChartSurface,
        dataSeriesMap,
        uomKey
      })
    }
  }

  await _chartData()
  return chartTrellisRef
};
