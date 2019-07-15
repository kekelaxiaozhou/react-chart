export default [
    {
        name: 'Bizcharts', 
        url: '/bizcharts', 
        icon: 'icon-charts', 
        subMenus: [
            {name: '柱状图', url: '/bizcharts/bar'},
            {name: '折线图', url: '/bizcharts/line'},
            {name: '饼图', url: '/bizcharts/pie'}
        ]
    },
    {
        name: 'Echarts', 
        url: '/echarts', 
        icon: 'icon-echarts_chart', 
        subMenus: [
            {name: '柱状图', url: '/echarts/bar'},
            {name: '折线图', url: '/echarts/line'},
            {name: '饼图', url: '/echarts/pie'}
        ]
    },
    {
        name: 'BMap', 
        url: '/bmap', 
        icon: 'icon-MapView',
    }
]