import React from 'react';
import { Button } from 'antd';

export default class LoginPage extends React.Component{
    login = () => {
        localStorage.setItem('loginStatus', true);
        window.location.reload();
    }
    render(){
        return (
            <Button type="primary" onClick={this.login}>登录</Button>
        )
    }
		
}

