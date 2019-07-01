import { Button, Card, Form, Input, message } from 'antd'
import React, { Component } from 'react'
import '../styles/Settings.css'
import config from '../config.json'

export interface SettingsState {
    oldPass: string
    newPass: string
}

export default class Settings extends Component<{}, SettingsState>{
    constructor (props: any) {
        super(props)
        
        this.state = {
            oldPass: '',
            newPass: ''
        }

        this.handleChangeOldPass = this.handleChangeOldPass.bind(this)
        this.handleChangeNewPass = this.handleChangeNewPass.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChangeOldPass(e: any) {
        this.setState({
            oldPass: e.target.value
        })
    }

    handleChangeNewPass(e: any) {
        this.setState({
            newPass: e.target.value
        })
    }

    async handleSubmit(e: any) {
        e.preventDefault()

        let oldPass = this.state.oldPass
        let newPass = this.state.newPass

        if (!oldPass || !newPass) {
            message.warn('Заполните все поля!')
            return
        }

        if (oldPass === newPass) {
            message.warn('Ваш новый пароль совпадает со старым!')
            return
        }

        let url = process.env.NODE_ENV === 'production' ?
            `http://${config.prod.api.host}:${config.prod.api.port}/` :
            `http://${config.dev.api.host}:${config.dev.api.port}/`

        let res = await fetch(url + 'auth/change_password', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'admin',
                oldPassword: oldPass,
                newPassword: newPass
            })
        })

        switch (res.status) {
            case 200:
                message.success('Пароль успешно изменён', 2)
                break
            case 452:
                message.error('Неверный старый пароль!', 2)
                break
        }
    }
    
    render() {
        return (
            <div className="Settings">
                <h2>Настройки</h2>

                <Card hoverable style={{width: 300, padding: 0}}>
                    <Form onSubmit={this.handleSubmit} className="PasswordChange">
                        <h4>Старый пароль</h4>
                        <Form.Item className="FItem">
                            <Input.Password onChange={e => this.handleChangeOldPass(e)} />
                        </Form.Item>

                        <h4>Новый пароль</h4>
                        <Form.Item className="FItem">
                            <Input.Password onChange={e => this.handleChangeNewPass(e)} />
                        </Form.Item>

                        <Form.Item className="FItem">
                            <Button type="primary" htmlType="submit" className="LoginFormButton">
                                Сменить
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}