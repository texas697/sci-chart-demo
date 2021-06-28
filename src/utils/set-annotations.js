import {TextAnnotation} from 'scichart/Charting/Visuals/Annotations/TextAnnotation'
import {ECoordinateMode} from 'scichart/Charting/Visuals/Annotations/AnnotationBase'
import {EHorizontalAnchorPoint, EVerticalAnchorPoint} from 'scichart/types/AnchorPoint'
import fomratChartLabels from './format-labels'

export default (sciChartSurface, DATA1, DATA2, DATA3) => {
  DATA1.forEach((x) => {
    const annotation = new TextAnnotation({
      x1: x.timestamp,
      y1: 0.5 * x.value,
      xCoordinateMode: ECoordinateMode.DataValue,
      yCoordinateMode: ECoordinateMode.DataValue,
      horizontalAnchorPoint: EHorizontalAnchorPoint.Center,
      verticalAnchorPoint: EVerticalAnchorPoint.Center,
      textColor: 'white',
      fontSize: 14,
      fontWeight: 'bold',
      text: fomratChartLabels(x.value)
    })
    sciChartSurface.annotations.add(annotation)
  })

  DATA2.forEach((x) => {
    const annotation = new TextAnnotation({
      x1: x.timestamp,
      y1: 0.5 * x.value,
      xCoordinateMode: ECoordinateMode.DataValue,
      yCoordinateMode: ECoordinateMode.DataValue,
      horizontalAnchorPoint: EHorizontalAnchorPoint.Center,
      verticalAnchorPoint: EVerticalAnchorPoint.Center,
      textColor: 'white',
      fontSize: 14,
      fontWeight: 'bold',
      text: fomratChartLabels(x.value)
    })
    sciChartSurface.annotations.add(annotation)
  })

  DATA3.forEach((x) => {
    const annotation = new TextAnnotation({
      x1: x.timestamp,
      y1: 0.5 * x.value,
      xCoordinateMode: ECoordinateMode.DataValue,
      yCoordinateMode: ECoordinateMode.DataValue,
      horizontalAnchorPoint: EHorizontalAnchorPoint.Center,
      verticalAnchorPoint: EVerticalAnchorPoint.Center,
      textColor: 'white',
      fontSize: 14,
      fontWeight: 'bold',
      text: fomratChartLabels(x.value)
    })
    sciChartSurface.annotations.add(annotation)
  })
}
