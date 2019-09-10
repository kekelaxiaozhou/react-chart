import React from 'react';
// import MainCard from 'src/layout/rightComponent/common/MainCard'
import { Select } from 'antd';
const { Option } = Select;

export default class Index extends React.Component {
    render(){
        return (
            // <MainCard
            //     title={'index'}
            // >
            //     index
            // </MainCard>
            <Select 
                // value={'a'}
                mode="multiple"
                open={true}
                style={{width: 200}}
                className={'aaa'}
                dropdownClassName={'bbb'}
                maxTagCount={5}
            >
                <Option disabled={true} value="a">a</Option>
                <Option value="b">b</Option>
                <Option value="c">c</Option>
                <Option value="d">d</Option>
                <Option value="e">e</Option>
                <Option value="f">f</Option>
                <Option value="g">g</Option>
                <Option value="h">h</Option>
                <Option value="i">i</Option>
                <Option value="j">j</Option>
                <Option value="k">k</Option>
                <Option value="l">l</Option>
                <Option value="m">m</Option>
                <Option value="n">n</Option>
                <Option value="o">o</Option>
                <Option value="p">p</Option>
                <Option value="q">q</Option>
                <Option value="r">r</Option>
                <Option value="s">s</Option>
                <Option value="t">t</Option>
            </Select>
        )
    }
}