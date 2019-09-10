import React from 'react';
import styles from './index.module.less';

const list = [
    {row: 1, value: [{name: 'name', type: 'col'}, {name: 'age', type: 'row'}, {name: 'sex', type: 'row'}, {name: 'address', type: 'row'}]},
    {row: 2, value: [{name: 'firstName'}, {name: 'lastName'}]}
]

export default class autoTable extends React.Component {
    state = {
        tableHead: [
            {name: 'name', child: [
                {name: 'firstName'},
                {name: 'lastName'},
            ] },
            {name: 'age'},
            {name: 'sex'},
            {name: 'address'}
        ],
        tableHearNew: [],
        data: [
            {
                row: 1,
                value: [
                    {name: 'firstName', value: 'zhou'},
                    {name: 'lastName', value: 'ke'},
                    {name: 'age', value: 24},
                    {name: 'sex', value: 0},
                    {name: 'address', value: '11111111111'}
                ]
            },
            {
                row: 2,
                value: [
                    {name: 'firstName', value: 'zhou'},
                    {name: 'lastName', value: 'ke'},
                    {name: 'age', value: 25},
                    {name: 'sex', value: 0},
                    {name: 'address', value: '2222222222'}
                ]
            }
        ]
    }

    renderHead(tableHead){
        this.setState({tableHearNew: list})
        // let tableHearNew = [];
        // tableHead.forEach((item, i) => {
        //     if(item.child){

        //     }else {
        //         tableHearNew.push({
        //             value: [
        //                 item
        //             ]
        //         })
        //     }
        // })
    }

    componentDidMount() {
        this.renderHead();
    }

    render() {
        return (
            <table className={styles.table}>
                <thead>
                    {
                        this.state.tableHearNew && this.state.tableHearNew[0] && this.state.tableHearNew.map(item => {
                            return <tr key={item.row}>
                                {
                                    item.value && item.value[0] && item.value.map((ele, index) => {
                                        return <th colSpan={ele.type === 'col' ? 2 : ''} rowSpan={ele.type === 'row'?2: ''} key={item.row + '-' + index}>{ele.name}</th>
                                    })
                                }
                            </tr>
                        })
                    }

                    {/* <tr>
                        <th colSpan='2'>name</th>
                        <th rowSpan='2'>age</th>
                        <th rowSpan='2'>sex</th>
                        <th rowSpan='2'>address</th>
                    </tr>
                    <tr>
                        <th>firstName</th>
                        <th>lastName</th>
                    </tr> */}
                </thead>
                <tbody>
                    {
                        this.state.data && this.state.data[0] && this.state.data.map(item => {
                            return <tr key={item.row}>
                                {
                                    item.value && item.value[0] && item.value.map((ele, index) => {
                                        return <td key={item.row + '-' + index}>{ele.value}</td>
                                    })
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
        )
    }
}