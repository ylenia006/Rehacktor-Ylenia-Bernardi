import React, { useState } from 'react'; 
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab'; 
import { styled } from '@mui/system';
import { Reviews } from '@mui/icons-material';

export default function LabTabs() {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const StyledTab = styled(Tab)({
        color: '#fff',
        fontWeight: 400, 
        padding: '12px 24px',
        textTransform: 'none', 
        '&.Mui-selected': {
            color: '#0066ff', 
            borderRadius: '8px 8px 0 0', 
        },
        '&.Mui-focusVisible': {
            backgroundColor: '#004d40',
            borderRadius: '8px 8px 0 0', 
        },
        '&:hover': {
            backgroundColor: '#202632',
            borderRadius: '8px 8px 0 0', 
        },
    });

    const StyledTabPanel = styled(TabPanel)({
        padding: '24px', 
    });

    return (
        <Box sx={{ width: '100%' }}>
            <TabContext value={value}>
                <Box>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <StyledTab label="Profile Settings" value="1" />
                        <StyledTab label="Favourites" value="2" />
                        <StyledTab label="Comments" value="4" />
                        <StyledTab label="Reviews" value="3" />
                    </TabList>
                </Box>
                <StyledTabPanel value="1">
                    {/* <ProfileSettings/> */}
                </StyledTabPanel>
                <StyledTabPanel value="2">
                    {/* <Favourites/> */}
                </StyledTabPanel>
                <StyledTabPanel value="4">
                    {/* <Comments/> */}
                </StyledTabPanel>
                <StyledTabPanel value="3">
                    {/* <Reviews/> */}
                </StyledTabPanel>
            </TabContext>
        </Box>
    );
}
