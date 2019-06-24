import Column from 'antd/es/table/Column'
import React, { Component } from 'react'
import { Input, Select, Skeleton, Table, Tag } from 'antd'
import '../styles/Stats.css'

const { Option } = Select

export default class UsersTable extends Component {
    render() {
        const dataSource = [
            {
                key: '1',
                username: 'mike',
                name: 'Mike',
                investDate: '25.05.2019',
                payoutDate: '31.05.2019',
                investAmount: '3000 UAH',
                status: 'Инвестор',
                note: 'молодец'
            },
            {
                key: '2',
                username: 'john',
                name: 'John',
                investDate: '27.05.2019',
                payoutDate: '04.06.2019',
                investAmount: '7500 UAH',
                status: 'Закрыт',
                note: ''
            }
        ]

        return (
            <div className="UsersTable">
                <h2>Пользователи</h2>
                <Skeleton active={true} paragraph={{ rows: 15 }} loading={false}/>

                <Table dataSource={dataSource}>
                    <Column
                        title="Username"
                        dataIndex="username"
                        key="username"
                        render={(username: any) => (
                            <a href={`https://t.me/${username}`}>{username}</a>
                        )}
                    />
                    <Column title="ФИО" dataIndex="name" key="name" />
                    <Column title="Дата инвестирования" dataIndex="investDate" key="investDate" />
                    <Column title="Дата выплаты" dataIndex="payoutDate" key="payoutDate" />
                    <Column title="Сумма инвестиции" dataIndex="investAmount" key="investAmount" />
                    <Column
                        title="Статус"
                        dataIndex="status"
                        key="status"
                        render={(status: any) => (
                            <Select defaultValue={status} style={{ width: 120 }}>
                                <Option value="investor">Инвестор</Option>
                                <Option value="closed">Закрыт</Option>
                                <Option value="canceled">Отменён</Option>
                            </Select>
                        )}
                    />
                    <Column
                        title="Заметка"
                        dataIndex="note"
                        key="note"
                        render={(note: any) => (
                            <Input
                                placeholder="Введите заметку"
                                defaultValue={note}
                                allowClear
                                onPressEnter={e => alert('Saved')}
                            />
                        )}
                    />
                </Table>
            </div>
        )
    }
}