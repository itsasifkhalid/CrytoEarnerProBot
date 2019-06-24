import React, { Component } from 'react'
import { Skeleton, Statistic, Card, Row, Col } from 'antd'
import '../styles/Stats.css'

export default class Stats extends Component {
    render() {
        return (
            <div className="Stats">
                <h2>Статистика</h2>
                <Skeleton active={true} paragraph={{ rows: 10 }} loading={false}/>

                <Row type="flex" align="top" gutter={16} className="StatsBlock">
                    <Col xs={24} md={8} lg={6}>
                         <Card className="Card">
                             <Statistic
                                 title="Баланс системы"
                                 value={11893}
                                 suffix="UAH"
                             />
                         </Card>

                    </Col>
                    <Col xs={24} md={8} lg={6}>
                        <Card className="Card">
                            <Statistic
                                title="Кол-во инвесторов"
                                value={9}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} md={8} lg={6}>
                        <Card className="Card">
                            <Statistic
                                title="Новых сегодня"
                                value={231}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}