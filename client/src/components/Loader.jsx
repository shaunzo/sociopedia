import { Box, useTheme } from "@mui/material";

const Loader = () => {

    const theme = useTheme();

    const loaderStyles = {
        boxSizing: `border-box`,
        display: `block`,
        position: `absolute`,
        width: `50px`,
        height: `50px`,
        margin: `5px`,
        border: `5px solid ${theme.palette.primary.main}`,
        borderRadius: `50%`,
        animation: `lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
        borderColor: `${theme.palette.primary.main} transparent transparent transparent`,
    }

    return (
        <Box
        display={`inline-block`}
        position={`relative`}
        width={`50px`}
        height={`50px`}>

            <Box sx={loaderStyles}></Box>
            <Box sx={loaderStyles}></Box>
            <Box sx={loaderStyles}></Box>
            <Box sx={loaderStyles}></Box>

        </Box>
    )
}

export default Loader;