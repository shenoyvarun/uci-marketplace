import * as Yup from 'yup';
import * as React from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField, MenuItem } from '@mui/material';

// component
import {LoadingButton} from "@mui/lab";
import {useNavigate} from "react-router-dom";


// ----------------------------------------------------------------------

const categories = [
    {value: 'catFur', label: 'Furniture',},
    {value: 'catKitchen', label: 'Kitchen Supplies',},
    {value: 'catElec', label: 'Electronics',},
    {value: 'catClo', label: 'Clothes',},
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
        onSubmit: values => {
            console.log('Form data', values)
        },
    });

    const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

    return (
        <FormikProvider value={formik}>
            <Form noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        id="product-name"
                        type = "text"
                        label="Product Name"
                        onChange={formik.handleChange}
                        value={formik.values.prdName}
                        {...getFieldProps('prdName')}
                        error={Boolean(touched.prdName && errors.prdName)}
                        helperText={touched.prdName && errors.prdName}
                    />

                    <TextField
                        fullWidth
                        id="product-type"
                        select
                        label="Category"
                        type = "text"
                        value={formik.values.prdType}
                        onChange={formik.handleChange}
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
                        id="product-condition"
                        label="Product Condition"
                        type = "text"
                        onChange={formik.handleChange}
                        value={formik.values.prdCondition}
                        {...getFieldProps('prdCondition')}
                        error={Boolean(touched.prdCondition && errors.prdCondition)}
                        helperText={touched.prdCondition && errors.prdCondition}
                    />

                    <TextField
                        fullWidth
                        id="product-description"
                        label="Description"
                        type = "text"
                        multiline
                        rows={4}
                        onChange={formik.handleChange}
                        value={formik.values.prdDec}
                        {...getFieldProps('prdDec')}
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
