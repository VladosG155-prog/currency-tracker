import { ChangeEvent, Component, ReactNode } from 'react';

import { Icon } from '../Icon';

import { ISearchProps, ISearchState } from './Search.interface';

import styles from './Search.module.scss';

export class Search extends Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      search: props.value,
      hideOptions: false,
    };
  }

  componentDidMount(): void {}

  onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: e.target.value });
  };

  onClickOption = (code: string) => () => {
    this.setState({ search: code, hideOptions: false }, this.onSubmit);
  };

  onSubmit = () => {
    const { onChange } = this.props;
    const { search } = this.state;
    onChange(search);
    this.setState({ hideOptions: false });
  };

  showOptions = () => {
    this.setState({ hideOptions: true });
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
          onClick={this.showOptions}
          onChange={this.onChangeValue}
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
              newOptions.map(({ value, label }) => (
                <p onClick={this.onClickOption(value)} key={value}>
                  {label}
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
