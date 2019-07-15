import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom'
import './index.less';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';
import 'moment/locale/zh-cn';

import Main from './layout';
import Login from './login';
import Loading from './loading';

class App extends React.Component {
    render(){
        let loginStatus = localStorage.getItem('loginStatus');
        return (<LocaleProvider locale={zhCN}>
            <Router>
                <React.Fragment>
                    {
                        loginStatus?<Main/>:<Login/>
                    }
                    <Loading/>
                </React.Fragment>
            </Router>
        </LocaleProvider>)
    }
}

const render = Component => {
    ReactDOM.render(
        <Component/>,
        document.getElementById('root')
    )
}

if(module.hot){
    module.hot.accept(() => {
        render(App);
    })
}

render(App);