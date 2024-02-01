import { Component } from 'react';
import { Button } from '@root/components/Button';
import Field from '@root/components/Field';
import { chartService } from '@root/services/chartService';

import styles from './EditChartModal.module.scss';

interface IEditChartModalProps {
  day: number;
  open: number;
  high: number;
  low: number;
  close: number;
  onClose: () => void;
}

export class EditChartModal extends Component<IEditChartModalProps, any> {
  constructor(props: IEditChartModalProps) {
    super(props);
    this.state = {
      open: props.open,
      low: props.low,
      high: props.high,
      close: props.close,
    };
  }

  stockFields = () => {
    const { open, close, high, low } = this.state;
    return [
      {
        value: open,
        placeholder: 'open',
        onChange: (value: string) => this.setState({ open: +value }),
      },
      {
        value: close,
        placeholder: 'close',
        onChange: (value: string) => this.setState({ close: +value }),
      },
      {
        value: high,
        placeholder: 'high',
        onChange: (value: string) => this.setState({ high: +value }),
      },
      {
        value: low,
        placeholder: 'low',
        onChange: (value: string) => this.setState({ low: +value }),
      },
    ];
  };

  onSumbit = () => {
    const { open: o, low: l, high: h, close: c } = this.state;
    const { day, onClose } = this.props;
    chartService.changeDataPerDay(day, { o, h, l, c });
    onClose();
  };

  onRemove = () => {
    const { day, onClose } = this.props;
    chartService.removeDay(day);
    onClose();
  };

  render() {
    const { day } = this.props;

    return (
      <div className={styles.root}>
        <h2>Current day {day}</h2>
        {this.stockFields().map(
          (field) => (
            <Field
              key={field.placeholder}
              value={field.value}
              placeholder={field.placeholder}
              onChange={field.onChange}
            />
          ),
          this,
        )}
        <Button variant="success" onClick={this.onSumbit}>
          Submit
        </Button>
        <Button variant="decline" onClick={this.onRemove}>
          Remove
        </Button>
      </div>
    );
  }
}
