import * as React from 'react'
import {SynchronizedLayoutManager} from 'scichart/Charting/LayoutManager/SynchronizedLayoutManager'
import {SciChartVerticalGroup} from 'scichart/Charting/LayoutManager/SciChartVerticalGroup'
import {CursorModifier} from 'scichart/Charting/ChartModifiers/CursorModifier'
import {SciChartSurface} from 'scichart'
import {TextAnnotation} from 'scichart/Charting/Visuals/Annotations/TextAnnotation'
import {EHorizontalAnchorPoint, EVerticalAnchorPoint} from 'scichart/types/AnchorPoint'
import {ECoordinateMode} from 'scichart/Charting/Visuals/Annotations/AnnotationBase'
import {EAnnotationLayer} from 'scichart/Charting/Visuals/Annotations/IAnnotation'
import {EAutoRange} from 'scichart/types/AutoRange'
import {NumericAxis} from 'scichart/Charting/Visuals/Axis/NumericAxis'
import {NumberRange} from 'scichart/Core/NumberRange'
import {SciChartJSDarkTheme} from 'scichart/Charting/Themes/SciChartJSDarkTheme'
import buildSeries from '../Stacked/SideBySide/build-series'
import {StackedColumnCollection} from 'scichart/Charting/Visuals/RenderableSeries/StackedColumnCollection'
import {ScaleAnimation} from 'scichart/Charting/Visuals/RenderableSeries/Animations/ScaleAnimation'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import fomratChartLabels from '../utils/format-labels'

const divElementId1 = 'cc_chart_3_1'
const divElementId2 = 'cc_chart_3_2'
const divElementId3 = 'cc_chart_3_3'
const divElementId4 = 'cc_chart_3_4'
const divElementId5 = 'cc_chart_3_5'

const drawExample = async () => {
  const verticalGroup = new SciChartVerticalGroup()
  const darkTheme = new SciChartJSDarkTheme()

  let chart1XAxis
  let chart2XAxis
  let chart3XAxis
  let chart4XAxis
  let chart5XAxis

  // CHART 1
  const drawChart1 = async () => {
    const {
      wasmContext,
      sciChartSurface
    } = await SciChartSurface.createSingle(divElementId1)
    sciChartSurface.applyTheme(darkTheme)

    chart1XAxis = new NumericAxis(wasmContext, {
      drawLabels: true,
      drawMajorTickLines: false,
      drawMinorTickLines: false
    })
    chart1XAxis.labelProvider.formatLabel = (unixTimestamp) => {
      if (unixTimestamp > 10000) {
        return new Date(unixTimestamp * 1000).toLocaleDateString('en-us', {
          month: 'short',
          year: 'numeric',
          day: 'numeric'
        })
      }
      return ''
    }

    sciChartSurface.xAxes.add(chart1XAxis)

    const yAxis = new NumericAxis(wasmContext, {
      growBy: new NumberRange(0, 0.15),
      autoRange: EAutoRange.Always
    })

    yAxis.labelProvider.formatLabel = (dataValue) => fomratChartLabels(dataValue)
    sciChartSurface.yAxes.add(yAxis)

    const {
      rendSeries1
    } = buildSeries(wasmContext)

    const verticallyStackedColumnCollection = new StackedColumnCollection(wasmContext)
    verticallyStackedColumnCollection.dataPointWidth = 0.5
    verticallyStackedColumnCollection.add(rendSeries1)
    verticallyStackedColumnCollection.animation = new ScaleAnimation({
      duration: 1000,
      fadeEffect: true
    })

    sciChartSurface.renderableSeries.add(verticallyStackedColumnCollection)
    const cursorModifier = new CursorModifier()
    cursorModifier.showTooltip = true
    cursorModifier.modifierGroup = 'first'
    cursorModifier.axisLabelsFill = '#FFFFFF'
    cursorModifier.axisLabelsStroke = '#00FF00'
    sciChartSurface.chartModifiers.add(cursorModifier)

    sciChartSurface.annotations.add(new TextAnnotation({
      text: 'CO2e',
      horizontalAnchorPoint: EHorizontalAnchorPoint.Left,
      verticalAnchorPoint: EVerticalAnchorPoint.Top,
      xCoordShift: 10,
      yCoordShift: 10,
      fontSize: 24,
      fontWeight: 'Bold',
      textColor: '#FFFFFF',
      xCoordinateMode: ECoordinateMode.Relative,
      yCoordinateMode: ECoordinateMode.Pixel,
      annotationLayer: EAnnotationLayer.BelowChart
    }))

    verticalGroup.addSurfaceToGroup(sciChartSurface)

    return {
      wasmContext,
      sciChartSurface
    }
  }

  // CHART 2
  const drawChart2 = async () => {
    const {
      wasmContext,
      sciChartSurface
    } = await SciChartSurface.createSingle(divElementId2)
    sciChartSurface.applyTheme(darkTheme)

    chart2XAxis = new NumericAxis(wasmContext, {
      drawLabels: true,
      drawMajorTickLines: false,
      drawMinorTickLines: false
    })
    chart2XAxis.labelProvider.formatLabel = (unixTimestamp) => {
      if (unixTimestamp > 10000) {
        return new Date(unixTimestamp * 1000).toLocaleDateString('en-us', {
          month: 'short',
          year: 'numeric',
          day: 'numeric'
        })
      }
      return ''
    }

    sciChartSurface.xAxes.add(chart2XAxis)

    const yAxis = new NumericAxis(wasmContext, {
      growBy: new NumberRange(0, 0.15),
      autoRange: EAutoRange.Always
    })

    yAxis.labelProvider.formatLabel = (dataValue) => fomratChartLabels(dataValue)
    sciChartSurface.yAxes.add(yAxis)

    const {
      rendSeries2,
      rendSeries3
    } = buildSeries(wasmContext)

    const verticallyStackedColumnCollection = new StackedColumnCollection(wasmContext)
    verticallyStackedColumnCollection.dataPointWidth = 0.5
    verticallyStackedColumnCollection.add(rendSeries2, rendSeries3)
    verticallyStackedColumnCollection.animation = new ScaleAnimation({
      duration: 1000,
      fadeEffect: true
    })

    sciChartSurface.renderableSeries.add(verticallyStackedColumnCollection)
    const cursorModifier = new CursorModifier()
    cursorModifier.showTooltip = true
    cursorModifier.modifierGroup = 'first'
    cursorModifier.axisLabelsFill = '#FFFFFF'
    cursorModifier.axisLabelsStroke = '#00FF00'
    sciChartSurface.chartModifiers.add(cursorModifier)

    sciChartSurface.annotations.add(new TextAnnotation({
      text: 'GWH',
      horizontalAnchorPoint: EHorizontalAnchorPoint.Left,
      verticalAnchorPoint: EVerticalAnchorPoint.Top,
      xCoordShift: 10,
      yCoordShift: 10,
      fontSize: 24,
      fontWeight: 'Bold',
      textColor: '#FFFFFF',
      xCoordinateMode: ECoordinateMode.Relative,
      yCoordinateMode: ECoordinateMode.Pixel,
      annotationLayer: EAnnotationLayer.BelowChart
    }))

    verticalGroup.addSurfaceToGroup(sciChartSurface)

    return {
      wasmContext,
      sciChartSurface
    }
  }

  // CHART 3
  const drawChart3 = async () => {
    const {
      wasmContext,
      sciChartSurface
    } = await SciChartSurface.createSingle(divElementId3)
    sciChartSurface.applyTheme(darkTheme)

    chart3XAxis = new NumericAxis(wasmContext, {
      drawLabels: true,
      drawMajorTickLines: false,
      drawMinorTickLines: false
    })
    chart3XAxis.labelProvider.formatLabel = (unixTimestamp) => {
      if (unixTimestamp > 10000) {
        return new Date(unixTimestamp * 1000).toLocaleDateString('en-us', {
          month: 'short',
          year: 'numeric',
          day: 'numeric'
        })
      }
      return ''
    }

    sciChartSurface.xAxes.add(chart3XAxis)

    const yAxis = new NumericAxis(wasmContext, {
      growBy: new NumberRange(0, 0.15),
      autoRange: EAutoRange.Always
    })

    yAxis.labelProvider.formatLabel = (dataValue) => fomratChartLabels(dataValue)
    sciChartSurface.yAxes.add(yAxis)

    const {
      rendSeries4
    } = buildSeries(wasmContext)

    const verticallyStackedColumnCollection = new StackedColumnCollection(wasmContext)
    verticallyStackedColumnCollection.dataPointWidth = 0.5
    verticallyStackedColumnCollection.add(rendSeries4)
    verticallyStackedColumnCollection.animation = new ScaleAnimation({
      duration: 1000,
      fadeEffect: true
    })

    sciChartSurface.renderableSeries.add(verticallyStackedColumnCollection)
    const cursorModifier = new CursorModifier()
    cursorModifier.showTooltip = true
    cursorModifier.modifierGroup = 'first'
    cursorModifier.axisLabelsFill = '#FFFFFF'
    cursorModifier.axisLabelsStroke = '#00FF00'
    sciChartSurface.chartModifiers.add(cursorModifier)

    sciChartSurface.annotations.add(new TextAnnotation({
      text: '% MCF / MCF',
      horizontalAnchorPoint: EHorizontalAnchorPoint.Left,
      verticalAnchorPoint: EVerticalAnchorPoint.Top,
      xCoordShift: 10,
      yCoordShift: 10,
      fontSize: 24,
      fontWeight: 'Bold',
      textColor: '#FFFFFF',
      xCoordinateMode: ECoordinateMode.Relative,
      yCoordinateMode: ECoordinateMode.Pixel,
      annotationLayer: EAnnotationLayer.BelowChart
    }))

    verticalGroup.addSurfaceToGroup(sciChartSurface)

    return {
      wasmContext,
      sciChartSurface
    }
  }

  // DRAW CHARTS
  const res = await Promise.all([drawChart1(), drawChart2(), drawChart3()])

  // SYNCHRONIZE VISIBLE RANGES
  chart1XAxis.visibleRangeChanged.subscribe(data1 => {
    chart2XAxis.visibleRange = data1.visibleRange
    chart3XAxis.visibleRange = data1.visibleRange
  })
  chart2XAxis.visibleRangeChanged.subscribe(data1 => {
    chart1XAxis.visibleRange = data1.visibleRange
    chart3XAxis.visibleRange = data1.visibleRange
  })
  chart3XAxis.visibleRangeChanged.subscribe(data1 => {
    chart1XAxis.visibleRange = data1.visibleRange
    chart2XAxis.visibleRange = data1.visibleRange
  })

  res.forEach((el) => {
    el.sciChartSurface.zoomExtents()
  })

  return res
}

let charts = []

export default function MultiPaneStockCharts() {
  React.useEffect(() => {
    (async () => {
      charts = await drawExample()
    })()
    return () => {
      charts.forEach(el => el?.sciChartSurface?.delete())
    }
  }, [])

  return (<div className="ChartWrapper">
    <Grid container direction="row"
          justify="space-between"
          alignItems="stretch">
      <Grid item xs={4}>
        <div id={divElementId1} className="div" style={{height: 1000}} />
      </Grid>
      <Grid item xs={4}>
        <div id={divElementId2} className="div" style={{height: 1000}} />
      </Grid>
      <Grid item xs={4}>
        <div id={divElementId3} className="div" style={{height: 1000}} />
      </Grid>
    </Grid>
  </div>)
}
