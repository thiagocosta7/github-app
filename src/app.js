'use strict'

import React, {Component} from 'react'
import AppContent from './components/app-content'

class App extends Component {
    constructor(){
        super()
        this.state = {
            userinfo: {
                username: 'Thiago Costa',
                login: 'thiagocosta7',
                location: 'Ribeirão Preto/SP',
                photo: 'https://avatars2.githubusercontent.com/u/33267164?v=4',
                repos: 12,
                followers: 118,
                following: 70
            },
            repos: [{
                name: 'Repository',
                link: '#!'
            }],
            starred: [{
                name: 'Favorite',
                link: '#!'
            }],
        }
    }
    render(){
        return(
            <AppContent
                userinfo={this.state.userinfo}
                repos={this.state.repos}
                starred={this.state.starred}
            />
        )
    }
}

export default App
