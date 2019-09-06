import { Reducer } from 'redux';
import React from 'react';
import { Subscription } from 'dva';

import { Effect } from './connect.d';
import { NoticeIconData } from '@/components/NoticeIcon';
import { queryNotices } from '@/services/user';
import router from "umi/router";

export interface NoticeItem extends NoticeIconData {
  id: string;
  type: string;
  status: string;
}

export interface GlobalModelState {
  page: number;
  collapsed: boolean;
  notices: NoticeItem[];
  dataSource : any;
  loginable: boolean
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    fetchNotices: Effect;
    clearNotices: Effect;
    changeNoticeReadState: Effect;
  };
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
    saveNotices: Reducer<GlobalModelState>
    delTableData: Reducer<GlobalModelState>
    addTableData: Reducer<GlobalModelState>
    saveClearedNotices: Reducer<GlobalModelState>;
    loginData:Reducer<GlobalModelState>;
  };
  subscriptions: { setup: Subscription };
}

// @ts-ignore
const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    page: 0,
    collapsed: false,
    notices: [],
    loginable: false,
    dataSource: [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
      {
        key: '4',
        name: '1',
        age: '12',
        address: '3',
      },
      ],
  },

  effects: {
    *fetchNotices(_, { call, put, select }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      const unreadCount: number = yield select(
        state => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count: number = yield select(state => state.global.notices.length);
      const unreadCount: number = yield select(
        state => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },
    *changeNoticeReadState({ payload }, { put, select }) {
      const notices: NoticeItem[] = yield select(state =>
        state.global.notices.map(item => {
          const notice = { ...item };
          if (notice.id === payload) {
            notice.read = true;
          }
          return notice;
        }),
      );

      yield put({
        type: 'saveNotices',
        payload: notices,
      });

      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter(item => !item.read).length,
        },
      });
    },
  },

  reducers: {
    loginData(state,{ payload }): GlobalModelState {
      console.log(payload)
      return {
        ...state,
        loginable: payload,
      };
    },
    changeLayoutCollapsed(state = { notices: [], collapsed: true }, { payload }): GlobalModelState {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }): GlobalModelState {
      console.log(state, payload)
      return {
        collapsed: false,
        ...state,
        notices: payload,
      };
    },
    delTableData(state, { payload, key}): GlobalModelState {
      console.log(state, payload, key)
      return {
        dataSource: state.dataSource.filter((item): boolean => parseInt(item.key) !== key),
      };
    },
    addTableData(state, { payload}): GlobalModelState {
      console.log(state, payload)
      state.dataSource.push(payload)
      return {
        dataSource: state.dataSource,
      };
    },
    saveClearedNotices(state = { notices: [], collapsed: true }, { payload }): GlobalModelState {
      return {
        collapsed: false,
        ...state,
        notices: state.notices.filter((item): boolean => item.type !== payload),
      };
    },
  },

  subscriptions: {
    setup({ history }): void {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }): void => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};

export default GlobalModel;
