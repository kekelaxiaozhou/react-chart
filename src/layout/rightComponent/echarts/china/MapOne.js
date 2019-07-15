import React, { Component } from 'react'
import echarts from 'echarts';
import 'echarts/map/js/china';
import geoCoordMap from 'src/utils/geoCoordMap';
import spreadData from '../data/china.json';

export default class MapChina extends Component {
    state={
        sDatas: [],
    }
    componentDidMount() {
        this.setMap();
    }
    setMap(){
        this.setState({sDatas: spreadData['RECORDS']},()=>{
            let {sDatas} = this.state;
            let metroData = sDatas.map(item=>{
                return {
                    name: item.city, 
                    value: item.num
                }
            });
    
            //地区与株洲关联
            let relevance  = metroData.map(item=>{
                return {
                    "fromName": item.name,
                    "toName": "株洲市",
                    'coords': [
                        geoCoordMap.getCoord(item.name),
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
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            };
            let option = {
                backgroundColor: '#154E90',
                geo: [{
                    map: 'china',
                    label: {
                        emphasis: {
                            show: true,
                            textStyle: {
                                color: '#fff',
                            },
                        }
                    },
                    zoom: 1,  //缩放比例
                    // roam: true,
                    itemStyle: {
                        normal: {
                            borderColor: 'rgba(147, 235, 248, 1)',
                            borderWidth: 1,
                            areaColor: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: 'rgba(147, 235, 248, .1)' // 100% 处的颜色
                                }],
                                // globalCoord: true // 缺省为 false
                            },
                            shadowColor: 'rgba(128, 217, 248, 1)',
                            shadowOffsetX: -2,
                            shadowOffsetY: 2,
                            shadowBlur: 10
                        },
                        emphasis: {
                            areaColor: '#389BB7',
                            borderWidth: 0
                        }
                    }
                }],
                series: [
                { //绘制点（黄色点）
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    itemStyle:{  //点的颜色
                        color:'rgba(255,245,102, 0.8)'
                    },
                    symbolSize: 4,//点大小
                    data: convertData(metroData),
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
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: '#ed1941'
                                }, {
                                    offset: 1,
                                    color: '#ffce7b'
                                }],
                                globalCoord: false
                            },
                            width: 0.5,
                            opacity: 0.8,
                            // type: 'dotted',
                            curveness: 0.2,
                        }
                    },
                    data: relevance //北京与广东省
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
                    symbolSize: 10,//点大小
                    data: [{
                        name:'株洲市',
                        value:[113.131695,27.827433]
                    }]
                }]
            };
    
            let myCharts = echarts.init(document.getElementById('mapone'));
            myCharts.off('click');
            myCharts.clear();
            myCharts.resize();
            myCharts.setOption(option);
        });
    }

    render() {
        return (
            <div id='mapone' style={{ height: 700 }}></div>
        )
    }
}
