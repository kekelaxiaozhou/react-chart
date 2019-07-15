import React from 'react';
import Protal from "./protal";
import './index.less';

class Loading extends React.Component {
    
    render () {
        return (
            <Protal>
                <div className="shield" id="loadingDom" style={{display:"none"}}>
                    <span className={"item-1"}></span>
                    <span className={"item-2"}></span>
                    <span className={"item-3"}></span>
                    <span className={"item-4"}></span>
                    <span className={"item-5"}></span>
                    <span className={"item-6"}></span>
                    <span className={"item-7"}></span>
                </div>
            </Protal>
        )
    }
};

export default Loading

