'use strict'

import React from 'react'

const UserInfo = () => (
    <div className='user-info'>
        <img src='https://avatars2.githubusercontent.com/u/33267164?v=4'/>
        <h1 className="username">
            <a href='http://github.com/thiagocosta7'> Thiago Costa </a>
        </h1>
        <h2 className="location"> Ribeirão Preto/SP </h2>

        <ul className='repos-info'>
            <li> Repositórios: 3 </li>
            <li> Seguidores: 10 </li>
            <li> Seguindo: 10 </li>
        </ul>           
    </div>   
)

export default UserInfo