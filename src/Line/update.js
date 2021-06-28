import {SciChartJSLightTheme} from 'scichart/Charting/Themes/SciChartJSLightTheme'
import {SciChartJSDarkTheme} from 'scichart/Charting/Themes/SciChartJSDarkTheme'
import LineChart from './buildLine'

// eslint-disable-next-line import/no-anonymous-default-export
export default (theme, wasmContext, sciChartSurface, chartData) => {
  if (wasmContext && sciChartSurface) {
    const streamIds = Object.keys(chartData)

    const isLightTheme = theme.palette.type === 'light'

    const darkTheme = new SciChartJSDarkTheme()
    darkTheme.sciChartBackground = theme.palette.background.default
    if (isLightTheme) {
      sciChartSurface.applyTheme(new SciChartJSLightTheme())
    } else {
      sciChartSurface.applyTheme(darkTheme)
    }

    const buildLineChart = ({
      streamSelectorId,
      streamId
    }) => {
      const lineSeries = LineChart(theme, wasmContext, chartData, streamSelectorId, streamId)
      if (lineSeries.hasDataSeriesValues()) {
        sciChartSurface.renderableSeries.add(lineSeries)
        sciChartSurface.zoomExtents()
      }
    }

    streamIds.forEach((s) => {
      const streamId = Number(s)
      const streamSelectorId = streamId
      buildLineChart({
        streamSelectorId,
        streamId
      })
    })

    sciChartSurface.zoomExtents()
  }
};
