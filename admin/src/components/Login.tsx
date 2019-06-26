import { Button, Form, Icon, Input } from 'antd'
import React, { Component } from 'react'
import '../styles/Login.css'
import { Redirect } from 'react-router'

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

        const params: any = {username: 'admin', password: 'admin'}

        const searchParams = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&');

        let res = await fetch('http://127.0.0.1:8888/auth/sign_in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: searchParams,
            credentials: 'same-origin'
        })

        console.log(res.headers.get('set-cookie'))
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
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                        type="password"
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