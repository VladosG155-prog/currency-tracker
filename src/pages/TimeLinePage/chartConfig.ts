import { Themes } from '@root/constants/enums';
import { Chart as ChartJs, ChartOptions, registerables } from 'chart.js';
import {
  CandlestickController,
  CandlestickElement,
  OhlcController,
  OhlcElement,
} from 'chartjs-chart-financial';

import 'chartjs-adapter-moment';

const customBorder = {
  id: 'customBorder',
  afterDatasetsDraw(chart: ChartJs) {
    const {
      ctx,
      chartArea: { top, bottom, left, right },
    } = chart;

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 2;
    // @ts-ignore
    ctx.strokeStyle = chart.options.scales.y.ticks.color;

    ctx.moveTo(left, top + 3);
    ctx.lineTo(left + 5, top + 10);
    ctx.moveTo(left + 1, top + 3);
    ctx.lineTo(left - 5, top + 10);
    ctx.moveTo(left, top + 5);
    ctx.lineTo(left, bottom);
    ctx.lineTo(right - 5, bottom);
    ctx.moveTo(right - 3, bottom + 1);
    ctx.lineTo(right - 10, bottom - 5);
    ctx.moveTo(right - 3, bottom - 1);
    ctx.lineTo(right - 10, bottom + 5);
    ctx.stroke();
    ctx.closePath();
  },
};
ChartJs.register(
  CandlestickElement,
  OhlcController,
  OhlcElement,
  CandlestickController,
  customBorder,
  ...registerables,
);

export const colors = {
  color: {
    down: '#EA3943',
    up: '#16C782',
  },
  borderColor: {
    down: '#EA3943',
    up: '#16C782',
  },
};

export const getOptions = (theme: Themes): ChartOptions<'candlestick'> => {
  const ticksColor = theme === Themes.Dark ? '#fff' : '#000';
  const gridColor =
    theme === Themes.Dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  return {
    plugins: {
      legend: {
        display: false,
      },
    },
    font: {
      family: 'Poppins, sans-serif',
      size: 12,
    },
    onHover: (event) => {
      if (!event.native) return;
      const element = event.native.target as HTMLElement;
      element.style.cursor = 'pointer';
    },
    scales: {
      y: {
        ticks: {
          stepSize: 500,
          color: ticksColor,
          sampleSize: 20,
        },
        grid: {
          color: gridColor,
        },
        stacked: false,
        type: 'linear',
        grace: '10%',
      },
      x: {
        type: 'time',
        offset: true,
        display: false,
        time: {
          unit: 'day',
        },
        ticks: {
          source: 'auto',
        },
      },
    },
  };
};
