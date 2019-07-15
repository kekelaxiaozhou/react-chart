import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import menuLists from 'src/layout/leftComponent/menus'
import bizchartsBar from './bizcharts/bar';
import bizchartsLine from './bizcharts/line';
import bizchartsPie from './bizcharts/pie';
import echartsBar from './echarts/bar';
import echartsLine from './echarts/line';
import echartsPie from './echarts/pie';
import bMap from './bmap';

export default class RightComponent extends React.Component {
    getDefaultMenu(data){
        if(data[0].subMenus){
            return this.getDefaultMenu(data[0].subMenus);
        }else {
            return data[0].url;
        }
    }
    render(){
        let defaultMenu = this.getDefaultMenu(menuLists);
        return (
            <Switch>
                {/* bizcharts */}
                <Route exact path="/bizcharts/bar" component={bizchartsBar}></Route>
                <Route exact path="/bizcharts/line" component={bizchartsLine}></Route>
                <Route exact path="/bizcharts/pie" component={bizchartsPie}></Route>

                {/* echarts */}
                <Route exact path="/echarts/bar" component={echartsBar}></Route>
                <Route exact path="/echarts/line" component={echartsLine}></Route>
                <Route exact path="/echarts/pie" component={echartsPie}></Route>

                {/* bmap */}
                <Route exact path="/bmap" component={bMap}></Route>

                <Route path="*" render={(props) => <Redirect to={defaultMenu}/>}></Route>
            </Switch>
        )
    }
}