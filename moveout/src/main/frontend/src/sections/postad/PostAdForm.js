import * as Yup from 'yup';
import * as React from 'react';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField, InputLabel, Select, MenuItem, Button } from '@mui/material';

// component
import Iconify from '../../components/Iconify';
import {LoadingButton} from "@mui/lab";
import {useNavigate} from "react-router-dom";


// ----------------------------------------------------------------------

const categories = [
    {
        value: 'catFur',
        label: 'Furniture',
    },
    {
        value: 'catKitchen',
        label: 'Kitchen Supplies',
    },
    {
        value: 'catElec',
        label: 'Electronics',
    },
    {
        value: 'catClo',
        label: 'Clothes',
    },
];


export default function PostAdForm() {
    const navigate = useNavigate();

    const ProductDetailsValidation = Yup.object().shape({
        prdName: Yup.string().required('Required'),
        prdType: Yup.string().required('Required'),
        prdCondition: Yup.string().required('Required')
    });

    const formik = useFormik({
        initialValues: {
            prdName: '',
            prdType: '',
            prdCondition: '',
            prdDec: ''
        },
        validationSchema: ProductDetailsValidation,
        onSubmit: () => {
            navigate('/login', { replace: true });
        },
    });


    //const [prdName, setPrdName] = React.useState('');
    const [prdType, setPrdType] = React.useState('');
    //const [prdCondition, setPrdCondition] = React.useState('');

    // const handlePrdNameChange = (event) => {
    //     this.setState({prdName: event.target.value});
    // };

    const handleProductCategoryChange = (event) => {
        setPrdType(event.target.value);
    };

    const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

    return (
        <FormikProvider value={formik}>
            <Form noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        autoComplete="prdName"
                        id="product-name"
                        label="Product Name"
                        //value={this.state.value}
                        {...getFieldProps('prdName')}
                        error={Boolean(touched.prdName && errors.prdName)}
                        helperText={touched.prdName && errors.prdName}
                    />

                    <TextField
                        fullWidth
                        autoComplete="prdType"
                        id="product-type"
                        select
                        label="Category"
                        value={prdType}
                        onChange={handleProductCategoryChange}
                        helperText="Select product category"
                        {...getFieldProps('prdType')}
                        error={Boolean(touched.prdType && errors.prdType)}
                        helperText={touched.prdType && errors.prdType}
                    >
                        {categories.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        fullWidth
                        autoComplete="prdCondition"
                        id="product-condition"
                        label="Product Condition"
                        {...getFieldProps('prdCondition')}
                        error={Boolean(touched.prdCondition && errors.prdCondition)}
                        helperText={touched.prdCondition && errors.prdCondition}
                    />

                    <TextField
                        fullWidth
                        autoComplete="prdDec"
                        id="product-description"
                        label="Description"
                        multiline
                        rows={4}
                        {...getFieldProps('productDescription')}
                        error={Boolean(touched.prdDec && errors.prdDec)}
                        helperText={touched.prdDec && errors.prdDec}
                    />

                    <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                        Post an Ad!
                    </LoadingButton>
                </Stack>

            </Form>
        </FormikProvider>
    );
}
