// @ts-nocheck
import { Component, createRef } from 'react';
import { Chart } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { Select } from '@components/Select';
import Toast from '@components/Toast';
import { borderConfig, options } from '@constants/chartConfig';
import { Button } from '@root/components/Button';
import Modal from '@root/components/Modal';
import { chartService } from '@root/services/chartService';
import { getCurrencies } from '@root/store/slices/currencySlice';
import { Chart as ChartJs } from 'chart.js';

import { EditChartModal } from './EditChartModal';

import styles from './TimeLine.module.scss';

class TimeLinePage extends Component<{}, any> {
  constructor(props: any) {
    super(props);
    this.chartRef = createRef();
    this.state = {
      showToast: false,
      activeCurrency: 'USD',
      showChartModal: false,
      selectedDay: {},
    };
  }

  componentDidMount(): void {
    const { fetchCurrencies } = this.props;

    fetchCurrencies();

    chartService.observer.subscribe(() => this.generateRandomData);
  }

  componentWillUnmount(): void {
    chartService.observer.unSubscribe(() => this.generateRandomData);
  }

  handleClickChart = (event) => {
    const chart = ChartJs.getChart(this.chartRef.current);

    const data = chart?.getElementsAtEventForMode(event, 'nearest', {
      interserct: false,
    })[0];

    const elementIndex = data.index;

    if (!data) return;
    this.setState({
      showChartModal: true,
      selectedDay: {
        day: data.index + 1,
        open: chartService.data[elementIndex].o,
        close: chartService.data[elementIndex].c,
        high: chartService.data[elementIndex].h,
        low: chartService.data[elementIndex].l,
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

  onHideToast = () => {
    this.setState({ showToast: false });
  };

  onShowToast = () => {
    this.setState({ showToast: true });
  };

  generateRandomData = () => {
    this.onShowToast();
    chartService.handleGenerate();
  };

  render() {
    const { showToast, activeCurrency, showChartModal, selectedDay } =
      this.state;
    const { currencies } = this.props;
    return (
      <div className={styles.chart}>
        <Select
          value={activeCurrency}
          onChange={this.onChangeCurrency}
          options={currencies.map((currency) => ({
            label: currency.title,
            value: currency.code,
          }))}
        />
        {showChartModal && (
          <Modal onClose={this.handleCloseModal} title="Edit currency by day">
            <EditChartModal
              onClose={this.handleCloseModal}
              day={selectedDay.day}
              open={selectedDay.open}
              close={selectedDay.close}
              high={selectedDay.high}
              low={selectedDay.low}
            />
          </Modal>
        )}
        {showToast && (
          <Toast
            onClose={this.onHideToast}
            title="The chart was successfully created"
          />
        )}
        <Button variant="success" onClick={this.generateRandomData}>
          Random data
        </Button>
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
                data: chartService.data,
                borderColor: borderConfig,
              },
            ],
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ currencies: state.currency.currencies });

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(getCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeLinePage);

