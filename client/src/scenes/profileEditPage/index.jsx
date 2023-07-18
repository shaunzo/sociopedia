import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import WidgetWrapper from 'components/WidgetWrapper';

const ProfileEditPage = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const theme = useTheme();

    const getUser = async () => {
        const response = await fetch(`${BASE_URL}/users/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
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

                <Box display={`block`} width={`200px`}>
                    <Box
                    sx={{
                        padding: '1.5rem 1.5rem 0.75rem 1.5rem',
                        backgroundColor: theme.palette.background.alt,
                        borderRadius: '0.75rem'
                    }}>
                        Avatar settings Widget
                    </Box>
                </Box>

                <WidgetWrapper width={`500px`}>
                    <Box
                    mt={isNonMobileScreens ? undefined : "2rem"}
                    >
                        Settings form goes here ddfsdffdsffsddfdffdsfsdfsdfsdfs
                        Settings form goes here ddfsdffdsffsddfdffdsfsdfsdfsdfs
                        Settings form goes here ddfsdffdsffsddfdffdsfsdfsdfsdfs
                        Settings form goes here ddfsdffdsffsddfdffdsfsdfsdfsdfs
                        Settings form goes here ddfsdffdsffsddfdffdsfsdfsdfsdfs
                        Settings form goes here ddfsdffdsffsddfdffdsfsdfsdfsdfs
                    </Box>
                </WidgetWrapper>


            </Box>
        </Box>
    )
}

export default ProfileEditPage;