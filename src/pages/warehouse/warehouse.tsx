import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from "dva";
import { Table, Button, Modal, Form , Row, Col, Input} from "antd";
import { ConnectState } from "@/models/connect";
import QueryForm from '@/components/QueryForm/index'
import router from "umi/router";
@connect(({ global }) => ({
  global,
}))

// eslint-disable-next-line react/prefer-stateless-function
class Warehouse extends React.Component {
  componentDidMount() {
    console.log(this.props.loginable)
    if(!this.props.loginable){
      router.push('/login')
    }
  }
  state = { visible: false, record: {}, selectedRowKeys: [], loading: false, checkBoxabled:false};
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
   checkboxDis = () => {
    this.setState({checkBoxabled: !this.state.checkBoxabled})
  }
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  del = key => () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/delTableData',
      state: this.state,
      payload: this.props.dataSource,
      key: parseInt(key),
    })
    console.log(this.props)
  }
  change = record => () => {
    console.log(record)
    this.setState({
      visible: true,
      record: record,
    });
  }
  onChangeState = () => {
    this.setState({visible : false})
  }
  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const {
      global:{data},
    } = this.props;
    console.log(this.props)
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
        <a href="javascript:;" style={{marginRight:'5px'}} onClick={this.change(record)}>Invite</a>
        <a href="javascript:;" onClick={this.del(record.key)}>Delete</a>
      </span>
        ),
      },
    ]

    return (
      <div style={{ background: 'white' }}>
        <PageHeaderWrapper></PageHeaderWrapper>
        <div style={{ margin: '0 -24px 0',  background: 'white' }}>
          <div style={{marginBottom:'10px'}}>
            <Button type="primary" style={{marginLeft:'10px'}} onClick={this.showModal}>新增</Button>
            <Button type="primary" style={{marginLeft:'10px'}} onClick={this.checkboxDis}>删除</Button>
            <Modal
              title="Basic Modal"
              visible={this.state.visible}
              onCancel={this.handleCancel}
            >
              <QueryForm visible={this.state.visible} onChangeState={this.onChangeState.bind(this)} record={this.state.record}></QueryForm>
            </Modal>
          </div>
          <Table dataSource={this.props.dataSource } columns={columns} rowSelection={this.state.checkBoxabled ? rowSelection : undefined}/>
        </div>
      </div>
    );
  }
}
export default connect(({ global }: ConnectState) => ({
  collapsed: global.collapsed,
  page: global.page,
  notices: global.notices,
  dataSource: global.dataSource,
  loginable: global.loginable,
}))(Warehouse);
