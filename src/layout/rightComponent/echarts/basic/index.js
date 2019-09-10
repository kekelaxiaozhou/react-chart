import React from 'react';
import Son from './son'
import { Input } from 'antd'

export default class Index extends React.Component {
    state={
        type: 10,
    }

    handleChange = (e) => {
        this.setState({type: e.target.value});
    }

    render(){
        return (
            <div>
                父组件---------
                <Input style={{marginBottom: 20}} type="text" value={this.state.type} onChange={this.handleChange}/>
                子组件---------
                <Son type={this.state.type}/>
            </div>
        )
    }
}