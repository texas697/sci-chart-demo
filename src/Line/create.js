import {SciChartSurface} from 'scichart/Charting/Visuals/SciChartSurface'
import {NumericAxis} from 'scichart/Charting/Visuals/Axis/NumericAxis'
import {CursorModifier} from 'scichart/Charting/ChartModifiers/CursorModifier'
import {SciChartJSLightTheme} from 'scichart/Charting/Themes/SciChartJSLightTheme'
import {SciChartJSDarkTheme} from 'scichart/Charting/Themes/SciChartJSDarkTheme'
import {NumberRange} from 'scichart/Core/NumberRange'
import {EAutoRange} from 'scichart/types/AutoRange'
import CursorModifierTooltip from '../TrellisMultiPane/tooltip'
import {formatXAxisDates} from '../TrellisMultiPane/utils'

export const SCICHART_KEY = process.env.SCI_CHART_KEY
export const DIVID = 'chart'

export const attachModifiers = (sciChartSurface, theme) => {
  const cursorModifier = new CursorModifier({
    showTooltip: true
  })

  cursorModifier.tooltipSvgTemplate = (seriesInfos, svgAnnotation) => CursorModifierTooltip(seriesInfos, svgAnnotation, theme)

  sciChartSurface.chartModifiers.add(cursorModifier)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (theme) => {
  const {
    sciChartSurface,
    wasmContext
  } = await SciChartSurface.createSingle(DIVID)
  const isLightTheme = theme.palette.type === 'light'

  const xAxis = new NumericAxis(wasmContext, {
    drawMinorTickLines: false,
    drawMajorTickLines: false
  })
  const yAxis = new NumericAxis(wasmContext, {
    drawMinorTickLines: false,
    drawMajorTickLines: false,
    growBy: new NumberRange(0.2, 0.2),
    autoRange: EAutoRange.Always
  })

  xAxis.drawMajorBands = false
  xAxis.drawMajorGridLines = false
  xAxis.drawMinorGridLines = false
  yAxis.drawMinorGridLines = false
  yAxis.drawMajorBands = false
  xAxis.labelStyle.color = theme.palette.text.primary
  xAxis.labelProvider.formatLabel = (unixTimestamp) => {
    if (unixTimestamp > 10000) {
      return formatXAxisDates(unixTimestamp)
    }
    return ''
  }

  yAxis.labelProvider.formatLabel = () => {
    return ''
  }

  sciChartSurface.yAxes.add(yAxis)
  sciChartSurface.xAxes.add(xAxis)

  attachModifiers(sciChartSurface, theme)

  sciChartSurface.zoomExtents()

  const darkTheme = new SciChartJSDarkTheme()
  darkTheme.sciChartBackground = theme.palette.background.default
  if (isLightTheme) {
    sciChartSurface.applyTheme(new SciChartJSLightTheme())
  } else {
    sciChartSurface.applyTheme(darkTheme)
  }

  return {
    sciChartSurface,
    wasmContext
  };
};
