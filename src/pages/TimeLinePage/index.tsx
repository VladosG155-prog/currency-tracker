import { Component, createRef } from 'react';
import { Chart } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { Select } from '@components/Select';
import { Toast } from '@components/Toast';
import text from '@constants/text.json';
import { Button } from '@root/components/Button';
import { Modal } from '@root/components/Modal';
import { colors, getOptions } from '@root/pages/TimeLinePage/chartConfig';
import {
  changeCurrency,
  changeDataPerDay,
  generateData,
  removeDay,
} from '@root/store/slices/chartSlice';
import { getCurrencies } from '@root/store/slices/currencySlice';
import { toggleModal } from '@root/store/slices/globalSlice';
import { AppDispatch, RootState } from '@root/store/store';
import { Themes } from '@root/types/enums';
import { observable } from '@root/utils/observer';
import { Chart as ChartJs } from 'chart.js';

import { EditChartModal } from './EditChartModal';

import styles from './TimeLine.module.scss';

interface ITimeLinePageProps {
  theme: Themes;
  data: {
    [key: string]: IChartData[];
  };
  generateData: () => void;
  deleteData: (day: number) => void;
  changeDayData: (day: number, data: IChartData) => void;
  currencies: Currency[];
  fetchCurrencies: () => void;
  setCurrency: (currency: string) => void;
  activeCurrency: string;
  showModal: boolean;
  toggleModal: () => void;
}

class TimeLinePage extends Component<ITimeLinePageProps, any> {
  chartRef = createRef<HTMLCanvasElement | CanvasRenderingContext2D | string>();

  constructor(props: ITimeLinePageProps) {
    super(props);

    this.state = {
      selectedDay: {},
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

    observable.notify(text.shared.timeline.successChartBuilded);
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

    const dataSets = {
      datasets: [
        {
          data: data[activeCurrency],
          color: colors.color,
          borderColor: colors.borderColor,
        },
      ],
    };

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
            {text.shared.buttons.random}
          </Button>
        </div>
        {showModal && (
          <Modal
            onClose={this.handleCloseModal}
            title={text.shared.modals.editChart}
          >
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
          {data[activeCurrency] ? (
            <Chart
              type="candlestick"
              width={500}
              ref={this.chartRef as any}
              options={options}
              onClick={this.handleClickChart}
              data={dataSets as any}
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
