import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Home from '@material-ui/icons/Home'
import InsertChart from '@material-ui/icons/InsertChart'
import AccountBox from '@material-ui/icons/AccountBox'




export default function SimpleBottomNavigation() {

    const [value, setValue] = React.useState('recents');


    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <BottomNavigation value={value} onChange={handleChange}>
            <BottomNavigationAction label="Home" value="home" icon={<Home />} />
            <BottomNavigationAction label="Detalles" value="detalles" icon={<InsertChart />} />
            <BottomNavigationAction label="Perfil" value="perfil" icon={<AccountBox />} />
        </BottomNavigation>
    )
}
