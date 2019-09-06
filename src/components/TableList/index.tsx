import React from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import styles from './index.scss';
import { Icon } from 'antd';
// @ts-ignore
@connect(({ global }) => ({
  global,
}))

// eslint-disable-next-line react/prefer-stateless-function,@typescript-eslint/class-name-casing
class TableList extends React.Component {
  render() {
    const { image, describition, date, place, state } = this.props;
    return (
      <div className={styles.tableListWrap}>
        <div className={styles.tableListContent}>
          <div className={styles.tableListContentLeft}>
            <img src={image} alt="" className={styles.tableListImage}/>
            <span className={styles.tableListDescribition}>
              {describition}
            </span>
          </div>
          <div className={styles.tableListFooter}>
            <span className={styles.tableListTag}>排查日期:</span>
            <span className={styles.tableListTag}>2019年6月1日</span>
            <span className={styles.tableListTag}>地点:</span>
            <span className={styles.tableListTag}>{place}</span>
            {
              !state ? <span style={{color: 'red'}}><Icon type="minus-circle" theme="filled" style={{color: 'red', marginRight: '5px'}} />待整改</span>
                : <span style={{color: 'green'}}><Icon type="check-circle" theme="filled" style={{color: 'green', marginRight: '5px'}} />已整改</span>
            }
          </div>
        </div>
        <div className={styles.tableListContentRight}>
          <div className={styles.tableListButtonGroup}>
            <span className={styles.tableListButton}><Icon type="edit" style={{fontSize: '20px'}}/><span>编辑</span></span>
            <span className={styles.tableListButton}><Icon type="close-circle" style={{fontSize: '20px'}} /><span>删除</span></span>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(({ global }: ConnectState) => ({}))(TableList);
