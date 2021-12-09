import './App.less';
import {Calendar, ConfigProvider, Modal, TimePicker, Badge, Button, message} from 'antd'
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import React from 'react';
import {CheckCircleTwoTone} from '@ant-design/icons';
import 'moment/locale/zh-cn';
import {VikaController} from './vika'

moment.locale('zh-cn');

const Vika = new VikaController()

const App = () => {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [curDay, updateDay] = React.useState('');
    const [selectTime, updateSelectTime] = React.useState('');
    const [list, updateList] = React.useState([])
    const [currentKey, updateCurrentKey] = React.useState(-1)

    const VikaAddHandle = async (data) => {
        const params = [
            {
                "fields": {
                    "标题": data.text,
                    "开始时间": data.timeStamp,
                    data: data.data
                }
            }
        ]
        await Vika.add(params)

    }
    const getList = () => Vika.getList()
    const edit = () => {
        const params = [
            {
                recordId: 'recQ5xjnz8QDU',
                "fields": {
                    "标题": "edit",
                    "开始时间": new Date().getTime()
                }
            }
        ]
        Vika.update(params)
    }
    const del = () => {
        const params = [
            'recQ5xjnz8QDU'// recordId:
        ]
        Vika.del(params)
    }
    const handleOk = async () => {
        const index = list.findIndex(item => moment(curDay).isSame(moment(item.fields['开始时间']), 'day'))
        const [str, str2] = formatTime(selectTime[0], selectTime[1])
        const title = `打卡时间${str},打卡时长${str2}`
        const startTime = moment(curDay).format()
        if (index !== -1) {
            //编辑
            const recordId = list[index].recordId
            await Vika.update([{
                recordId,
                "fields": {
                    "标题": title,
                    "开始时间": startTime
                }
            }])
        } else {
            await VikaAddHandle({text: title, timeStamp: startTime})

        }
        updateList([...list])
        updateSelectTime()
        setVisible(false);
        await refresh()
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };
    const formatTime = (start, end) => {
        let start_date = moment(start, "YYYY-MM-DD HH:mm:ss")
        let end_date = moment(end, "YYYY-MM-DD HH:mm:ss")

        let seconds, mintus, hours;
        seconds = end_date.diff(start_date, "seconds");
        hours = parseInt(seconds / 60 / 60);
        mintus = Math.round((seconds - hours * 60 * 60) / 60)
        let str = `${start_date.format('HH:mm')}--${end_date.format('HH:mm')}`
        let str2 = `${moment(curDay).format('YYYY-MM-DD')},${hours}小时${mintus}分`
        return [str, str2]
    }
    const getListData = (value) => {
        for (let i = 0; i < list.length; i++) {
            let item = list[i]
            if (moment(value).isSame(moment(item.fields['开始时间']), 'day')) {
                return item
            }
        }
    }
    const dateCellRender = (value) => {
        let data = getListData(value)
        if (data !== undefined) {
            console.log(data)
            return (
                <>
                    <Badge status="success" text={data.fields['标题']}/>
                </>

            )
        }


    }
    const selectHandle = (date) => {
        setVisible(true)
        updateDay(date)
        const index = list.findIndex(item => moment(date).isSame(moment(item.fields['开始时间']), 'day'))
        updateCurrentKey(index)

    }
    const timePickerChange = (date) => {
        console.log(moment(curDay).format('YYYYMMDD'))
        updateCurrentKey()
        updateSelectTime(date)

    }
    const refresh = async () => {
        const res = await Vika.getList()
        list.splice(0, list.length, ...res.records)
        console.log(list)
        updateList([...list])
    }
    const handleDel = () => {

    }
    return (
        <ConfigProvider locale={zhCN}>
            <div className="App">

                <Modal
                    title="打卡"
                    visible={visible}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            取消
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleOk}>
                            {currentKey ===-1 ? '添加': '修改'}
                        </Button>,
                        <Button
                            key='del'
                            type='danger'
                            style={{display:currentKey!==-1 ? 'inline-block' :"none"}}
                            onClick={handleDel}
                        >
                            删除
                        </Button>,
                    ]}
                >
                    <TimePicker.RangePicker value={selectTime} onChange={timePickerChange} showNow={true}/>
                </Modal>
                <Button onClick={refresh}>更新</Button>
                <Calendar dateCellRender={dateCellRender}
                          onSelect={selectHandle}
                />

            </div>
        </ConfigProvider>
    );
}


export default App;
