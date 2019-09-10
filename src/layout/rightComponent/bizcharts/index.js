import React from 'react';
// import MainCard from 'src/layout/rightComponent/common/MainCard'

export default class Index extends React.Component {
    state={
        type: 1
    }
    plus = () => {
        let { type } = this.state;
        type++;
        this.setState({
            type: type
        })
    }
    render(){
        return (
            // <MainCard
            //     title={'世界地图'}
            // >
            //     111
            // </MainCard>
            <div style={{height: '100%', background: '#fff'}}>
                <button onClick={this.plus}>加一</button>
                <iframe title={'iframe'} src={`http://www.baidu.com?type=${this.state.type}`} frameborder="0" style={{width: '100%', height: '100%'}}></iframe>
            </div>
        )
    }
}