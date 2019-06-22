import React, { Component } from 'react'
import '../styles/App.css'

export interface AppState {
    users:
        [
            {
                id: number
                name: string
                email: string
            }
        ]
}

export default class App extends Component<{}, AppState> {
    constructor(props: any) {
        super(props)

        this.state = {
            users: [{
                id: 0,
                name: 'loading',
                email: 'loading'
            }]
        }
    }


    render() {
        const users = this.state.users.map((user) => {
            return (
                <div key={user.id} className='card'>
                    <h2>{user.name}</h2>
                    <h3>{user.email}</h3>
                    <hr/>
                </div>
            )
        })

        return (
            <div>
                {users}
            </div>
        )
    }

    async componentDidMount() {
        let response = await fetch('http://127.0.0.1:8888')
        let data = await response.json()

        this.setState({
            users: data
        })
    }
}