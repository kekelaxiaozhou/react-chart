import React from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import IconFont from '../../iconfont';
import menuLists from './menus';
const { SubMenu } = Menu;

class LeftComponent extends React.Component {
    state = {
        rootSubmenuKeys:[],
        openKeys: [],
        current: '',
        highLight: false
    }

    componentDidMount(){
        let openKeys = [], rootSubmenuKeys = [];
        setTimeout(() => {
            let current = this.props.location.pathname;
            menuLists.forEach(item => {
                if(item.subMenus){
                    item.subMenus.forEach(ele => {
                        if(ele.url === current) {
                            openKeys = [String(item.url)]
                        }
                    })
                }

                rootSubmenuKeys.push(String(item.url));
            })
            this.setState({current, openKeys, rootSubmenuKeys});
        }, 50)
    }

    selectClick = ({key}) => {
        this.setState({current: key, highLight: false});
        this.props.history.push(key);
    }

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if(this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1){
            this.setState({openKeys})
        }else {
            this.setState({openKeys: latestOpenKey ? [latestOpenKey] : []})
        }
    }

    onTitleClick = (obj) => {
        this.setState({highLight: true, current: ''});
        this.props.history.push(obj.key);
    }

    renderMenus = (data) => data[0] && data.map(item => {
        if(item.subMenus && item.subMenus[0]){
            return (
                <SubMenu
                    key={item.url}
                    onTitleClick={this.onTitleClick}
                    style={this.state.highLight ? {background:'#1890ff'} : {background: null}}
                    title={
                        <span>
                            <IconFont type={item.icon} />
                            <span>{item.name}</span>
                        </span>
                    }
                >
                    {
                        this.renderMenus(item.subMenus)
                    }
                </SubMenu>
            )
        }else {
            if(item.icon) {
                return (
                    <Menu.Item key={item.url}>
                        <IconFont type={item.icon} />
                        <span>{item.name}</span>
                    </Menu.Item>
                ) 
            }else {
                return <Menu.Item key={item.url}>{item.name}</Menu.Item>
            }
            
        }
    })


    render(){
        return (
            <Menu theme="dark" mode="inline"
                onClick={this.selectClick}
                onOpenChange={this.onOpenChange}
                openKeys={this.state.openKeys}
                selectedKeys={this.state.current ? [this.state.current] : null}
            >
                {
                    this.renderMenus(menuLists)
                }
            </Menu>
        )
    }
}

export default withRouter(LeftComponent)