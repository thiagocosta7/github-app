'use strict'

import React, {Component} from 'react'
import AppContent from './components/app-content'
import axios from 'axios'

const axiosGitHubGraphQL = axios.create({
    baseURL: 'https://api.github.com/graphql',
    headers: {
        Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
    },
});


class App extends Component {
    constructor(){
        super()
        this.state = {
            userinfo: null,
            repos: [],
            starred: [],
            isFetching: false
        }
    }

    getAPIRest (username, type){
        const internalUser = username ? `/${username}` : ''
        const internalType = type ? `/${type}` : ''
        //Generated codes by GitHub App creation
        const client_id = process.env.CLIENT_ID
        const client_secret = process.env.CLIENT_SECRET
        return `https://api.github.com/users${internalUser}${internalType}?client_id=${client_id}&client_secret=${client_secret}`    
    }

    getAPIGraphQLUser (username){
        return `
            {
                user(login: ${username}) {
                    id
                    name
                    avatarUrl
                    location
                    login
                    repositories {
                        totalCount
                    }
                    followers {
                        totalCount
                    }
                    following {
                        totalCount
                    }
                }
            }  
        `
    }

    getAPIGraphQRepos (username, type){
        return `
            {
                user(login: ${username}) {
                    ${type}(last: 5) {
                        nodes {
                            name
                        }
                    }
                }
            }  
        `
    }

    handleSearch(e){
        const value = e.target.value
        const keyCode = e.which || e.keyCode
        const ENTER = 13    

        if (keyCode === ENTER){

            this.setState({ isFetching: true })

            axiosGitHubGraphQL
            .post('', { query: this.getAPIGraphQLUser(value) })
            // fetch(this.getAPIRest(value))
            // .then(result => result.json())
            // .then(result => console.log(result.data.data.user.name))                                                                 
            .then(result => {
                this.setState({
                    userinfo: {
                        username: result.data.data.user.name,
                        login: result.data.data.user.login,
                        location: result.data.data.user.location,
                        photo: result.data.data.user.avatarUrl,
                        repos: result.data.data.user.repositories.totalCount,
                        followers: result.data.data.user.followers.totalCount,
                        following: result.data.data.user.following.totalCount,
                    },
                    repos: [],
                    starred: []
                })
            })
            .then(() => this.setState({ isFetching: false }))
        }
    }
    getRepos(type){
        return () => { //High order function - função que recebe função
            const username = this.state.userinfo.login
            axiosGitHubGraphQL
            .post('', { query: this.getAPIGraphQRepos(username, type) })
            // .then(result => console.log(result.data.data.user.starredRepositories.nodes[0].name)) 
            .then(result => {
                if (type == "repositories"){
                    this.setState({ repos: result.data.data.user.repositories.nodes })
                }else {
                    this.setState({ starred: result.data.data.user.starredRepositories.nodes })
                }
            })            
        }
    }
    render(){
        return(            
            <AppContent
                userinfo={this.state.userinfo}
                repos={this.state.repos}
                starred={this.state.starred}
                isFetching={this.state.isFetching}                
                handleSearch={(e) => this.handleSearch(e)}
                getRepos={this.getRepos('repositories')}
                getStarred={this.getRepos('starredRepositories')} 
            />
        )
    }
}

export default App