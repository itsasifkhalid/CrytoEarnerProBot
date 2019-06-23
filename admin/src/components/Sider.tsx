import React from 'react'
import { Menu, PageHeader } from 'antd'
import '../styles/Sider.css'

export default class Sider extends React.Component {
    render() {
        return (
            <div>
                <PageHeader title="Admin" />
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    className="Menu"
                >
                    <Menu.Item key="1">Статистика</Menu.Item>
                    <Menu.Item key="2">Пользователи</Menu.Item>
                    <Menu.Item key="3">Настройки</Menu.Item>
                </Menu>
            </div>
        )
    }
}