import * as React from 'react'
import useTheme from '@material-ui/core/styles/useTheme'
import {SciChartVerticalGroup} from 'scichart/Charting/LayoutManager/SciChartVerticalGroup'
import Grid from '@material-ui/core/Grid'
import buildTrellisCharts from './build'
import {getTrellisChartHeight, getTrellisChartWidth, clearChart} from './utils'
import useStyles from './styles'
import uomKeys from './data/uomKeys'
import mergedChartData from './data/mergedChartData'
import trellisChartData from './data/trellisChartData'

const MultiPaneGrid = React.memo(({
  uomKeys,
  chartTrellisWidth,
  chartTrellisHeight
}) => (<Grid container direction="row" justify="flex-start" alignItems="stretch">
    {uomKeys.map((x) => (<Grid item xs={chartTrellisWidth}>
        <div id={`${x}-chart-trellis-id`} style={{height: chartTrellisHeight}} />
      </Grid>))}
  </Grid>))

export default function TrellisMultiPane({
  windowHeight,
  windowWidth
}) {
  const theme = useTheme()
  const chartTrellisRef = React.useRef([])
  windowHeight = windowHeight - 60
  const classes = useStyles({
    width: windowWidth,
    height: windowHeight
  })

  const flatDataGroup = []
  Object.values(trellisChartData).forEach((x) => {
    Object.values(x).forEach((y) => flatDataGroup.push(y))
  })

  const verticalGroupRef = React.useRef()

  const createNewTrellisCharts = () => {
    (async () => {
      chartTrellisRef.current = await buildTrellisCharts({
        theme,
        trellisChartData,
        uomKeys,
        mergedChartData,
        chartTrellisRef: chartTrellisRef.current,
        verticalGroup: verticalGroupRef.current
      })
    })()
  }

  React.useEffect(() => {
    if (chartTrellisRef.current.length === 0) {
      verticalGroupRef.current = new SciChartVerticalGroup()
      createNewTrellisCharts()
    }
  }, []) // eslint-disable-line

  React.useEffect(() => () => {
    chartTrellisRef.current.forEach((el) => {
      const {
        sciChartSurface,
        dataSeriesMap
      } = el
      clearChart({
        sciChartSurface,
        dataSeriesMap,
        chartData: mergedChartData,
        flatData: flatDataGroup
      })
      el?.sciChartSurface?.delete()
    })
  }, []) // eslint-disable-line

  const chartTrellisHeight = getTrellisChartHeight(uomKeys, windowHeight)
  const chartTrellisWidth = getTrellisChartWidth(uomKeys)
  return (<div className={classes.root}>
    <div className={classes.chartContainer}>
      <MultiPaneGrid
        uomKeys={uomKeys}
        chartTrellisWidth={chartTrellisWidth}
        chartTrellisHeight={chartTrellisHeight}
      />
    </div>
  </div>)
}
