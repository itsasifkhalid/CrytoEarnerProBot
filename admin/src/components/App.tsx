import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import '../styles/App.css'
import Dashboard from './Dashboard'
import Login from './Login'

export default class App extends Component {
    async checkAuth() {
        let res = await fetch('http://127.0.0.1:8888/auth/check')
        console.log(res)
    }

    render() {
        this.checkAuth()
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/dashboard" component={Dashboard} />
                </Switch>
            </div>
        )
    }
}