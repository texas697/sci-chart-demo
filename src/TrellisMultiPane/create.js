import {SciChartSurface} from 'scichart'
import {StackedColumnCollection} from 'scichart/Charting/Visuals/RenderableSeries/StackedColumnCollection'
import {NumericAxis} from 'scichart/Charting/Visuals/Axis/NumericAxis'
import {NumberRange} from 'scichart/Core/NumberRange'
import {EAutoRange} from 'scichart/types/AutoRange'
import {FadeAnimation} from 'scichart/Charting/Visuals/RenderableSeries/Animations/FadeAnimation'
import {CursorModifier} from 'scichart/Charting/ChartModifiers/CursorModifier'
import {TextAnnotation} from 'scichart/Charting/Visuals/Annotations/TextAnnotation'
import {SciChartJSDarkTheme} from 'scichart/Charting/Themes/SciChartJSDarkTheme'
import {SciChartJSLightTheme} from 'scichart/Charting/Themes/SciChartJSLightTheme'
import CursorModifierTooltip from './tooltip'
import buildStackedChart from './buildStacked'
import {buildChartTitle, formatXAxisDates} from './utils'
import formatChartLabels from '../utils/format-labels'

// eslint-disable-next-line import/no-anonymous-default-export
export default async ({
  i,
  uomKeys,
  mergedChartData,
  trellisChartData,
  theme,
  verticalGroup
}) => {
  const {
    wasmContext,
    sciChartSurface
  } = await SciChartSurface.createSingle(`${uomKeys[i]}-chart-trellis-id`) // eslint-disable-line

  const isLightTheme = theme.palette.type === 'light'
  const dataSeriesMap = new Map()

  const stackedCollection = new StackedColumnCollection(wasmContext)
  const uomKey = String(uomKeys[i])

  const _streamIds = Object.keys(trellisChartData[uomKey])

  const xAxis = new NumericAxis(wasmContext, {
    drawLabels: true,
    drawMajorTickLines: false,
    drawMinorTickLines: false
  })

  xAxis.drawMajorBands = false
  xAxis.drawMajorGridLines = false
  xAxis.drawMinorGridLines = false
  xAxis.labelStyle.color = theme.palette.text.primary
  xAxis.labelProvider.formatLabel = (unixTimestamp) => {
    if (unixTimestamp > 10000) {
      return formatXAxisDates(unixTimestamp)
    }
    return ''
  }

  sciChartSurface.xAxes.add(xAxis)

  const yAxis = new NumericAxis(wasmContext, {
    growBy: new NumberRange(0, 0.15),
    autoRange: EAutoRange.Always
  })

  yAxis.drawMinorGridLines = false
  yAxis.drawMajorBands = false
  yAxis.labelProvider.formatLabel = (yValue) => formatChartLabels(yValue)
  sciChartSurface.yAxes.add(yAxis)

  let _uom = ''
  _streamIds.forEach((s) => {
    const streamId = Number(s)
    const {
      stackSeries,
      uom
    } = buildStackedChart({
      dataSeriesMap,
      streamSelectorId: streamId,
      streamId,
      wasmContext,
      chartData: mergedChartData
    })
    _uom = uom
    stackedCollection.add(stackSeries)
  })

  stackedCollection.dataPointWidth = 0.8
  stackedCollection.animation = new FadeAnimation({duration: 500})
  sciChartSurface.renderableSeries.add(stackedCollection)

  const cursorModifier = new CursorModifier({
    showTooltip: true,
    modifierGroup: 'default'
  })

  cursorModifier.tooltipSvgTemplate = (seriesInfos, svgAnnotation) => CursorModifierTooltip(seriesInfos, svgAnnotation, theme)
  sciChartSurface.chartModifiers.add(cursorModifier)

  sciChartSurface.annotations.add(new TextAnnotation(buildChartTitle(_uom)))

  verticalGroup.addSurfaceToGroup(sciChartSurface)

  const darkTheme = new SciChartJSDarkTheme()
  darkTheme.sciChartBackground = theme.palette.background.default
  if (isLightTheme) {
    sciChartSurface.applyTheme(new SciChartJSLightTheme())
  } else {
    sciChartSurface.applyTheme(darkTheme)
  }

  return {
    wasmContext,
    sciChartSurface,
    dataSeriesMap,
    uomKey: uomKey.toString()
  };
};
