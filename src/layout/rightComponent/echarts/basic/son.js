import React from 'react';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 0,
            // props,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log(nextProps, 'getDerivedStateFromProps--nextProps');
        // console.log(prevState, 'getDerivedStateFromProps--prevState');
        // const {type, props} = nextProps;
        // 这段代码可能看起来非常混乱，这个props可以被当做缓存，仅用作判断
        // if (type !== props.type) {
        //     return {
        //         type,
        //         props: {
        //             type,
        //         },
        //     };
        // }
        // // 否则，对于state不进行任何操作
        return null;

        // return {
        //     type: nextProps.type
        // }
    }

    componentDidMount(){
        // console.log(this.state.type, 'componentDidMount')
    }

    componentDidUpdate(prevProps, prevState){
        // console.log(222);
        // console.log(this.props.type)
        // console.log(prevProps, 'componentDidUpdate--prevProps');
        // console.log(prevState, 'componentDidUpdate--prevState');
        // console.log(this.state.type, 'componentDidUpdate-this.state.type')
        // this.setState({type: this.props.type})

    }

    plus = () => {
        let {type} = this.state;
        type++;
        this.setState({type: type}, () => {
            // console.log(111)
        })
    }

    render(){
        return (
            <div>
                <button onClick={this.plus}>加一</button>
                {this.state.type}
            </div>
        )
    }
}