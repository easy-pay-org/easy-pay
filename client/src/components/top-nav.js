import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import KeyLeft from '@material-ui/icons/KeyboardArrowLeft'
import Badge from '@material-ui/core/Badge'
import NotificationsIcon from '@material-ui/icons/Notifications'

const TopNav = () => {

    return (
        <AppBar position="static" color="default" >
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="back">
                    <KeyLeft />
                </IconButton>
                <img src='../../img/logo.png' alt="logo" className="logo" />
                <IconButton aria-label="Show 11 new notifications" color="inherit">
                    <Badge badgeContent={2} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>

    )
}

export default TopNav