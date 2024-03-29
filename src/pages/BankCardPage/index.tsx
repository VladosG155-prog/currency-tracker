import { Component, Fragment, ReactNode } from 'react';
import { Map, Popup } from 'react-map-gl';
import { connect } from 'react-redux';
import mapData from '@constants/mapdata.json';
import { getCurrencies } from '@root/api/currencies';
import { Search } from '@root/components/Search';
import { Themes } from '@root/constants/enums';
import { AppDispatch, RootState } from '@root/store/store';
import { optionsMapper } from '@root/utils/optionsMapper';

import { text } from './BankCardPage.config';
import {
  IBankCardPageProps,
  IBankCardPageState,
} from './BankCardPage.interface';
import { MapMarker } from './MapMarker';

import styles from './BankCardPage.module.scss';

class BankCardPage extends Component<IBankCardPageProps, IBankCardPageState> {
  constructor(props: IBankCardPageProps) {
    super(props);
    this.state = {
      popupInfo: null,
      selectedCurrency: 'USD',
    };
  }

  componentDidMount(): void {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  changeSelectedCurrency = (val: string) => {
    this.setState({ selectedCurrency: val });
  };

  render(): ReactNode {
    const { selectedCurrency, popupInfo } = this.state;
    const { theme, currencies } = this.props;
    const options = currencies.map(optionsMapper);

    const data = mapData[selectedCurrency as keyof typeof mapData];

    const { search } = text;

    return (
      <>
        <div data-testid="bankcard-page" className={styles.top}>
          <h2>{search}</h2>
          <Search
            value={selectedCurrency}
            onChange={this.changeSelectedCurrency}
            options={options}
          />
        </div>
        <div className={styles.map}>
          <Map
            mapboxAccessToken={process.env.MAP_TOKEN}
            initialViewState={{
              longitude: 30.995726271961736,
              latitude: 52.42159941323625,
              zoom: 12,
            }}
            mapStyle={
              theme === Themes.Dark
                ? 'mapbox://styles/mapbox/light-v11'
                : 'mapbox://styles/mapbox/dark-v11'
            }
          >
            {data.map((marker) => (
              <Fragment key={marker.id}>
                <MapMarker
                  title={marker.title}
                  description={marker.description}
                  image={marker.image}
                  longitude={marker.longitude}
                  latitude={marker.latitude}
                  onClick={(info) => this.setState({ popupInfo: info })}
                />
                {popupInfo && (
                  <Popup
                    anchor="top"
                    longitude={Number(popupInfo.longitude)}
                    latitude={Number(popupInfo.latitude)}
                    onClose={() => this.setState({ popupInfo: null })}
                    className={styles.popup}
                  >
                    <div>
                      <h1>{popupInfo.title}</h1>
                      <p>{popupInfo.description}</p>
                    </div>
                    <img
                      width="100%"
                      height={100}
                      src={popupInfo.image}
                      alt=""
                    />
                  </Popup>
                )}
              </Fragment>
            ))}
          </Map>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  theme: state.global.theme,
  currencies: state.currency.currencies,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchCurrencies: () => dispatch(getCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BankCardPage);
