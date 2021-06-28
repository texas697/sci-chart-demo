import * as React from 'react'
import {SciChartSurface} from 'scichart'
import {NumericAxis} from 'scichart/Charting/Visuals/Axis/NumericAxis'
import {NumberRange} from 'scichart/Core/NumberRange'
import {StackedColumnCollection} from 'scichart/Charting/Visuals/RenderableSeries/StackedColumnCollection'
import {RolloverModifier} from 'scichart/Charting/ChartModifiers/RolloverModifier'
import {EAutoRange} from 'scichart/types/AutoRange'
import {ScaleAnimation} from 'scichart/Charting/Visuals/RenderableSeries/Animations/ScaleAnimation'
import buildSeries from './build-series'
import setAnnotaions from '../../utils/set-annotations'
import fomratChartLabels from '../../utils/format-labels'
import {DATA1, DATA2, DATA3, SCICHART_KEY} from '../../config'

const divElementId = 'chart'
SciChartSurface.setRuntimeLicenseKey(SCICHART_KEY)
const drawExample = async () => {
  const {
    wasmContext,
    sciChartSurface
  } = await SciChartSurface.create(divElementId)

  const xAxis = new NumericAxis(wasmContext)
  xAxis.labelProvider.formatLabel = (unixTimestamp) => {
    if (unixTimestamp > 10000) {
      return new Date(unixTimestamp * 1000).toLocaleDateString('en-us', {
        month: 'short',
        year: 'numeric',
        day: 'numeric'
      })
    }
    return ''
  }

  sciChartSurface.xAxes.add(xAxis)

  const yAxis = new NumericAxis(wasmContext, {
    growBy: new NumberRange(0.1, 8),
    autoRange: EAutoRange.Always
  })

  yAxis.labelProvider.formatLabel = (dataValue) => fomratChartLabels(dataValue)
  sciChartSurface.yAxes.add(yAxis)

  const {
    rendSeries1,
    rendSeries2,
    rendSeries3
  } = buildSeries(wasmContext)

  const verticallyStackedColumnCollection = new StackedColumnCollection(wasmContext)
  verticallyStackedColumnCollection.dataPointWidth = 0.5
  verticallyStackedColumnCollection.add(rendSeries1, rendSeries2, rendSeries3)
  verticallyStackedColumnCollection.animation = new ScaleAnimation({
    duration: 1000,
    fadeEffect: true
  })

  sciChartSurface.renderableSeries.add(verticallyStackedColumnCollection)

  sciChartSurface.zoomExtents()

  sciChartSurface.chartModifiers.add(new RolloverModifier({rolloverLineStroke: '#228B22'}))

  setAnnotaions(sciChartSurface, DATA1, DATA2, DATA3)
  return {
    wasmContext,
    sciChartSurface
  }
}

export default function StackedColumnSideBySide() {
  const [sciChartSurface, setSciChartSurface] = React.useState()

  React.useEffect(() => {
    (async () => {
      const res = await drawExample()
      setSciChartSurface(res.sciChartSurface)
    })()
    return () => sciChartSurface?.delete()
  }, [])

  return <div id={divElementId} className="ChartWrapper" />;
}
