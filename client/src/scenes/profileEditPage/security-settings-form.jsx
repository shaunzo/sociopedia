import * as yup from 'yup';
import { useTheme, Box, Typography, TextField, Alert, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Loader from 'components/Loader';
import { Formik } from 'formik';

const securitySchema = yup.object().shape({
    oldPassword: yup.string().required('required'),
    password: yup.string().required('required'),
    confirmPassword: yup.string().required('required')
});

const SecuritySettingsForm = () => {

    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const { palette } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);

    const {_id} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const initialValues = {
        oldPassword: '',
        password: '',
        confirmPassword: ''
    }

    const hideAlerts= () => {
        setShowError(false);
        setShowUpdateSuccess(false);
    }

    const handleFormSubmit = async (values) => {

        try {
            console.log(values);
            setShowError(false);
            setShowUpdateSuccess(false);
            setIsLoading(true);

            const response = await fetch(
                `${BASE_URL}/users/${_id}/passwordUpdate`,
                {
                  method: "PATCH",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values)
                }
            );

            const updatedRes = await response.json();
            
            setIsLoading(false);
            updatedRes?.msg === 'Old password does not match' ? setShowError(true) : setShowUpdateSuccess(true);

            setTimeout(() => hideAlerts(), 3000);

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
                Edit Security
            </Typography>

            <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={securitySchema}>
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
                                    label='Old Password'
                                    type='password'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.oldPassword}
                                    name='oldPassword'
                                    error={Boolean(touched.oldPassword) && Boolean(errors.oldPassword)}
                                    helperText={touched.oldPassword && errors.oldPassword}
                                />

                                <TextField
                                    label='New Password'
                                    type='password'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name='password'
                                    error={Boolean(touched.password) && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                />

                                <TextField
                                    label='Confirm New Password'
                                    type='password'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.confirmPassword}
                                    name='confirmPassword'
                                    error={Boolean(touched.confirmPassword) && Boolean(errors.confirmPassword)}
                                    helperText={touched.confirmPassword && errors.confirmPassword}
                                />

                                { showError ? <Alert severity="error" onClose={() => setShowError(false)}>Unable to update your password, please enter your old password correctly.</Alert> : <></> }
                                { showUpdateSuccess ? <Alert severity="success" onClose={() => setShowUpdateSuccess(false)}>Password successfully updated.</Alert> : <></> }
                                { values.password !== values.confirmPassword && touched.confirmPassword && touched.password ? <Alert severity="warning">Password and Confirm Password does not match.</Alert> : <></> }

                                <Box display={`flex`} justifyContent={`flex-end`}>
                                    <Button
                                    type="submit"
                                    disabled={(!isValid | (values.password !== values.confirmPassword && touched.confirmPassword && touched.password) | Object.keys(touched).length === 0)}
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

export default SecuritySettingsForm;