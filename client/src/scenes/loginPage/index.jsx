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
                display={`flex`}
                flexDirection={`column`}
                justifyContent={`center`}
                alignItems={`center`}>

                    <Box width={ isNonMobileScreens ? '33%' : '100%'}>
                        <Form/>
                    </Box>

                </Box>

                <Box
                flexBasis={ isNonMobileScreens ? '50%' : '30%' }
                backgroundColor={ theme.palette.background.alt }
                sx={{
                    backgroundImage: "url('../assets/welcome.jpg')",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center'
                }}
                height={`100%`}>
                </Box>
            </Box>
};

export default LoginPage;