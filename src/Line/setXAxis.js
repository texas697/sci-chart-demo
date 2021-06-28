import { NumericAxis } from 'scichart/Charting/Visuals/Axis/NumericAxis';

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  wasmContext,
  sciChartSurface,
) => {
  if (wasmContext && sciChartSurface) {
    const xAxis = new NumericAxis(wasmContext, {
      drawMinorTickLines: false,
      drawMajorTickLines: false,
    });

    xAxis.drawMajorBands = false;
    xAxis.drawMajorGridLines = false;
    xAxis.drawMinorGridLines = false;
    xAxis.labelProvider.formatLabel = (unixTimestamp) => {
      if (unixTimestamp > 10000) {
        const _unixTimestamp = unixTimestamp * 1000;
        return new Date(_unixTimestamp).toLocaleDateString('en-us', { year: 'numeric' });
      }
      return '';
    };

    xAxis.maxAutoTicks = 1;

    sciChartSurface.xAxes.add(xAxis);
  }
};
