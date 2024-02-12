import { Component } from 'react';
import { Button } from '@root/components/Button';
import { Field } from '@root/components/Field';
import { observable } from '@root/utils/observer';
import { validationNumber } from '@root/utils/validation';

import {
  IEditChartModalProps,
  IEditChartModalState,
} from './EditChartModal.interface';

import styles from './EditChartModal.module.scss';

export class EditChartModal extends Component<
  IEditChartModalProps,
  IEditChartModalState
> {
  constructor(props: IEditChartModalProps) {
    super(props);
    this.state = {
      open: props.open,
      low: props.low,
      high: props.high,
      close: props.close,
    };
  }

  componentDidMount(): void {
    observable.subscribe(() => this.onRemove);
  }

  stockFields = () => {
    const { open, close, high, low } = this.state;
    return [
      {
        value: open,
        placeholder: 'open',
        onChange: (value: string) => this.setState({ open: +value }),
        error: validationNumber(open, 1, 10000),
      },
      {
        value: close,
        placeholder: 'close',
        onChange: (value: string) => this.setState({ close: +value }),
        error: validationNumber(close, 1, 10000),
      },
      {
        value: high,
        placeholder: 'high',
        onChange: (value: string) => this.setState({ high: +value }),
        error: validationNumber(high, 1, 10000),
      },
      {
        value: low,
        placeholder: 'low',
        onChange: (value: string) => this.setState({ low: +value }),
        error: validationNumber(low, 1, 10000),
      },
    ];
  };

  onSumbit = () => {
    const { open: o, low: l, high: h, close: c } = this.state;
    const { day, onClose, onChange } = this.props;
    onChange(day, {
      o,
      h,
      l,
      c,
    } as IChartData);
    onClose();
    observable.notify(`The ${day} day was successfuly edited`);
  };

  onRemove = () => {
    const { day, onClose, onRemove } = this.props;
    onRemove(day);
    onClose();
    observable.notify(`The ${day} day was successfuly removed`);
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
              value={String(field.value)}
              placeholder={field.placeholder}
              onChange={field.onChange}
              error={field.error}
              inputType="number"
            />
          ),
          this,
        )}
        <div className={styles.btns}>
          <Button variant="success" onClick={this.onSumbit}>
            Submit
          </Button>
          <Button variant="decline" onClick={this.onRemove}>
            Remove
          </Button>
        </div>
      </div>
    );
  }
}
