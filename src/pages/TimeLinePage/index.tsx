// @ts-nocheck
import { Component, createRef } from 'react';
import { Chart } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { Select } from '@components/Select';
import { Toast } from '@components/Toast';
import { borderConfig, changeChart, options } from '@constants/chartConfig';
import text from '@constants/text.json';
import { Button } from '@root/components/Button';
import { Modal } from '@root/components/Modal';
import {
  changeDataPerDay,
  generateData,
  removeDay,
} from '@root/store/slices/chartSlice';
import { getCurrencies } from '@root/store/slices/currencySlice';
import { observable } from '@root/utils/observer';
import { Chart as ChartJs } from 'chart.js';

import { EditChartModal } from './EditChartModal';

import styles from './TimeLine.module.scss';

class TimeLinePage extends Component<{}, any> {
  constructor(props: any) {
    super(props);
    this.chartRef = createRef();
    this.state = {
      activeCurrency: 'USD',
      showChartModal: false,
      selectedDay: {},
    };
  }

  componentDidMount(): void {
    const { fetchCurrencies } = this.props;

    fetchCurrencies();
    observable.subscribe(() => this.generateRandomData);
  }

  componentDidUpdate(): void {
    const { theme } = this.props;

    const chart = ChartJs.getChart(this.chartRef.current);

    changeChart(chart, theme);

    chart.update();
  }

  componentWillUnmount(): void {
    observable.unsubscribe(() => this.generateRandomData);
  }

  handleClickChart = (event) => {
    const chart = ChartJs.getChart(this.chartRef.current);

    const chartData = chart?.getElementsAtEventForMode(event, 'nearest', {
      interserct: false,
    })[0];
    if (!chartData) return;

    const elementIndex = chartData.index;

    this.setState({
      showChartModal: true,
      selectedDay: {
        day: chartData.index + 1,
        open: this.props.data[elementIndex].o,
        close: this.props.data[elementIndex].c,
        high: this.props.data[elementIndex].h,
        low: this.props.data[elementIndex].l,
      },
    });
  };

  onChangeCurrency = (val: string) => {
    this.setState({ activeCurrency: val });
    this.generateRandomData();
  };

  handleCloseModal = () => {
    this.setState({ showChartModal: false });
  };

  generateRandomData = () => {
    this.props.generateData();

    observable.notify(text.shared.timeline.successChartBuilded);
  };

  render() {
    const { activeCurrency, showChartModal, selectedDay } = this.state;
    const { currencies, data, deleteData, changeDayData } = this.props;

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
        {showChartModal && (
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

        <Chart
          type="candlestick"
          width={500}
          ref={this.chartRef}
          options={options}
          onClick={this.handleClickChart}
          data={{
            datasets: [
              {
                type: 'candlestick',
                data,
                borderColor: borderConfig,
              },
            ],
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.currency.currencies,
  theme: state.global.theme,
  data: state.chart.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(getCurrencies()),
  generateData: () => dispatch(generateData()),
  deleteData: (day) => dispatch(removeDay({ day })),
  changeDayData: (day, data) => dispatch(changeDataPerDay({ day, data })),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeLinePage);

