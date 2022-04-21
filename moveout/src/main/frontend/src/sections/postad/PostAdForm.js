import * as Yup from 'yup';
import * as React from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField, MenuItem, InputAdornment } from '@mui/material';

// component
import {LoadingButton} from "@mui/lab";
import {useNavigate} from "react-router-dom";


// ----------------------------------------------------------------------

const categories = [
    {value: 'furniture', label: 'Furniture',},
    {value: 'kitchen', label: 'Kitchen Supplies',},
    {value: 'electronics', label: 'Electronics',},
    {value: 'clothes', label: 'Clothes',},
];

const condition = [
    {value: 'new', label: 'New',},
    {value: 'used_lnew', label: 'Used - like new',},
    {value: 'used_good', label: 'Used - good',},
    {value: 'used_fair', label: 'Used - fair',},
];

export default function PostAdForm() {
    const navigate = useNavigate();

    const ProductDetailsValidation = Yup.object().shape({
        prdName: Yup.string().required('Required'),
        prdType: Yup.string().required('Required'),
        prdCondition: Yup.string().required('Required'),
        prdPrice: Yup.number().required('Numeric input required'),
    });

    const formik = useFormik({
        initialValues: {
            prdName: '',
            prdPrice:'',
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
                        required
                        id="product-name"
                        type = "text"
                        label="Product Name"
                        onChange={formik.handleChange}
                        value={formik.values.prdName}
                        variant="filled"
                        {...getFieldProps('prdName')}
                        error={Boolean(touched.prdName && errors.prdName)}
                        helperText={touched.prdName && errors.prdName}
                    />
                    <TextField
                        fullWidth
                        required
                        id="product-price"
                        type = "number"
                        label="Price"
                        onChange={formik.handleChange}
                        value={formik.values.prdName}
                        variant="filled"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        {...getFieldProps('prdPrice')}
                        error={Boolean(touched.prdPrice && errors.prdPrice)}
                        helperText={touched.prdPrice && errors.prdPrice}
                    />
                    <TextField
                        fullWidth
                        required
                        id="product-type"
                        label="Category"
                        type = "text"
                        select
                        value={formik.values.prdType}
                        onChange={formik.handleChange}
                        variant="filled"
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
                        required
                        id="product-condition"
                        label="Condition"
                        type = "text"
                        select
                        onChange={formik.handleChange}
                        value={formik.values.prdCondition}
                        variant="filled"
                        {...getFieldProps('prdCondition')}
                        error={Boolean(touched.prdCondition && errors.prdCondition)}
                        helperText={touched.prdCondition && errors.prdCondition}
                    >
                        {condition.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        fullWidth
                        id="product-description"
                        label="Description"
                        type = "text"
                        multiline
                        rows={4}
                        onChange={formik.handleChange}
                        value={formik.values.prdDec}
                        variant="filled"
                        {...getFieldProps('prdDec')}
                        error={Boolean(touched.prdDec && errors.prdDec)}
                        helperText={touched.prdDec && errors.prdDec}
                    />

                    <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                        Publish!
                    </LoadingButton>
                </Stack>

            </Form>
        </FormikProvider>
    );
}
