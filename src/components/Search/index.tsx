import { Component, ReactNode } from 'react';

import Icon from '../Icon';

import styles from './Search.module.scss';

interface ISearchProps {
  value: string;
  onChange: (val: string) => void;
}

export class Search extends Component<ISearchProps, any> {
  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      search: this.props.value,
    };
  }

  onChangeValue = (val: string) => {
    this.setState({ search: val });
  };

  onSubmit = () => {
    this.props.onChange(this.state.search);
  };

  render(): ReactNode {
    const { search } = this.state;

    return (
      <div className={styles.root}>
        <input
          value={search}
          onChange={(e) => this.onChangeValue(e.target.value)}
          placeholder="Сurrency search..."
        />
        <button
          onClick={this.onSubmit}
          className={styles.searchBtn}
          type="button"
          data-testid="search-button"
        >
          <Icon width={24} height={24} iconName="search" />
          {}
        </button>
      </div>
    );
  }
}

