import React, { Component } from 'react'
import { Button, PageHeader, Skeleton, Tabs } from 'antd'
import '../styles/Dashboard.css'
import Stats from './Stats'
import UsersTable from './UsersTable'

const { TabPane } = Tabs

export default class Dashboard extends Component{
    async signOutHandler() {
        await fetch('http://localhost:8888/auth/sign_out', {
            credentials: 'include'
        })

        window.location.reload()
    }
    render() {
        return (
            <div className="Dashboard">
                <PageHeader
                    className="SidebarTitle"
                    title="Админ"
                    subTitle={new Date().toLocaleDateString()}
                    extra={[
                        <Button type="danger" onClick={this.signOutHandler}>Выйти</Button>
                    ]}
                />

                <Tabs className="Tabs" defaultActiveKey="1" tabPosition={'left'} tabBarStyle={{ width: 150, height: '100vh' }}>
                    <TabPane className="TabPane" key="1" tab="Статистика">
                        <Stats />
                    </TabPane>
                    <TabPane className="TabPane" key="2" tab="Инвестиции">
                        <UsersTable />
                    </TabPane>
                    <TabPane className="TabPane" key="3" tab="Настройки">
                        <h2>Настройки...</h2>
                        <Skeleton active={true} paragraph={{ rows: 5 }} loading={true}/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}