import {NumericAxis} from 'scichart/Charting/Visuals/Axis/NumericAxis'
import {NumberRange} from 'scichart/Core/NumberRange'
import {Thickness} from 'scichart/Core/Thickness'

import {EAutoRange} from 'scichart/types/AutoRange'
import fomratChartLabels from '../utils/format-labels'

// eslint-disable-next-line import/no-anonymous-default-export
export default (wasmContext, sciChartSurface, yAxisData, theme) => {
  if (wasmContext && sciChartSurface) {
    const getYAxis = (x) => new NumericAxis(wasmContext, {
      axisTitle: x.axisTitle,
      id: x.axisId,
      drawMinorTickLines: false,
      drawMajorTickLines: false,
      growBy: new NumberRange(0.2, 0.2),
      autoRange: EAutoRange.Always,
      axisTitleStyle: {
        fontSize: 16,
        padding: Thickness.fromString('0 0 0 0'),
        color: theme.palette.text.primary
      }
    })

    yAxisData.forEach((x) => {
      const yAxis = getYAxis(x)
      yAxis.labelProvider.formatLabel = (dataValue) => fomratChartLabels(dataValue)

      yAxis.drawMajorBands = false
      yAxis.drawMinorGridLines = false
      yAxis.labelStyle.color = theme.palette.text.primary

      sciChartSurface.yAxes.add(yAxis)
    })
    const xAxis = sciChartSurface.xAxes.get(0)
    xAxis.labelStyle.color = theme.palette.text.primary
  }
};
