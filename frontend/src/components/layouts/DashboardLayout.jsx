import React from 'react'
import Navbar from './Navbar'
import { useContext } from 'react'

import { UserContext } from '../../context/UserContext'
import SideMenu from './SideMenu'


const DashboardLayout = ({activeMenu,children}) => {
    const {user} = useContext(UserContext);

  return (
    <div>
        <Navbar activeMenu = {activeMenu}/>
     
        {user && (
            
            <div className='flex'>
                <div className='max-[1000px]:hidden'>
                <SideMenu activeMenu={activeMenu}/>
                </div>
                <div className='grow mx-5'>{children}</div>
            </div>
        )}
    </div>
  )
}

export default DashboardLayout