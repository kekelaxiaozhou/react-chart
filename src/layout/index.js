import React from 'react';
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

    render() {
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} className={styles.sider}>
                    <div className={styles.logo + ' ' + (this.state.collapsed?styles.smalllogo:styles.biglogo)}>Charts展览</div>
                    <LeftComponent/>
                </Sider>
                <Layout style={{height: '100vh', display: 'flex'}}>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className={styles.trigger}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '20px 16px',
                            padding: 24,
                            background: '#fff',
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

export default Main;