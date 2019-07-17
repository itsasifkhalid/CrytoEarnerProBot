import { Button, Divider, Icon, Input, message, Popconfirm, Table, Tag } from 'antd'
import Column from 'antd/es/table/Column'
import React, { Component } from 'react'
import config from '../config.json'
import '../styles/Stats.css'

export interface InvestmentsTableState {
  loading: boolean
  investments: Array<any>
}

export default class InvestmentsTable extends Component<{}, InvestmentsTableState> {
  constructor(props: any) {
    super(props)
    
    this.state = {
      loading: true,
      investments: []
    }
    
    this.updateHandler = this.updateHandler.bind(this)
  }
  
  async loadData(update = false) {
    this.setState({ loading: true })
    
    if (update)
      this.setState({ investments: [] })
    
    let url = process.env.NODE_ENV === 'production' ?
      `http://${config.prod.api.host}:${config.prod.api.port}/` :
      `http://${config.dev.api.host}:${config.dev.api.port}/`
    
    let res = await fetch(url + 'investors/all', {
      credentials: 'include'
    })
    
    let investors = await res.json()
    
    investors.forEach((investor: any) => {
      investor.investments.forEach((investment: any) => {
        //console.log(JSON.parse(investment))
        const obj: any = Object.assign(investment, {
          id: investment.id,
          key: investment._id,
          username: investor.username,
          name: investor.fullName,
          userStatus: investor.status,
          balance: investor.balance,
          investDate: new Date(investment.date).toLocaleDateString(),
          payoutDate: new Date(investment.expires).toLocaleDateString(),
          investAmount: investment.sum,
          status: investment.status,
          note: investment.note
        })
        
        switch (investment.status) {
          case 0:
            obj.status = 'Активная'
            break
          case 1:
            obj.status = 'Закрытая'
            break
          case 2:
            obj.status = 'Отменённая'
            break
        }
        
        switch (investor.status) {
          case 'ACTIVE':
            obj.userStatus = 'Активный'
            break
          case 'BLOCKED':
            obj.userStatus = 'Заблокированный'
            break
        }
        
        this.setState({
          investments: [...this.state.investments, obj]
        })
      })
    })
    
    let sortedInvestments = this.state.investments
    
    sortedInvestments.reverse()
    
    this.setState({
      loading: false,
      investments: sortedInvestments
    })
    
    if (update) {
      if (res.status === 200)
        message.success('Данные обновлены!', 1)
      else
        message.error('Произошла ошибка при обновлении', 1)
    }
  }
  
  async banUser(username: string) {
    let url = process.env.NODE_ENV === 'production' ?
      `http://${config.prod.api.host}:${config.prod.api.port}/` :
      `http://${config.dev.api.host}:${config.dev.api.port}/`
    
    let status = 'BLOCKED'
    
    await fetch(url + 'investors/set_investor_status', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        status: status
      })
    })
    
    await this.updateHandler()
  }
  
  async cancelInvestment(record: any) {
    let url = process.env.NODE_ENV === 'production' ?
      `http://${config.prod.api.host}:${config.prod.api.port}/` :
      `http://${config.dev.api.host}:${config.dev.api.port}/`
    
    let username = record.username
    let id = record.id
    let status = 'CANCELED'
    
    await fetch(url + 'investments/set_investment_status', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        id: id,
        status: status
      })
    })
    
    await this.updateHandler()
  }
  
  async saveNote(record: any, e: any) {
    let url = process.env.NODE_ENV === 'production' ?
      `http://${config.prod.api.host}:${config.prod.api.port}/` :
      `http://${config.dev.api.host}:${config.dev.api.port}/`
    
    let id = record.id
    let username = record.username
    let note = e.target.value
    
    await fetch(url + 'investments/set_investment_note', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        username: username,
        note: note
      })
    })
  }
  
  async updateHandler() {
    await this.loadData(true)
  }
  
  render() {
    return (
      <div className="InvestmentsTable">
        <h2 style={{ display: 'inline-block' }}>Инвестиции</h2>
        <Button type="link" onClick={this.updateHandler}>
          <Icon type="sync" spin={this.state.loading} style={{ fontSize: 16 }}/>
        </Button>
        <Table bordered dataSource={this.state.investments} loading={this.state.loading}
               pagination={{ defaultPageSize: 6 }}>
          <Column
            title="Username"
            dataIndex="username"
            key="username"
            align="center"
            render={(username: any) => (
              <a href={`https://t.me/${username}`}>@{username}</a>
            )}
          />
          <Column title="ФИО" dataIndex="name" key="name" align="center"/>
          <Column title="Дата инвестирования" dataIndex="investDate" key="investDate" align="center"/>
          <Column title="Дата выплаты" dataIndex="payoutDate" key="payoutDate" align="center"/>
          <Column
            title="Сумма инвестиции"
            dataIndex="investAmount"
            key="investAmount"
            align="center"
            render={(amount: any) => (
              `${amount} UAH`
            )}
          />
          <Column
            title="Статус инвестиции"
            dataIndex="status"
            key="status"
            align="center"
            render={(status: any) => {
              let color = 'geekblue'
              switch (status) {
                case 'Закрытая':
                  color = 'purple'
                  break
                case 'Отменённая':
                  color = 'red'
                  break
              }
              
              return (
                <Tag color={color} style={{ textAlign: 'center' }}>{status}</Tag>
              )
            }}
          />
          <Column
            title="Статус пользователя"
            dataIndex="userStatus"
            key="userStatus"
            align="center"
            render={(status: any, record: any, index: number) => {
              let color = 'blue'
              
              switch (status) {
                case 'Активный':
                  color = 'green'
                  break
                case 'Заблокированный':
                  color = 'red'
                  break
              }
              return (
                <Tag color={color} style={{ textAlign: 'center' }}>{status}</Tag>
              )
            }}
          />
          <Column
            title="Заметка"
            dataIndex="note"
            key="note"
            align="center"
            render={(note: any, record: any, index: number) => {
              return (
                <div>
                  <Input
                    placeholder="Введите заметку"
                    defaultValue={note}
                    allowClear
                    onBlur={e => this.saveNote(record, e)}
                    onPressEnter={e => this.saveNote(record, e)}
                  />
                </div>
              )
            }}
          />
          <Column
            title="Действия"
            align="center"
            render={(actions: any, record: any, index: number) => {
              let banDisplay = record.userStatus === 'Заблокированный' ? 'none' : 'block'
              let cancelDisplay = record.status === 'Отменённая' ? 'none' : 'block'
              let dividerDisplay = record.userStatus === 'Заблокированный' || record.status === 'Отменённая' ? 'none' : 'block'
              
              return (
                <span>
                                    <Popconfirm
                                      title="Вы уверены, что хотите забанить этого инвестора?"
                                      okText="Да"
                                      cancelText="Отменить"
                                      onConfirm={e => this.banUser(record.username)}
                                      placement="topRight"
                                    >
                                            <Button
                                              type="link"
                                              style={{
                                                display: banDisplay,
                                                color: '#FF5E49',
                                                fontSize: 13,
                                                padding: 0
                                              }}
                                            >
                                                Забанить
                                            </Button>
                                    </Popconfirm>

                                    <Divider type="horizontal" style={{ margin: 0, display: dividerDisplay }}/>

                                    <Popconfirm
                                      title="Вы уверены, что хотите отменить эту инвестицию?"
                                      okText="Да"
                                      cancelText="Нет"
                                      onConfirm={e => this.cancelInvestment(record)}
                                      placement="topRight"
                                    >
                                            <Button
                                              type="link"
                                              style={{ display: cancelDisplay, fontSize: 13, padding: 0 }}
                                            >
                                                Отменить
                                            </Button>
                                    </Popconfirm>
                                </span>
              )
            }}
          />
        </Table>
      </div>
    )
  }
  
  async componentDidMount() {
    await this.loadData()
  }
}