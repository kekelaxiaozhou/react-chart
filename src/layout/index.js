import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Icon } from 'antd';
import LeftComponent from './leftComponent';
import RightComponent from './rightComponent';
import styles from './index.module.less';
const { Header, Sider, Content } = Layout;

class Main extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    loginOut = () => {
        localStorage.clear();
        window.location.href = window.location.origin;
    }

    render() {
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} className={styles.sider}>
                    <div className={styles.logo + ' ' + (this.state.collapsed?styles.smalllogo:styles.biglogo)}>Charts展览</div>
                    <LeftComponent/>
                </Sider>
                <Layout id={'layout-id'} style={{height: '100vh', display: 'flex'}}>
                    <Header style={{ background: '#fff', padding: 0}}>
                        <Icon
                            className={styles.trigger}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <span style={{float:'right', marginRight: 20, cursor: 'pointer'}} onClick={this.loginOut}>退出登录</span>
                    </Header>
                    <Content
                        style={{
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <RightComponent/>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(Main);