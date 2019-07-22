import React from 'react';
import { Card, Radio, Tooltip, Icon, Button } from 'antd';
import IconFont from 'src/iconfont';
import DownloadChart from './DownloadChart';

export default class MainCard extends React.Component {
    static defaultProps = {
        isShowTab: false,
        tab: 1,
    }
    render(){
        return (
            <Card
                bordered={this.props.bordered || true}
                className={this.props.className || ''}
                headStyle={this.props.headStyle || {}}
                bodyStyle={{border: 'none', ...this.props.bodyStyle || ''}}
                title={<div style={{fontSize: 16, fontWeight: 'bold'}}>{this.props.title}</div>}
                extra={this.props.extra || <React.Fragment>
                        {
                            this.props.isShowTab ? 
                            <Radio.Group value={this.props.tab || '1'} style={{marginRight:10}}>
                                <Tooltip placement="top" title={'图表'}>
                                    <Radio.Button value="1"><Icon type="bar-chart" theme="outlined" /></Radio.Button>
                                </Tooltip>
                                <Tooltip placement="top" title={'表格'}>
                                    <Radio.Button value="2"><Icon type="table" theme="outlined" /></Radio.Button>
                                </Tooltip>
                            </Radio.Group>:null
                        }
                        {
                            this.props.tab === 1 ?
                            <DownloadChart  {...(this.props.downloadChart || {})}>
                                <Tooltip placement="top" title={'导出'}>
                                    <Button theme="outlined" style={{padding:"0px 8px"}}>
                                        <IconFont type={'icon-daochu1'} />
                                    </Button>
                                </Tooltip>
                            </DownloadChart>:null
                        }
                    </React.Fragment>
                }
            >
                {this.props.children}
            </Card>
        )
    }
}