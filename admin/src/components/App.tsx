import React, { Component } from 'react'
import '../styles/App.css'
import { PageHeader, Skeleton, Tabs } from 'antd'

const { TabPane } = Tabs

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <PageHeader className="SidebarTitle" title="Admin" subTitle={new Date().toLocaleDateString()} />

                <Tabs className="Tabs" defaultActiveKey="1" tabPosition={'left'} tabBarStyle={{ width: 150 }}>
                    <TabPane className="TabPane" key="1" tab="Статистика">
                        <h2>Статистика...</h2>
                        <Skeleton active={true} paragraph={{ rows: 10 }} loading={true}/>
                    </TabPane>
                    <TabPane className="TabPane" key="2" tab="Пользователи">
                        <h2>Пользователи...</h2>
                        <Skeleton active={true} paragraph={{ rows: 20 }} loading={true}/>
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