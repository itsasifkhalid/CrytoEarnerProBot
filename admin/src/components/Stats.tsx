import { Button, Card, Col, Icon, message, Row, Statistic } from 'antd'
import React, { Component } from 'react'
import config from '../config.json'
import '../styles/Stats.css'

export interface StatsState {
  loading: boolean
  balance: number
  investorsAmount: number
  investorsToday: number
}

export default class Stats extends Component<{}, StatsState> {
  constructor(props: any) {
    super(props)
    
    this.state = {
      loading: true,
      balance: 0,
      investorsAmount: 0,
      investorsToday: 0
    }
    
    this.updateHandler = this.updateHandler.bind(this)
  }
  
  async loadData(update = false) {
    this.setState({ loading: true })
    
    let url = process.env.NODE_ENV === 'production' ?
      `http://${config.prod.api.host}:${config.prod.api.port}/` :
      `http://${config.dev.api.host}:${config.dev.api.port}/`
    
    let res = await fetch(url + 'stats/all', {
      credentials: 'include'
    })
    let json = await res.json()
    
    this.setState({
      loading: false,
      balance: json.balance,
      investorsAmount: json.amount,
      investorsToday: json.amountToday
    })
    
    if (update) {
      if (res.status === 200)
        message.success('Данные обновлены!', 1)
      else
        message.error('Произошла ошибка при обновлении', 1)
    }
  }
  
  async updateHandler() {
    await this.loadData(true)
  }
  
  render() {
    return (
      <div className="Stats">
        <h2 style={{ display: 'inline-block' }}>Статистика</h2>
        
        <Button type="link" onClick={this.updateHandler}>
          <Icon type="sync" spin={this.state.loading} style={{ fontSize: 16 }}/>
        </Button>
        
        <Row type="flex" align="top" gutter={16} className="StatsBlock">
          <Col xs={24} md={8} lg={6}>
            <Card hoverable loading={this.state.loading} className="Card">
              <Statistic
                title="Баланс системы"
                value={this.state.balance}
                suffix="UAH"
              />
            </Card>
          
          </Col>
          <Col xs={24} md={8} lg={6}>
            <Card hoverable loading={this.state.loading} className="Card">
              <Statistic
                title="Кол-во инвесторов"
                value={this.state.investorsAmount}
              />
            </Card>
          </Col>
          <Col xs={24} md={8} lg={6}>
            <Card hoverable loading={this.state.loading} className="Card">
              <Statistic
                title="Новых сегодня"
                value={this.state.investorsToday}
              />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
  
  async componentDidMount() {
    await this.loadData()
  }
}