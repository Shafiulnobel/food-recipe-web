import React from 'react';
import './ActiveLink.css'
import { NavLink } from 'react-router-dom';
const ActiveLink = ({to,children}) => {
    return (
        <NavLink style={{marginRight:'10px'}}
                    to={to}
                    className={({ isActive}) =>isActive ? "active": "inactive"} >
                    {children}
                  </NavLink>
    );
};

export default ActiveLink;