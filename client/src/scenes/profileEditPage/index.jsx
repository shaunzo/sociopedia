import { Box, Typography, useMediaQuery, useTheme, Tabs, Tab, Divider } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import WidgetWrapper from 'components/WidgetWrapper';
import UserImage from 'components/UserImage';
import SettingsForm from './settings-form';
import SecuritySettingsForm from "./security-settings-form";

const ProfileEditPage = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const theme = useTheme();
    const user = useSelector((state) => state.user);

    const handleTabChange  = (event, newIndex) => {
        setActiveTabIndex(newIndex)
    }

    const  a11yProps = (index) => {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    
    if (!user) return null;

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 0"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center">

                <Box display={`block`} width={`300px`}>
                    <Box
                    textAlign={`center`}
                    sx={{
                        padding: '1.5rem',
                        backgroundColor: theme.palette.background.alt,
                        borderRadius: '0.75rem'
                    }}>

                        <Typography
                        variant="h2"
                        align="center"
                        fontWeight={`700`}
                        mb={`20px`}>
                            {user.firstName} <br/>
                            {user.lastName}
                        </Typography>

                        <Typography color={theme.palette.grey[700]} mb={`25px`}>
                            {user.email}
                        </Typography>

                        <Box
                            width={`100%`}
                            display={`flex`}
                            justifyContent={`center`}
                            alignItems={`cengter`}>
                            <UserImage image={user.picturePath} size={`150px`} />
                        </Box>

                    </Box>
                </Box>

                <WidgetWrapper width={`500px`}>
                    <Box
                    mt={isNonMobileScreens ? undefined : "2rem"}
                    >
                        <Tabs
                            sx={{marginBottom: '20px'}}
                            value={activeTabIndex}
                            onChange={handleTabChange}
                            aria-label="Settings Tabs">

                            <Tab label="Personal Info" {...a11yProps(0)} />
                            <Tab label="Security" {...a11yProps(1)} />
                            <Tab label="Social" {...a11yProps(1)} />
                        </Tabs>

                        <Divider sx={{marginBottom: '20px'}} />

                        { activeTabIndex === 0 ? <SettingsForm /> : <></>}
                        { activeTabIndex === 1 ? <SecuritySettingsForm/> : <></> }
                    </Box>
                </WidgetWrapper>


            </Box>
        </Box>
    )
}

export default ProfileEditPage;