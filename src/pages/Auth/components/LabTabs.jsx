import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Favourites from './Favourites';
import Comments from './Comments';
import ProfileSettings from './ProfileSettings';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { styled } from '@mui/system';
import { IoIosSettings } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaComments } from "react-icons/fa";

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
                        <StyledTab label={(
                            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <IoIosSettings />
                                Profile Settings
                            </span>
                        )} value="1" />

                        <StyledTab label={(
                            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <FaHeart />
                                Favourites
                            </span>
                        )} value="2" />

                        <StyledTab label={(
                            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <FaComments />
                                Comments
                            </span>
                        )} value="3" />
                    </TabList>
                </Box>
                <StyledTabPanel value="1">
                    <ProfileSettings/>
                </StyledTabPanel>
                <StyledTabPanel value="2">
                    <Favourites/>
                </StyledTabPanel>
                <StyledTabPanel value="3">
                    <Comments/>
                </StyledTabPanel>
            </TabContext>
        </Box>
    );
}
