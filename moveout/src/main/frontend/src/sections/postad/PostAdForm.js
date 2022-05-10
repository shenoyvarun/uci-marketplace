import * as Yup from 'yup';
import * as React from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField, MenuItem, InputAdornment, Button, Input } from '@mui/material';

import {useState} from 'react';
// component
import {LoadingButton} from "@mui/lab";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {ADD_PRODUCT} from "../../api-config";


// ----------------------------------------------------------------------

const categories = [
    {value: 'Furniture', label: 'Furniture',},
    {value: 'Kitchen Supplies', label: 'Kitchen Supplies',},
    {value: 'Electronics', label: 'Electronics',},
    {value: 'Apparel', label: 'Apparel',},
];

const condition = [
    {value: 'New', label: 'New',},
    {value: 'Used - Like New', label: 'Used - like new',},
    {value: 'Used - Good', label: 'Used - good',},
    {value: 'Used - Fair', label: 'Used - fair',},
];

export default function PostAdForm() {
    const navigate = useNavigate();

    const ProductDetailsValidation = Yup.object().shape({
        prdname: Yup.string().required('Required'),
        prdType: Yup.string().required('Required'),
        prdCondition: Yup.string().required('Required'),
        prdPrice: Yup.number().required('Numeric input required'),
    });

    const formik = useFormik({
        initialValues: {
            prdname: '',
            prdPrice:'',
            prdType: '',
            prdCondition: '',
            prdDec: '',
            prdImage: ''
        },
        validationSchema: ProductDetailsValidation,
        onSubmit: ( values) => {
            console.log("Passing Registration Details to Backend ", values);
            axios.post(ADD_PRODUCT, values).then((response) => {
                console.log(response);
                alert("Your Product has been Successfully Posted !");
                navigate('/dashboard/products', { replace: true });
            }).catch((error) => {
                console.log(error);
                navigate('/404', { replace: true });
            })
        },
    });

    const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

    const [files, setFiles] = useState([]);

    const onInputChange = (e) => {
        console.log(e.target.files)
        setFiles(e.target.files)
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append('file', files[0]);
        formik.values.prdImage = files[0].name;
        console.log(formik.values.prdImage);

        axios.post('http://localhost:8000/upload', data)
            .then((response) => {
                alert("File has been sucessfully uploaded");
            })
            .catch((e) => {
                console.log('Upload Error: ' + e)
            })
    };

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
                        value={formik.values.prdname}
                        variant="filled"
                        {...getFieldProps('prdname')}
                        error={Boolean(touched.prdname && errors.prdname)}
                        helperText={touched.prdname && errors.prdname}
                    />
                    <TextField
                        fullWidth
                        required
                        id="product-price"
                        type = "number"
                        label="Price"
                        onChange={formik.handleChange}
                        value={formik.values.prdname}
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

                    <Input type="file"
                           onChange={onInputChange}

                           multiple/>

                    <Button size="small" variant="contained" onClick={onSubmit}>Upload Image</Button>


                    <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                        Publish!
                    </LoadingButton>
                </Stack>

            </Form>
        </FormikProvider>
    );
}
