import { FC, useState } from 'react';
import { Icon } from '@root/components/Icon';
import classNames from 'classnames';

import styles from './FooterTab.module.scss';

interface IFooterTabProps {
  title: string;
  tabs: string[];
  isTablet: boolean;
}

export const FooterTab: FC<IFooterTabProps> = ({ title, tabs, isTablet }) => {
  const renderList = (list: string[]) =>
    list.map((listItem) => <p key={listItem}>{listItem}</p>);

  const [isShowTab, setIsShowTab] = useState(false);

  const toggleTab = () => {
    setIsShowTab((prev) => !prev);
  };

  return (
    <div className={styles.column} onClick={isTablet ? toggleTab : () => null}>
      <h2>
        {title}
        {isTablet && (
          <div
            className={classNames(styles.icon, {
              [styles.active]: isShowTab,
            })}
          >
            <Icon iconName="angle-down" />
          </div>
        )}
      </h2>
      {!isTablet ? renderList(tabs) : isShowTab && renderList(tabs)}
    </div>
  );
};

