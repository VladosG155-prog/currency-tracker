import { PureComponent, ReactNode } from 'react';
import { Marker } from 'react-map-gl';
import { Icon } from '@root/components/Icon';

export interface IPopupInfo {
  title: string;
  description: string;
  image: string;
  longitude: number;
  latitude: number;
}

interface IMapMarker {
  latitude: number;
  longitude: number;
  image: string;
  description: string;
  title: string;
  onClick: (data: IPopupInfo) => void;
}

export class MapMarker extends PureComponent<IMapMarker> {
  render(): ReactNode {
    const { latitude, longitude, image, title, description, onClick } =
      this.props;
    return (
      <Marker
        anchor="top"
        latitude={latitude}
        longitude={longitude}
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          onClick({
            title,
            description,
            image,
            latitude,
            longitude,
          });
        }}
      >
        <Icon iconName="marker" />
      </Marker>
    );
  }
}
