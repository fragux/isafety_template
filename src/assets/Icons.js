import React from 'react';
import * as AiIcons from 'react-icons/ai';
//import * as GrIcons from 'react-icons/gr';
import * as GiIcons from 'react-icons/gi';
import * as RiIcons from 'react-icons/ri';
import * as FiIcons from 'react-icons/fi';


const Icon = [ 
    {
        title:'SearchIcon',
        icon: <FiIcons.FiSearch size={20}/>,
        path: 'search'
      
    },
{
    title:'FilterIcon',
    icon: <FiIcons.FiFilter size={20}/>,
    path: 'filter'
  
},
{
    title:'NotificationIcon',
    icon: <RiIcons.RiNotification3Line size={20}/>,
    path: 'notification'
  
},
{
    title:'MailIcon',
    icon: <AiIcons.AiOutlineMail size={20}/>,
    path: 'mail'
  
},
{
    title:'SERRA 3500',
    icon: <GiIcons.GiCircularSaw size={20}/>,
    path: 'SERRA 3500'
  
},
{
    title:'GRANALHADORA',
    icon: <RiIcons.RiFileShredFill size={20}/>,
    path: '/granalhadora'
  
},
{
    title:'MULTIFIOS',
    icon: <AiIcons.AiOutlineFundView size={20}/>,
    path: '/multifios'
  
},
{
    title:'LOUSADA XT100',
    icon: <AiIcons.AiOutlineFundView size={20}/>,
    path: '/lousadat100'
  
}
]

export default Icon;