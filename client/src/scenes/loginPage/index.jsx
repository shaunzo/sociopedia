import { Box, useTheme, useMediaQuery } from "@mui/material";
import Form from './Form';

const LoginPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    
    return <Box
            display='flex'
            flexDirection={ isNonMobileScreens ? 'row' : 'column-reverse' }
            gap={`15px`}
            alignItems={`center`}
            height={`100%`}>

                <Box
                flexBasis={ isNonMobileScreens ? '50%' : '70%' }
                width={ isNonMobileScreens ? '50%' : '70%' }
                display={`flex`}
                flexDirection={`column`}
                justifyContent={`center`}
                alignItems={`center`}>

                    <Box width={ isNonMobileScreens ? '40%' : '100%'}>
                        <Form/>
                    </Box>

                </Box>

                <Box
                flexBasis={ isNonMobileScreens ? '50%' : '30%' }
                backgroundColor={ theme.palette.background.alt }
                width={`100%`}
                display={`flex`}
                justifyContent={`flex-end`}
                alignItems={`flex-start`}
                sx={{
                    backgroundImage: "url('../assets/welcome.jpg')",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center'
                }}
                height={`100%`}>

                    <Box
                    display={`block`}
                    width={`200px`}
                    height={`200px`}
                    m={`20px 40px`}>
                        <img src="/assets/logo-white.svg" alt="Sociopedia" />
                    </Box>
                </Box>
            </Box>
};

export default LoginPage;