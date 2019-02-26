'use strict'

import React, {Component} from 'react'
import ajax from '@fdaciuk/ajax'
import AppContent from './components/app-content'

class App extends Component {
    constructor(){
        super()
        this.state = {
            userinfo: null,
            repos: [],
            starred: [],
        }
    }
    handleSearch(e){
        const value = e.target.value
        const keyCode = e.which || e.keyCode
        const ENTER = 13    
        
        if (keyCode === ENTER){
            ajax().get(`https://api.github.com/users/${value}`)
            .then((result) => {
                // console.log(result)
                this.setState({
                    userinfo: {
                        username: result.name,
                        login: result.login,
                        location: result.location,
                        photo: result.avatar_url,
                        repos: result.public_repos,
                        followers: result.followers,
                        following: result.following,
                    }
                })
            })
        }
    }
    getRepos(type){
        return (e) => { //High order function - função que recebe função
            // console.log('type: ', type)
            ajax().get(`https://api.github.com/users/thiagocosta7/${type}`)
            .then((result) => {
                // console.log(result)
                this.setState({
                    [type]: result.map((repo) => ({
                        name: repo.name,
                        link: repo.html_url,
                    }))
                })
            })
        }
    }
    render(){
        return(
            <AppContent
                userinfo={this.state.userinfo}
                repos={this.state.repos}
                starred={this.state.starred}
                handleSearch={(e) => this.handleSearch(e)}
                getRepos={this.getRepos('repos')}
                getStarred={this.getRepos('starred')} 
            />
        )
    }
}

export default App