import { Component, ReactNode, createRef } from 'react';

import { Icon } from '../Icon';

import styles from './Search.module.scss';

interface ISearchProps {
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
}

export class Search extends Component<ISearchProps, any> {
  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      search: this.props.value,
      hideOptions: false,
    };
  }

  componentDidMount(): void {}

  onChangeValue = (val: string) => {
    this.setState({ search: val });
  };

  onClickOption = (code: string) => () => {
    this.setState({ search: code, hideOptions: false }, this.onSubmit);
  };

  onSubmit = () => {
    this.props.onChange(this.state.search);
    this.setState({ hideOptions: false });
  };

  render(): ReactNode {
    const { search, hideOptions } = this.state;
    const { options } = this.props;

    const newOptions = options.filter(
      (option) =>
        option.label.toLowerCase().includes(search.toLowerCase()) ||
        option.value.toLowerCase().includes(search.toLowerCase()),
    );

    return (
      <div className={styles.root}>
        <input
          value={search}
          onClick={() => this.setState({ hideOptions: true })}
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
        </button>
        {hideOptions && (
          <div className={styles.searchOptions}>
            {newOptions.length > 0 ? (
              newOptions.map((option) => (
                <p
                  onClick={this.onClickOption(option.value)}
                  key={option.value}
                >
                  {option.label}
                </p>
              ))
            ) : (
              <p>No results found</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

