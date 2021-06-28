import {multiPaneData} from './multi-pane-data'

export const getDampedSinewave = (pad, amplitude, phase, dampingFactor, pointCount, frequency = 10) => {
  const xValues = []
  const yValues = []

  for (let i = 0; i < pad; i++) {
    const time = 10 * i / pointCount
    xValues.push(time)
    yValues.push(NaN)
  }

  for (let i = pad, j = 0; i < pointCount; i++, j++) {
    const time = 10 * i / pointCount
    const wn = 2 * Math.PI / (pointCount / frequency)

    xValues.push(time)
    yValues.push(amplitude * Math.sin(j * wn + phase))

    amplitude *= (1.0 - dampingFactor)
  }

  return {
    xValues,
    yValues
  }
}

export const getSinewave = (amplitude, phase, pointCount, frequency = 10) => {
  return getDampedSinewave(0, amplitude, phase, 0.0, pointCount, frequency)
}

export const getNoisySinewave = (amplitude, phase, pointCount, noiseAmplitude) => {

  const {
    xValues,
    yValues
  } = getSinewave(amplitude, phase, pointCount)

  // Add some noise
  for (let i = 0; i < pointCount; i++) {
    yValues[i] += Math.random() * noiseAmplitude - noiseAmplitude * 0.5
  }

  return {
    xValues,
    yValues
  }
}

export const getFourierSeriesZoomed = (amplitude, phaseShift, xStart, xEnd, count = 5000) => {
  const fourierData = this.getFourierSeries(amplitude, phaseShift, count)

  let index0 = 0
  let index1 = 0
  for (let i = 0; i < count; i++) {
    if (fourierData.xValues[i] > xStart && index0 === 0) {
      index0 = i
    }
    if (fourierData.xValues[i] > xEnd && index1 === 0) {
      index1 = i
      break
    }
  }

  const xValues = fourierData.xValues.filter((_, i) => i >= index0 && i < index1)
  const yValues = fourierData.yValues.filter((_, i) => i >= index0 && i < index1)
  return {
    xValues,
    yValues
  }
}

export const getFourierSeries = (amplitude, phaseShift, count = 5000) => {
  const xValues = []
  const yValues = []

  for (let i = 0; i < count; i++) {
    const time = 10 * i / count
    const wn = 2 * Math.PI / (count / 10)

    xValues.push(time)
    yValues.push(Math.PI * amplitude * (Math.sin(i * wn + phaseShift) + 0.33 * Math.sin(i * 3 * wn + phaseShift) + 0.20 * Math.sin(i * 5 * wn + phaseShift) + 0.14 * Math.sin(i * 7 * wn + phaseShift) + 0.11 * Math.sin(i * 9 * wn + phaseShift) + 0.09 * Math.sin(i * 11 * wn + phaseShift)))
  }

  return {
    xValues,
    yValues
  }
}

export const getTradingData = (maxPoints) => {
  const {
    dateValues,
    openValues,
    highValues,
    lowValues,
    closeValues,
    volumeValues
  } = multiPaneData

  if (maxPoints !== undefined) {
    return {
      dateValues: dateValues.slice(0, maxPoints),
      openValues: openValues.slice(0, maxPoints),
      highValues: highValues.slice(0, maxPoints),
      lowValues: lowValues.slice(0, maxPoints),
      closeValues: closeValues.slice(0, maxPoints),
      volumeValues: volumeValues.slice(0, maxPoints)
    }
  }

  return {
    dateValues,
    openValues,
    highValues,
    lowValues,
    closeValues,
    volumeValues
  };
}
