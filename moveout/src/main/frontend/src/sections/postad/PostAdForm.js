import * as Yup from 'yup';
import * as React from 'react';
import {useContext, useState} from 'react';
import {Form, FormikProvider, useFormik} from 'formik';
// material
import {Input, InputAdornment, MenuItem, Stack, TextField} from '@mui/material';
// component
import {LoadingButton} from "@mui/lab";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {ADD_PRODUCT} from "../../api-config";
import {UserContext} from "../../userContext";

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

    const { userInfo, productInfo } = useContext(UserContext);
    const [user, setUser] = userInfo;
    const userEmailId = user;
    console.log("Current User (post ad page):" , userEmailId.email);

    const navigate = useNavigate();

    const ProductDetailsValidation = Yup.object().shape({
        prdname: Yup.string().required('Required'),
        prdType: Yup.string().required('Required'),
        prdCondition: Yup.string().required('Required'),
        prdPrice: Yup.number().required('Numeric input required'),
    });

    const [files, setFiles] = useState([]);

    const onInputChange = (e) => {
        console.log(e)
        setFiles(e.target.files)
    };

    const formik = useFormik({
        initialValues: {
            prdname: '',
            prdPrice:'',
            prdType: '',
            prdCondition: '',
            prdDec: '',
            prdImage: '',
            userId: userEmailId.email
        },
        validationSchema: ProductDetailsValidation,
        onSubmit: ( values) => {

            const data = new FormData();

            data.append('file', files[0]);
            formik.values.prdImage = files[0].name;
            console.log(formik.values.prdImage);

            axios.post('http://localhost:8000/upload', data)
                .then((response) => {
                    alert("File has been sucessfully uploaded");
                    console.log(response);
                })
                .catch((e) => {
                    console.log('Upload Error: ' + e)
                })

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
                    />

                    <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                        Publish!
                    </LoadingButton>
                </Stack>

            </Form>
        </FormikProvider>
    );
}
