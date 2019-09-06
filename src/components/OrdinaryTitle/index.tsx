import React from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import styles from './index.scss';
import { Breadcrumb } from 'antd';

// @ts-ignore
@connect(({ global }) => ({
  global,
}))

// eslint-disable-next-line react/prefer-stateless-function,@typescript-eslint/class-name-casing
class OrdinaryTitle extends React.Component {

  render() {
    const { linkArray, titleName } = this.props;
    return (
      <div className={styles.ordinaryTitleWrap}>
        <Breadcrumb>
          {
            linkArray.map( (item) => {
              const { linkName, linkUrl } = item;
              return (
                <Breadcrumb.Item>
                  {
                    <a href={linkUrl}>{linkName}</a>
                  }
                </Breadcrumb.Item>
              )
            })
          }
        </Breadcrumb>
        <div className={styles.ordinaryTitle}>{titleName}</div>
      </div>
    );
  }
}
export default connect(({ global }: ConnectState) => ({}))(OrdinaryTitle);
