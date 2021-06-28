import * as React from 'react'
import uniqBy from 'lodash.uniqby';
import Grid from '@material-ui/core/Grid'
import {SciChartSurface} from 'scichart/Charting/Visuals/SciChartSurface'
import useTheme from '@material-ui/core/styles/useTheme'
import useStyles from '../TrellisMultiPane/styles'
import updateChartWithData from './update'
import setXAxis from './setXAxis'
import setYAxis from './setYAxis'
import chartData from './data/chartData'
import yAxisData from './data/yAxisData'

import drawChart, {DIVID, SCICHART_KEY, attachModifiers} from './create'
import {clearChart} from '../TrellisMultiPane/utils'

SciChartSurface.setRuntimeLicenseKey(SCICHART_KEY)

export default function LineChart({
  windowHeight,
  windowWidth
}) {
  const theme = useTheme()
  windowHeight = windowHeight - 200
  const classes = useStyles({
    width: windowWidth,
    height: windowHeight
  })

  const sciChartSurfaceRef = React.useRef([])
  const dataSeriesMap = new Map()
  const flatData = uniqBy(Object.values(chartData), 'label');
  React.useEffect(() => {
    (async () => {
      const {
        sciChartSurface,
        wasmContext
      } = await drawChart(theme)
      if (sciChartSurface) {
        sciChartSurfaceRef.current = sciChartSurface
        setXAxis(wasmContext, sciChartSurfaceRef.current);
        setYAxis(wasmContext, sciChartSurfaceRef.current, yAxisData, theme)
        attachModifiers(sciChartSurfaceRef.current, theme)
        updateChartWithData(theme, wasmContext, sciChartSurfaceRef.current, chartData)
      }
    })()
    // Deleting sciChartSurface to prevent memory leak
    return () => {
      clearChart({
        sciChartSurface: sciChartSurfaceRef.current,
        dataSeriesMap,
        chartData,
        flatData
      })
      sciChartSurfaceRef.current?.delete()
    }
  }, []) // eslint-disable-line

  return (<div className={classes.root}>
    <div className={classes.chartContainer}>
      <Grid container direction="row" justify="flex-start" alignItems="stretch">
        <Grid item xs={12}>
          <div id={DIVID} />
        </Grid>
      </Grid>
    </div>
  </div>)
}
