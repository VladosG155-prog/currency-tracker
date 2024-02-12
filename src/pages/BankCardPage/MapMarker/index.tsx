import { PureComponent, ReactNode } from 'react';
import { Marker } from 'react-map-gl';
import { MarkerEvent, MarkerInstance } from 'react-map-gl/dist/esm/types';
import { Icon } from '@root/components/Icon';

import { IMapMarker } from './MapMarker.interface';

export class MapMarker extends PureComponent<IMapMarker> {
  handleSetMarker = (e: MarkerEvent<MarkerInstance, MouseEvent>) => {
    const { latitude, longitude, image, title, description, onClick } =
      this.props;
    if (e.originalEvent) {
      e.originalEvent.stopPropagation();
    }

    onClick({
      title,
      description,
      image,
      latitude,
      longitude,
    });
  };

  render(): ReactNode {
    const { latitude, longitude } = this.props;
    return (
      <Marker
        anchor="top"
        latitude={latitude}
        longitude={longitude}
        onClick={(e) => this.handleSetMarker(e)}
      >
        <Icon iconName="marker" />
      </Marker>
    );
  }
}
