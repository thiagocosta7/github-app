'use strict'

import React, {Component} from 'react'
import AppContent from './components/app-content'
import axios from 'axios'

const axiosGitHubGraphQL = axios.create({
    baseURL: 'https://api.github.com/graphql',
    headers: {
        Authorization: `bearer ${
            process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
        }`,
    },
});

const GET_ORGANIZATION = `
  {
    organization(login: "the-road-to-learn-react") {
      name
      url
    }
  }
`;

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

    getGitHubApiUrl (username, type){
        const internalUser = username ? `/${username}` : ''
        const internalType = type ? `/${type}` : ''
        //Generated codes by GitHub App creation
        const client_id = process.env.CLIENT_ID
        const client_secret = process.env.CLIENT_SECRET
        return `https://api.github.com/users${internalUser}${internalType}?client_id=${client_id}&client_secret=${client_secret}`    
    }

    handleSearch(e){
        const value = e.target.value
        const keyCode = e.which || e.keyCode
        const ENTER = 13    
        
        if (keyCode === ENTER){

            this.setState({ isFetching: true })

            axiosGitHubGraphQL
            .post('', { query: GET_ORGANIZATION })
            .then(result => console.log(result))            

            // fetch(this.getGitHubApiUrl(value))
            // .then(result => result.json())
            // .then((result) => {
            //     this.setState({
            //         userinfo: {
            //             username: result.name,
            //             login: result.login,
            //             location: result.location,
            //             photo: result.avatar_url,
            //             repos: result.public_repos,
            //             followers: result.followers,
            //             following: result.following,
            //         },
            //         repos: [],
            //         starred: []
            //     })
            // })
            .then(() => this.setState({ isFetching: false }))
        }
    }
    getRepos(type){
        return (e) => { //High order function - função que recebe função
            const username = this.state.userinfo.login
            fetch(this.getGitHubApiUrl(username, type))
            .then(result => result.json())
            .then((result) => {
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
                isFetching={this.state.isFetching}                
                handleSearch={(e) => this.handleSearch(e)}
                getRepos={this.getRepos('repos')}
                getStarred={this.getRepos('starred')} 
            />
        )
    }
}

export default App