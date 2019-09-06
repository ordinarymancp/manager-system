import React from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import OrdinaryTitle from '@/components/OrdinaryTitle'
import TableList from '@/components/TableList'
import styles from './index.scss';
import { Tabs, DatePicker  } from 'antd';

// @ts-ignore
@connect(({ global }) => ({
  global,
}))

// eslint-disable-next-line react/prefer-stateless-function,@typescript-eslint/class-name-casing
class environmental extends React.Component {

  render() {
    const { RangePicker } = DatePicker;
    const dataSource = [
      {
        image: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
        describition: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        date: 11111,
        place: '废渣仓库',
        state: false,
      },
      {
        image: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
        describition: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        date: 11111,
        place: '废渣仓库',
        state: true,
      },
      {
        image: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
        describition: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        date: 11111,
        place: '废渣仓库',
        state: true,
      },
    ]
    const ordinaryTitleContent = {
      titleName: '环保隐患排查管理',
      linkArray: [
        {linkName: '主页', linkUrl: '/'},
        {linkName: '环保隐患排查管理', linkUrl: ''},
        ]
    }
    return (
      <div className={styles.environmentalWrap}>
        <OrdinaryTitle {...ordinaryTitleContent}/>
        <div className={styles.environmentalContent}>
          <div className={styles.environmentalSearch}>
            {/*<div className={styles.environmentalSearchLine}>*/}

            {/*</div>*/}
            <div className={styles.environmentalSearchLine}>
              <div className={styles.environmentalSearchLineTitle}>
                排查日期:
              </div>
              <div style={{flex: '1 1'}}>
                <span className={styles.environmentalSearchTag}>近一周</span>
                <span className={styles.environmentalSearchTag}>近一个月</span>
                <span className={styles.environmentalSearchTag}>近一年</span>
                <span className={styles.environmentalSearchTag}>
                  <span style={{marginRight: '10px'}}>自定义</span>
                  <RangePicker/>
                </span>
              </div>
            </div>
            <div className={styles.environmentalSearchLine} style={{ border: 'none'}}>
              <div className={styles.environmentalSearchLineTitle}>
                整改状态:
              </div>
              <div style={{flex: '1 1'}}>
                <span className={styles.environmentalSearchTag}>待整改</span>
                <span className={styles.environmentalSearchTag}>已整改</span>
              </div>
            </div>
          </div>
          <div className={styles.environmentalSearch} style={{marginTop: '30px'}}>
            {
              dataSource.map(item => {
                return(
                  <TableList {...item}/>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
}
export default connect(({ global }: ConnectState) => ({}))(environmental);
