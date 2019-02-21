'use strict'

import React from 'react'

const App = () => (
    <div className='app'>
        <div className='search'>
            <input type='search' placeholder='Digite o nome do usuário'/>
        </div>
        <div className='user-info'>
            <img src='https://avatars2.githubusercontent.com/u/33267164?v=4'/>
            <h1>
                <a href='http://github.com/thiagocosta7'> Thiago Costa </a>
            </h1>
            <h2> Ribeirão Preto/SP </h2>

            <ul className='repos-info'>
                <li> Repositórios: 3 </li>
                <li> Seguidores: 10 </li>
                <li> Seguindo: 10 </li>
            </ul>

            <div className='actions'>
                <button>Ver Repositórios</button>
                <button>Ver Favoritos</button>                
            </div>

            <div className='repos'>
                <h3> Repositórios </h3>
                <ul>
                    <li><a href='#!'> Nome do repositório </a></li>            
                </ul>
            </div>

            <div className='starred'>
                <h3> Favoritos </h3>            
                <ul>
                    <li><a href='#!'> Nome do repositório </a></li>            
                </ul>
            </div>            
        </div>          
    </div>
)

export default App
