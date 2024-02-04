import { DateTime } from 'luxon';

function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const randomBar = (date: DateTime, lastClose: number) => {
  const open = +randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(2);
  const close = +randomNumber(open * 0.95, open * 1.05).toFixed(2);
  const high = +randomNumber(
    Math.max(open, close),
    Math.max(open, close) * 1.1,
  ).toFixed(2);
  const low = +randomNumber(
    Math.min(open, close) * 0.9,
    Math.min(open, close),
  ).toFixed(2);
  return {
    x: date.valueOf(),
    o: open,
    h: high,
    l: low,
    c: close,
  };
};

export function getRandomData(dateStr: string, count: number) {
  let date = DateTime.fromRFC2822(dateStr);
  const data = [randomBar(date, 30)];

  while (data.length < count) {
    date = date.plus({ days: 1 });
    if (date.weekday <= 7) {
      data.push(randomBar(date, data[data.length - 1].c));
    }
  }
  return data;
}

export function generateCandlestickData(days: number) {
  const startDate = new Date();
  const data = [];

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate as any);

    date.setDate(startDate.getDate() - i);

    const open = +randomNumber(4000 * 0.75, 4000 * 1.25).toFixed(2);
    const close = +randomNumber(open * 0.75, open * 1.25).toFixed(2);
    const high = +randomNumber(
      Math.max(open, close),
      Math.max(open, close) * 1.1,
    ).toFixed(2);
    const low = +randomNumber(
      Math.min(open, close) * 0.9,
      Math.min(open, close),
    ).toFixed(2);
    data.push({
      x: date,
      o: open,
      c: close,
      l: low,
      h: high,
    });
  }

  return data.reverse();
}

