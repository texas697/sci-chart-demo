import groupBy from 'lodash.groupby';

/** @ignore */
const calcTooltipWidth = (textLength = 20, fontSize = 13) => {
  return textLength * 2;
};

/** @ignore */
const calcTooltipHeight = (lines = 2, fontSize = 13) => {
  return 17 * lines + 16;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (seriesInfos, svgAnnotation, theme) => {
  const id = `id_${Date.now()}`;
  const valuesWithLabels = [];
  const numberOfSeries = seriesInfos.length;

  const tooltipFill = theme.palette.background.paper;
  const tooltipStroke = theme.palette.getContrastText(tooltipFill);
  if (numberOfSeries === 0) {
    return '<svg></svg>';
  }

  const _seriesInfos = [];
  const grouped = groupBy(seriesInfos, 'seriesName');

  Object.values(grouped).forEach((group) => {
    let yValue = 0;
    let xValue = 0;
    let formattedYValue = '';
    let formattedXValue = '';
    const _group0 = group[0];
    const _group1 = group[1];
    const stroke = _group0.stroke;
    const seriesName = _group0.seriesName;
    if (_group0.isWithinDataBounds) {
      yValue = _group0.yValue;
      xValue = _group0.xValue;
      formattedXValue = _group0.formattedXValue;
      formattedYValue = _group0.formattedYValue;
    } else if (_group1 && _group1.isWithinDataBounds) {
      yValue = _group1.yValue;
      xValue = _group1.xValue;
      formattedXValue = _group1.formattedXValue;
      formattedYValue = _group1.formattedYValue;
    } else if (_group0 && !_group0.isWithinDataBounds) {
      yValue = _group0.yValue;
      xValue = _group0.xValue;
      formattedXValue = _group0.formattedXValue;
      formattedYValue = _group0.formattedYValue;
    }
    if (!formattedXValue) formattedXValue = 'Today';
    _seriesInfos.push({ yValue, xValue, seriesName, stroke, formattedXValue, formattedYValue });
  });

  const title = _seriesInfos[0]?.formattedXValue.toString().toUpperCase();
  valuesWithLabels.push(`<tspan x="8" dy="1.6em" font-size="13" fill="${tooltipStroke}">${title}</tspan>`);
  valuesWithLabels.push(
    `<tspan x="8" dy="0.7em" font-size="13" fill="${theme.palette.grey['800']}">__________________________________</tspan>`
  );
  _seriesInfos.forEach((el) => {
    if (el.seriesName) {
      valuesWithLabels.push(
        `<tspan font-family='FontAwesome' fill=${el.stroke}>&#xf04d;</tspan><tspan fill="${tooltipStroke}"> ${el.seriesName}</tspan><tspan x="92%" text-anchor="end" fill="${tooltipStroke}">${el.formattedYValue}</tspan>`
      );
    }
  });

  let valuesBlock = '';

  const tooltipLength = valuesWithLabels.reduce((prev, cur) => (cur.length > prev ? cur.length : prev), 0);

  const width = calcTooltipWidth(tooltipLength);
  const tooltipLines = valuesWithLabels.length;
  const height = calcTooltipHeight(tooltipLines);

  // Positioning the tooltip
  const { seriesViewRect } = svgAnnotation.parentSurface;
  const xCoord = svgAnnotation.x1;
  const yCoord = svgAnnotation.y1;
  const xCoordShift = seriesViewRect.width - xCoord < width ? -width : 5;
  const yCoordShift = seriesViewRect.height - yCoord < height ? -height : 5;
  svgAnnotation.xCoordShift = xCoordShift;
  svgAnnotation.yCoordShift = yCoordShift;
  valuesWithLabels.forEach((val) => {
    valuesBlock += `<tspan x="8" dy="1.2em">${val}</tspan>`;
  });

  return `<svg width="${width}" height="${height}">
        <defs>
            <filter id="${id}" x="0" y="0" width="200%" height="200%">
                <feOffset result="offOut" in="SourceAlpha" dx="3" dy="3" />
                <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />
                <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
        </defs>
        <rect rx="4" ry="4" width="95%" height="90%" fill="${tooltipFill}" filter="url(#${id})" />
        <svg width="100%">
            <text x="8" y="3" font-size="13" dy="0" fill="${tooltipStroke}">${valuesBlock}</text>
        </svg>
    </svg>`;
};
