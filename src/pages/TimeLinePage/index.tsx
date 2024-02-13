import { Component, createRef } from 'react';
import { Chart } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { Select } from '@components/Select';
import { Toast } from '@components/Toast';
import { getCurrencies } from '@root/api/currencies';
import { Button } from '@root/components/Button';
import { Modal } from '@root/components/Modal';
import { colors, getOptions } from '@root/pages/TimeLinePage/chartConfig';
import {
  changeCurrency,
  changeDataPerDay,
  generateData,
  removeDay,
} from '@root/store/slices/chartSlice';
import { toggleModal } from '@root/store/slices/globalSlice';
import { AppDispatch, RootState } from '@root/store/store';
import { observable } from '@root/utils/observer';
import { Chart as ChartJs } from 'chart.js';

import { EditChartModal } from './EditChartModal';
import { text } from './TimeLine.config';
import {
  ITimeLinePageProps,
  ITimeLinePageState,
} from './TimeLinePage.interface';

import styles from './TimeLine.module.scss';

class TimeLinePage extends Component<ITimeLinePageProps, ITimeLinePageState> {
  chartRef = createRef<HTMLCanvasElement>();

  constructor(props: ITimeLinePageProps) {
    super(props);

    this.state = {
      selectedDay: null,
    };
  }

  componentDidMount(): void {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
    observable.subscribe(() => this.generateRandomData);
  }

  componentWillUnmount(): void {
    observable.unsubscribe(() => this.generateRandomData);
    const chart = ChartJs.getChart(this.chartRef.current as HTMLCanvasElement);
    chart?.destroy();
  }

  handleClickChart = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    const chart = ChartJs.getChart(this.chartRef.current as HTMLCanvasElement);
    const chartData = chart?.getElementsAtEventForMode(
      event as unknown as Event,
      'nearest',
      {
        intersect: false,
      },
      true,
    )[0];
    if (!chartData) return;

    const elementIndex = chartData.index;

    const { data, activeCurrency } = this.props;
    this.props.toggleModal();
    this.setState({
      selectedDay: {
        day: elementIndex + 1,
        open: data[activeCurrency][elementIndex].o,
        close: data[activeCurrency][elementIndex].c,
        high: data[activeCurrency][elementIndex].h,
        low: data[activeCurrency][elementIndex].l,
      },
    });
  };

  onChangeCurrency = (val: string) => {
    this.props.setCurrency(val);
  };

  handleCloseModal = () => {
    this.props.toggleModal();
  };

  generateRandomData = () => {
    this.props.generateData();

    observable.notify(text.successChartBuilded);
  };

  render() {
    const { selectedDay } = this.state;
    const {
      currencies,
      data,
      deleteData,
      changeDayData,
      theme,
      activeCurrency,
      showModal,
    } = this.props;

    const options = getOptions(theme);
    const chartData = Array.from(data[activeCurrency] ?? []);

    const { random, editChart } = text;

    return (
      <div data-testid="timeline-page" className={styles.chart}>
        <div className={styles.topBar}>
          <div className={styles.select}>
            <Select
              value={activeCurrency}
              onChange={this.onChangeCurrency}
              options={currencies.map((currency) => ({
                label: currency.title,
                value: currency.code,
              }))}
            />
          </div>
          <Button
            testId="random-button"
            variant="success"
            onClick={this.generateRandomData}
          >
            {random}
          </Button>
        </div>
        {showModal && selectedDay && (
          <Modal onClose={this.handleCloseModal} title={editChart}>
            <EditChartModal
              onClose={this.handleCloseModal}
              onRemove={deleteData}
              onChange={changeDayData}
              day={selectedDay.day}
              open={selectedDay.open}
              close={selectedDay.close}
              high={selectedDay.high}
              low={selectedDay.low}
            />
          </Modal>
        )}
        <Toast />
        <div data-testid="chart-wrapper" className={styles.chartWrapper}>
          {data[activeCurrency] && data[activeCurrency].length ? (
            <Chart
              type="candlestick"
              width={500}
              ref={this.chartRef as any}
              options={options}
              onClick={this.handleClickChart}
              data={{
                datasets: [
                  {
                    data: chartData,
                    color: colors.color,
                    borderColor: colors.borderColor,
                  },
                ] as any,
              }}
            />
          ) : (
            <h1>Empty chart</h1>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  currencies: state.currency.currencies,
  theme: state.global.theme,
  showModal: state.global.showModal,
  data: state.chart.data,
  activeCurrency: state.chart.activeCurrency,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchCurrencies: () => dispatch(getCurrencies()),
  generateData: () => dispatch(generateData()),
  deleteData: (day: number) => dispatch(removeDay({ day })),
  changeDayData: (day: number, data: IChartData) =>
    dispatch(changeDataPerDay({ day, data })),
  setCurrency: (currency: string) => dispatch(changeCurrency({ currency })),
  toggleModal: () => dispatch(toggleModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeLinePage);
