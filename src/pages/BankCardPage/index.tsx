// @ts-nocheck
import { Component, ReactNode } from 'react';
import { Map, Marker, Popup } from 'react-map-gl';
import { connect } from 'react-redux';
import mapData from '@constants/mapdata.json';
import { Icon } from '@root/components/Icon';
import { Search } from '@root/components/Search';
import { getCurrencies } from '@root/store/slices/currencySlice';
import { Themes } from '@root/types/enums';
import { optionsMapper } from '@root/utils/optionsMapper';

import styles from './BankCardPage.module.scss';

class BankCardPage extends Component {
  constructor() {
    super();
    this.state = {
      popupInfo: null,
      selectedCurrency: 'USD',
    };
  }

  componentDidMount(): void {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  changeSelectedCurrency = (val) => {
    this.setState({ selectedCurrency: val });
  };

  render(): ReactNode {
    const { popupInfo, selectedCurrency } = this.state;
    const { theme, currencies } = this.props;
    const options = currencies.map(optionsMapper);

    return (
      <>
        <div data-testid="bankcard-page" className={styles.top}>
          <h2>Search currency in the bank</h2>
          <Search
            value={selectedCurrency}
            onChange={this.changeSelectedCurrency}
            options={options}
          />
        </div>
        <div className={styles.map}>
          <Map
            mapboxAccessToken="pk.eyJ1IjoidmxhZG9zZzE1NSIsImEiOiJjbHMzajM5bGUwc2FyMm5yd3Nmb25najhxIn0.i4DiJJ6_3snwgYzclLTqew"
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
            {mapData[selectedCurrency] ? (
              <>
                {mapData[selectedCurrency].map((marker) => (
                  <Marker
                    anchor="top"
                    key={marker.id}
                    latitude={marker.latitude}
                    longitude={marker.longitude}
                    onClick={(e) => {
                      e.originalEvent.stopPropagation();
                      this.setState({ popupInfo: marker });
                    }}
                  >
                    <Icon iconName="marker" />
                  </Marker>
                ))}
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
              </>
            ) : (
              <h2>Some Wrong!!</h2>
            )}
          </Map>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.global.theme,
  currencies: state.currency.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(getCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BankCardPage);

