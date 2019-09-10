export default [
    {
        name: 'Bizcharts', 
        url: '/bizcharts', 
        icon: 'icon-charts', 
    },
    {
        name: 'Echarts', 
        url: '/echarts/index', 
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
    },
    {
        name: 'React-Grid-Layout',  //网格布局(grid layout)系统，但专为 React 服务
        url: '/gridlayout', 
        icon: 'icon-grid',
    },
    {
        name: 'AutoTable',  //网格布局(grid layout)系统，但专为 React 服务
        url: '/autotable', 
        icon: 'icon-grid',
    }
]