import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import WidgetWrapper from 'components/WidgetWrapper';
import UserImage from 'components/UserImage';

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
                        Settings form goes here ddfsdffdsffsddfdffdsfsdfsdfsdfs
                        Settings form goes here ddfsdffdsffsddfdffdsfsdfsdfsdfs
                        Settings form goes here ddfsdffdsffsddfdffdsfsdfsdfsdfs
                        Settings form goes here ddfsdffdsffsddfdffdsfsdfsdfsdfs
                        Settings form goes here ddfsdffdsffsddfdffdsfsdfsdfsdfs
                        Settings form goes here ddfsdffdsffsddfdffdsfsdfsdfsdfs

                        Settings form goes here ddfsdffdsffsddfdffdsfsdfsdfsdfs
                        Settings form goes here ddfsdffdsffsddfdffdsfsdfsdfsdfs
                        Settings form goes here ddfsdffdsffsddfdffdsfsdfsdfsdfs
                        Settings form goes here ddfsdffdsffsddfdffdsfsdfsdfsdfs
                        Settings form goes here ddfsdffdsffsddfdffdsfsdfsdfsdfs
                        Settings form goes here ddfsdffdsffsddfdffdsfsdfsdfsdfs

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