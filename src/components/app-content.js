'use strict'

import React from 'react';
import Search from './search'
import UserInfo from './user-info'
import Actions from './actions'
import Repos from './repos'
import PropTypes from 'prop-types'

const AppContent = ({
        userinfo,
        repos,
        starred,
        isFetching,
        handleSearch,
        getRepos,
        getStarred
    }) => (
    <div className='app'>
        <Search isDisabled={isFetching} handleSearch={handleSearch}  />
        <hr/>
        {!!userinfo && <div>{isFetching}</div>}
        <hr/>
        {isFetching && <div className="loading"><img src="https://opoderdaleituracom.files.wordpress.com/2018/05/load.gif"></img></div>}
        {isFetching && !!userinfo && <UserInfo userinfo={userinfo} />}
        {isFetching && !!userinfo && <Actions getRepos={getRepos} getStarred={getStarred} />}               
        {isFetching && !!repos.length &&
            <Repos
                className="repos"
                title="Repositórios:"
                repos={repos}
            />
        }
        {isFetching && !!starred.length &&
            <Repos
                className="starred"
                title="Favoritos:"
                repos={starred}
            />     
        }                   
    </div>
)

AppContent.propTypes = {
    userinfo: PropTypes.object,
    repos: PropTypes.array.isRequired,
    starred: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    handleSearch: PropTypes.func.isRequired,
    getRepos: PropTypes.func.isRequired,
    getStarred: PropTypes.func.isRequired,    
}

export default AppContent