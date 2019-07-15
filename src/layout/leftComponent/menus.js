export default [
    {
        name: 'Bizcharts', 
        url: '/bizcharts', 
        icon: 'icon-charts', 
    },
    {
        name: 'Echarts', 
        url: '/echarts', 
        icon: 'icon-echarts_chart', 
        subMenus: [
            {name: '基础图', url: '/echarts/basic'},
            {name: '中国地图', url: '/echarts/china'},
            {name: '世界地图', url: '/echarts/world'}
        ]
    },
    {
        name: 'BMap', 
        url: '/bmap', 
        icon: 'icon-MapView',
    }
]