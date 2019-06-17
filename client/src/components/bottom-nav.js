import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { Home, AccountBox, AspectRatio, ShoppingBasket, InsertChart } from '@material-ui/icons'
import { Link } from 'react-router-dom';








export default function SimpleBottomNavigation(props) {

    const [value, setValue] = React.useState('recents')
    const user = props.user





    function handleChange(event, newValue) {
        setValue(newValue);
    }

    if (user.role === 'owner')
        return (


            <BottomNavigation value={value} onChange={handleChange}>
                <BottomNavigationAction label="Home" value="home" icon={<Home />}
                    component={Link}
                    to="/" />
                <BottomNavigationAction label="Detalles" value="detalles" icon={<InsertChart />} />
                <BottomNavigationAction label="Perfil" value="perfil" icon={<AccountBox />} component={Link}
                    to="/" />
            </BottomNavigation>

        )


    return (
        <BottomNavigation value={value} onChange={handleChange}>

            <BottomNavigationAction label="Home" value="home" icon={<Home />}
                component={Link}
                to="/" />
            <BottomNavigationAction label="QR" value="qr" icon={<AspectRatio />}
            />

            <BottomNavigationAction label="Cart" value="cart" icon={<ShoppingBasket />}
                component={Link}
                to="/" />

            <BottomNavigationAction label="Perfil" value="perfil" icon={<AccountBox />} component={Link}
                to="/" />

        </BottomNavigation>
    )
}
