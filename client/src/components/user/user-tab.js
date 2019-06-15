import React from 'react'
import { Tab, AppBar, Tabs, Typography } from "@material-ui/core";
import UserMenu from './user-menu'


function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    )
}

export default function SimpleTabs() {

    const [value, setValue] = React.useState(0);

    function handleChangeTab(event, newValue) {
        setValue(newValue);
    }

    return (
        <div >
            <AppBar position="static" >
                <Tabs value={value} onChange={handleChangeTab}>
                    <Tab label="Entrante" />
                    <Tab label="Segundo" />
                    <Tab label="Bebidas" />
                    <Tab label="Postres" />
                </Tabs>
            </AppBar>
            {value === 0 && <TabContainer><UserMenu type={'first-courses'} /> </TabContainer>}
            {value === 1 && <TabContainer>Segundo</TabContainer>}
            {value === 2 && <TabContainer>Bebidas</TabContainer>}
            {value === 3 && <TabContainer>Postres</TabContainer>}
        </div>
    );
}
