import * as Yup from 'yup';
import { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import axios from 'axios';
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import {LOGIN_USER} from "../../../api-config";
import {UserContext} from "../../../userContext";
// ----------------------------------------------------------------------

const headers = {
    'Content-Type': 'application/json'
}

export default function LoginForm() {

    const { userInfo, productInfo } = useContext(UserContext);
    const [user, setUser] = userInfo;
    localStorage.setItem("userDetails", null);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            remember: true,
        },
        validationSchema: LoginSchema,
        onSubmit: ( values) => {
            console.log("Passing to Backend ", values);
            axios.post(LOGIN_USER, values).then((response) => {
                console.log(response);
                setUser(response.data);
                localStorage.setItem("userDetails", JSON.stringify(response.data));
                navigate('/dashboard/products', { replace: true });
            }).catch((error) => {
                console.log(error);
                alert("Invalid Email Id / Password");
                // navigate('/login', { replace: true });
            })
        },
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };


    return (

        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        autoComplete="username"
                        type="email"
                        label="Email address"
                        {...getFieldProps('email')}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />

                    <TextField
                        fullWidth
                        autoComplete="current-password"
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        {...getFieldProps('password')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowPassword} edge="end">
                                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                    />
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                    <FormControlLabel
                        control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
                        label="Remember me"
                    />


                    <Link variant="subtitle2" component={RouterLink} to="/register">
                        Sign up?
                    </Link>
                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" >
                    Login
                </LoadingButton>
            </Form>
        </FormikProvider>
    );
}