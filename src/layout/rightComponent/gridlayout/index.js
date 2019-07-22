import React from "react";
// import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import {Button, Input} from 'antd'

const ReactGridLayout = WidthProvider(RGL);

export default class Index extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            layouts: [
                {i: 'a', x: 0, y: 0, w: 12, h: 2},
            ],
        }
    }

    generateDOM(){
        return <Input placeholder="Basic usage" />
    }

    render(){
        console.log(this.state.layouts)
        let { layouts } = this.state;
        return (
            <React.Fragment>
                <div style={{ 'padding': '15px 30px', background: '#fff' }}>
                    <Button type="primary" style={{'marginRight':'10px'}}>添加Label</Button>
                    <Button type="primary" style={{'marginRight':'10px'}}>添加Input</Button>
                    <Button type="primary" style={{'marginRight':'10px'}}>添加Select</Button>
                </div>
                <div style={{minHeight: 'calc(100% - 80px)', padding: 20, marginTop: 18, background: '#fff' }}>
                    <ReactGridLayout
                        className="layout"
                        layouts={layouts}
                        // onLayoutChange={(layout, layouts) =>
                        //     this.onLayoutChange(layout, layouts)
                        // }
                    >
                        <div key='a'><Input placeholder="Basic usage" /></div>
                    </ReactGridLayout>
                </div>
            </React.Fragment>
        )
    }
}