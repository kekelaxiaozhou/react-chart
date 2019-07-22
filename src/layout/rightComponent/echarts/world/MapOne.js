import React, { Component } from 'react';
import echarts from 'echarts';
import 'echarts/map/js/world';
import worldGeo from './world'
import { Card, Button } from 'antd';
import IconFont from 'src/iconfont';

export default class MapOne extends Component {
    state = {
        myChart: null,
        data: [
            {name: "印度尼西亚", value: 10},
            {name: "哈萨克斯坦", value: 5},
            {name: "塔吉克斯坦", value: 9},
            {name: "多哥", value: 6},
            {name: "韩国", value: 8},
            {name: "科摩罗", value: 20}
        ]
    };

    componentDidMount(){
        setTimeout(() => { //避免刷新之后宽度不对
            let chart = echarts.init(document.getElementById('MapOne'));
            this.setState({
                myChart: chart
            }, () => {
                this.setMap();
            })
        }, 10)
    }

    setMap(){

        //地区与株洲关联
        let relevance  = this.state.data.map(item=>{
            return {
                "fromName": item.name,
                "toName": "株洲市",
                'coords': [
                    worldGeo.getCoord(item.name),
                    [113.131695, 27.827433]
                ],
                lineStyle: {
                    color: 'rgba(60, 224, 231, 0.8)'
                },
            }
        })

        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = worldGeo[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord,
                        symbolSize: data[i].value  // 散点的大小，通过之前设置的权重来计算，val的值来自data返回的value
                    });
                }
            }
            return res;
        };

        // console.log(relevance, 111)
        // console.log(convertData(this.state.data), 222);

        let option = { 
            backgroundColor: '#154E90',
            geo: [{
                map: 'world',
                label: {
                    emphasis: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                        },
                    }
                },
                zoom: 1,  //缩放比例
                // roam: true, //是否允许缩放
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(147, 235, 248, 1)',
                        borderWidth: 1,
                        areaColor: {
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: 'rgba(147, 235, 248, .1)' // 100% 处的颜色
                            }],
                        },
                        shadowColor: 'rgba(128, 217, 248, 1)',
                        shadowOffsetX: -2,
                        shadowOffsetY: 2,
                        shadowBlur: 10
                    },
                    emphasis: {
                        areaColor: '#389BB7',
                        borderWidth: 1
                    }
                }
            }], 
            tooltip: {
                formatter: (params) => {
                    let name = this.state.data[params.dataIndex].name;
                    let value = this.state.data[params.dataIndex].value;
                    return name + ':' + value;
                }
            },
            series: [
                { //绘制点（黄色点）
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    itemStyle:{  //点的颜色
                        color:'rgba(255,245,102, 0.8)'
                    },
                    label: {
                        normal: {                  // 默认的文本标签显示样式
                            show: true,
                            position: 'top',      // 标签显示的位置
                            formatter: '{b}'       // 标签内容格式器
                        }
                    },
                    data: convertData(this.state.data),
                }, 
                {
                    name: '线路',
                    type: 'lines',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    effect: {  //线路的动画
                        show: true,
                        symbol: 'roundRect',
                        constantSpeed: 50,
                        period: 2,
                        delay: 100,
                        trailLength: 0.6,
                        symbolSize: 4,
                    },
                    lineStyle: {
                        normal: {
                            width: 0.5,
                            opacity: 0.8,
                            curveness: 0.2,
                        }
                    },
                    data: relevance 
                },
                { //绘制中心点（红色的位置，株洲市）
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: { //涟漪特效相关配置
                        period: '4', //动画的时间
                        scale: '4', //动画中波纹的最大缩放比例
                        brushType: 'stroke'
                    },
                    itemStyle:{
                        color:'#FF0000'  //中心点红色的地方
                    },
                    label: { //图形上的城市文本标签
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{b}',
                            textStyle: {
                                color: '#f8e71c',
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                                fontFamily: 'arial',
                                fontSize: 20,
                            }
                        }
                    },
                    symbolSize: 6,//点大小
                    data: [{
                        name:'株洲市',
                        value:[113.131695,27.827433]
                    }]
                }]
        };  
        this.state.myChart.setOption(option); 
    }

    exportMap = () => {
        var picInfo = this.state.myChart.getDataURL({
            type:"jpeg",
            backgroundColor:"white"
        });
        let $a = document.createElement('a');
        $a.setAttribute("href", picInfo);
        $a.setAttribute("download", "世界地图");
        $a.click();
    }

    render() {
        return (
            <Card title={
                <div>
                    <div className="common-title">世界地图
                        <div style={{float:"right"}}>
                            <Button theme="outlined" style={{padding:"0px 8px"}} onClick={this.exportMap}>
                                <IconFont type={'icon-daochu1'} />
                            </Button>
                        </div>
                    </div>
                </div>
            }>
                <div id={'MapOne'} style={{height: 600}}></div>
            </Card>
        );
    }
}

