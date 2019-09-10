import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import menuLists from 'src/layout/leftComponent/menus'
import bizcharts from './bizcharts';
import echartsIndex from './echarts/index';
import echartsBasic from './echarts/basic';
import echartsChina from './echarts/china';
import echartsWorld from './echarts/world';
import bMap from './bmap';
import gridLayout from './gridlayout'
import autoTable from './autoTable'

class RightComponent extends React.Component {
    getDefaultMenu(data){
        if(data[0].subMenus){
            return this.getDefaultMenu(data[0].subMenus);
        }else {
            return data[0].url;
        }
    }
    componentDidMount(){
        let _this = this;
        let websocket = null;
        if('WebSocket' in window){
            websocket = new WebSocket("ws://192.168.102.157:8080/websocket");
        }
        else{
            alert('Not support websocket')
        }

        //连接成功建立的回调方法
    websocket.onopen = function(event){
        console.log('连接成功')
    }

        // console.log(websocket);
        //接收到消息的回调方法
        websocket.onmessage = function(event){
            let data = JSON.parse(event.data);
            console.log(data);
            if(data.type === '1'){
                console.log(1);
                _this.props.history.push(data.param);
            }else if(data.type === '2'){
                console.log(2);
                // setTimeout(() => {
                    // console.log(document.getElementById('layout-id'));
                    document.getElementById('layout-id').scrollTop = 200;
                // }, 100)
            }else {
                console.log(3);
                _this.props.history.goBack();
            }
            
        }

        //连接关闭的回调方法
    websocket.onclose = function(){
        console.log('已关闭链接')
    }
    }
    render(){
        let defaultMenu = this.getDefaultMenu(menuLists);
        return (
            <Switch>
                {/* bizcharts */}
                <Route exact path="/bizcharts" component={bizcharts}></Route>

                {/* echarts */}
                <Route exact path="/echarts/index" component={echartsIndex}></Route>
                <Route exact path="/echarts/basic" component={echartsBasic}></Route>
                <Route exact path="/echarts/china" component={echartsChina}></Route>
                <Route exact path="/echarts/world" component={echartsWorld}></Route>

                {/* bmap */}
                <Route exact path="/bmap" component={bMap}></Route>

                {/* React-Grid-Layout */}
                <Route exact path="/gridlayout" component={gridLayout}></Route>

                {/* autoTable */}
                <Route exact path="/autotable" component={autoTable}></Route>

                <Route path="*" render={(props) => <Redirect to={defaultMenu}/>}></Route>
            </Switch>
        )
    }
}

export default withRouter(RightComponent)