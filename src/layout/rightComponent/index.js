import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import menuLists from 'src/layout/leftComponent/menus'
import bizcharts from './bizcharts';
import echartsBasic from './echarts/basic';
import echartsChina from './echarts/china';
import echartsWorld from './echarts/world';
import bMap from './bmap';
import gridLayout from './gridlayout'

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
                <Route exact path="/bizcharts" component={bizcharts}></Route>

                {/* echarts */}
                <Route exact path="/echarts/basic" component={echartsBasic}></Route>
                <Route exact path="/echarts/china" component={echartsChina}></Route>
                <Route exact path="/echarts/world" component={echartsWorld}></Route>

                {/* bmap */}
                <Route exact path="/bmap" component={bMap}></Route>

                {/* React-Grid-Layout */}
                <Route exact path="/gridlayout" component={gridLayout}></Route>

                <Route path="*" render={(props) => <Redirect to={defaultMenu}/>}></Route>
            </Switch>
        )
    }
}