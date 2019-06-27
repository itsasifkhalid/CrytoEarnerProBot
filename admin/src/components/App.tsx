import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import '../styles/App.css'
import Dashboard from './Dashboard'
import Login from './Login'

export interface AppState {
    authorized: boolean
}

export default class App extends Component<{}, AppState> {
    constructor(props: any) {
        super(props)

        this.state = {
            authorized: false
        }
    }
    async checkAuth() {
        let res = await fetch('http://localhost:8888/auth/check', {
            credentials: 'include'
        })

        this.setState({
            authorized: res.status === 200
        })
        console.log(this.state)
    }

    render() {
        return (
            <div className="App">
                <Route exact path="/" component={this.state.authorized ? Dashboard : Login} />
            </div>
        )
    }

    async componentDidMount() {
        await this.checkAuth()
    }
}