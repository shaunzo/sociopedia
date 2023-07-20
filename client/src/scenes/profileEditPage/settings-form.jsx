import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import * as yup from 'yup';
import { Typography, TextField, Box, useTheme, Button, Alert } from '@mui/material';
import { Formik } from 'formik';
import Loader from 'components/Loader';
import { setUser } from 'state';

const settingsSchema = yup.object().shape({
    firstName: yup.string().required('required'),
    lastName: yup.string().required('required'),
    email: yup.string().email('invalid email').required('required'),
    location: yup.string().required('required'),
    occupation: yup.string().required('required'),
});

const SettingsForm = () => {

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const { palette } = useTheme();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);

    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const initialValues = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        location: user.location,
        occupation: user.occupation
    }

    const hideAlerts= () => {
        setShowError(false);
        setShowUpdateSuccess(false);
    }

    const handleFormSubmit = async(values) => {

        try {
            setShowError(false);
            setShowUpdateSuccess(false);
            setIsLoading(true);

            const response = await fetch(
                `${BASE_URL}/users/${user._id}/edit`,
                {
                  method: "PATCH",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values)
                }
            );

            const updatedUser = await response.json();

            if(updatedUser) {
                setIsLoading(false);
                setShowUpdateSuccess(true);
                dispatch(
                    setUser({
                        user: updatedUser
                    })
                )

                setTimeout(() => hideAlerts(), 3000);
            }

        } catch (err) {
            setIsLoading(false);
            setShowError(true);
            console.error('Error updating user: ', err);
            setTimeout(() => hideAlerts(), 3000);
        }
  
    }

    return (
        isLoading ? 
        <Box display={`flex`} justifyContent={`center`} alignItems={`center`}>
            <Loader/>
        </Box>
        :
        <>        
            <Typography
            fontWeight='500'
            variant='h2'
            sx={{mb: '1rem'}}>
                Edit Info
            </Typography>

            <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={settingsSchema}>
                {
                    ({
                        values,
                        errors,
                        touched,
                        isValid,
                        handleBlur,
                        handleChange,
                        handleSubmit
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display={`flex`}
                                flexDirection={`column`}
                                rowGap={`30px`}
                                pb={`20px`}>

                                    <TextField
                                        label='First Name'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.firstName}
                                        name='firstName'
                                        error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                        helperText={touched.firstName && errors.firstName}
                                    />

                                    <TextField
                                        label='Last Name'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lastName}
                                        name='lastName'
                                        error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                        helperText={touched.lastName && errors.lastName}
                                    />

                                <TextField 
                                    label='Email'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name='email'
                                    error={Boolean(touched.email) && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />

                                <TextField 
                                    label='Location'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name='location'
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                />

                                <TextField 
                                    label='Occupation'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.occupation}
                                    name='occupation'
                                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                    helperText={touched.occupation && errors.occupation}
                                />

                                { showError ? <Alert severity="error" onClose={() => setShowError(false)}>An error occured while updating your info.</Alert> : <></> }
                                { showUpdateSuccess ? <Alert severity="success" onClose={() => setShowUpdateSuccess(false)}>Info updated.</Alert> : <></> }
                                

                                <Box display={`flex`} justifyContent={`flex-end`}>
                                    <Button
                                    type="submit"
                                    disabled={!isValid}
                                    sx={{
                                        p: '1rem',
                                        backgroundColor: palette.primary.main,
                                        color: palette.background.alt,
                                        '&:hover': { color: palette.primary.main }
                                    }}>
                                        Update
                                    </Button>
                                </Box>
                            </Box>
                        </form>
                    )
                }

            </Formik>
        </>
    )
}

export default SettingsForm;