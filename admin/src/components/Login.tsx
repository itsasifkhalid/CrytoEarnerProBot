import { Button, Form, Icon, Input, message } from 'antd'
import React, { Component } from 'react'
import '../styles/Login.css'
import config from '../config.json'

export interface LoginState {
    username: string
    password: string
}

export default class Login extends Component<{}, LoginState> {
    constructor(props: any) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }

        this.submitHandler = this.submitHandler.bind(this)
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this)
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this)
    }

    async submitHandler(e: any) {
        e.preventDefault()

        if (this.state.username && this.state.password) {
            let url = process.env.NODE_ENV === 'production' ?
            `http://${config.prod.api.host}:${config.prod.api.port}/` :
            `http://${config.dev.api.host}:${config.dev.api.port}/`

            let res = await fetch(url + 'auth/sign_in', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            })

            switch (res.status) {
                case 200:
                    window.location.reload()
                    break
                case 401:
                    message.error('Неверный логин и/или пароль', 2)
                    break
            }
        }
        else {
            message.warn('Заполните все поля!')
        }
    }

    usernameChangeHandler(e: any) {
        this.setState({
            username: e.target.value
        })
    }

    passwordChangeHandler(e: any) {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return (
            <Form onSubmit={this.submitHandler} className="LoginForm">
                <h2 style={{ textAlign: 'center' }}>Авторизация</h2>

                <Form.Item>
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                        placeholder="Имя пользователя"
                        onChange={this.usernameChangeHandler}
                    />
                </Form.Item>
                <Form.Item>
                    <Input.Password
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                        placeholder="Пароль"
                        onChange={this.passwordChangeHandler}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="LoginFormButton">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}