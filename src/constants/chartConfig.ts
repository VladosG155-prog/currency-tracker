// @ts-nocheck
import { Themes } from '@root/types/enums';
import { Chart as ChartJs, registerables } from 'chart.js';
import {CandlestickController,
  CandlestickElement,
  OhlcController,
  OhlcElement,} from 'chartjs-chart-financial';

import 'chartjs-adapter-moment';

const customBorder = {
  id: 'customBorder',
  afterDatasetsDraw(chart) {
    const {
      ctx,
      chartArea: { top, bottom, left, right },
    } = chart;

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 2;

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

export const changeChart = (chart, theme) => {
  if (theme === Themes.Dark) {
    chart.options.scales.y.ticks.color = '#fff';
    chart.options.scales.y.grid.color = 'rgba(255,255,255,0.1)';
  } else {
    chart.options.scales.y.grid.color = 'rgba(0,0,0,0.1)';
    chart.options.scales.y.ticks.color = '#000';
  }
};

ChartJs.register(
  ...registerables,
  CandlestickElement,
  OhlcController,
  OhlcElement,
  CandlestickController,
  customBorder,
);

ChartJs.defaults.font = {
  family: 'Poppins, sans-serif',
  size: '12',
};

ChartJs.defaults.color = '#fff';
ChartJs.defaults.elements.candlestick = {
  color: {
    down: '#EA3943',
    up: '#16C782',
  },
  borderColor: {
    up: '#16C782',
    down: '#EA3943',
  },
};

export const borderConfig = {
  up: '#16C782',
  down: '#EA3943',
};

export const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  tooltips: {
    intersect: false,
    mode: 'nearest',
  },
  scales: {
    x: {
      type: 'time',
      offset: true,
      display: false,
      time: {
        unit: 'day',
      },
      ticks: {
        source: 'auto',
        beginAtZero: false,
      },
    },

    y: {
      stacked: false,
      type: 'linear',
      grace: '10%',
      title: {
        text: 'Value',
      },

      ticks: {
        stepSize: 500,
      },
    },
  },
};

