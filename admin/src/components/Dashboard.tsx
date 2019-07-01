import React, { Component } from 'react'
import { Button, PageHeader, Tabs } from 'antd'
import '../styles/Dashboard.css'
import config from '../config.json'
import Settings from './Settings'
import Stats from './Stats'
import InvestmentsTable from './InvestmentsTable'

const { TabPane } = Tabs

export default class Dashboard extends Component{
    async signOutHandler() {
        let url = process.env.NODE_ENV === 'production' ?
            `http://${config.prod.api.host}:${config.prod.api.port}/` :
            `http://${config.dev.api.host}:${config.dev.api.port}/`

        await fetch(url + 'auth/sign_out', {
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
                        <Button key="1" type="danger" onClick={this.signOutHandler}>Выйти</Button>
                    ]}
                />

                <Tabs className="Tabs" defaultActiveKey="1" tabPosition={'left'} tabBarStyle={{ width: 150, height: '100vh' }}>
                    <TabPane className="TabPane" key="1" tab="Статистика">
                        <Stats />
                    </TabPane>
                    <TabPane className="TabPane" key="2" tab="Инвестиции">
                        <InvestmentsTable />
                    </TabPane>
                    <TabPane className="TabPane" key="3" tab="Настройки">
                        <Settings />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}