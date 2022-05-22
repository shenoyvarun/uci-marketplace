import {Link as RouterLink, useLocation, useNavigate} from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
// components
import Page from '../components/Page';
import Popup from '../components/Popup';
import axios from "axios";
import {GET_PRODUCTS_BY_USER, GET_SELLER_BY_EMAIL, DELETE_PRODUCT, MARK_AS_SOLD} from "../api-config";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../userContext";

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '50vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(0, 0)
}));

export default function Productinfo() {
    const navigate = useNavigate();
    let location = useLocation();
    const data = location.state;
    console.log(data);
    const imgSrc = `/static/mock-images/products/product_${data.product.prdimage}`;
    const [openPopup, setOpenPopup] = useState(false);
    // const sellerInfo = { firstName: '',
    //                      lastName: '',
    //                      email: '',
    //                      phone: '' };
    const {sellerInfo} = useContext(UserContext);
    const [sellerInformation, setSellerInfo] = sellerInfo;
    const { userInfo } = useContext(UserContext);
    const [ user ] = userInfo
    console.log(typeof data.product.prdname);
    console.log(user.email);
    const handleDelete = (e) => {
        axios.post(DELETE_PRODUCT, data.product.id.toString())
            .then((response) => {
                console.log("Response: " , response.data)
                navigate('/dashboard/products', { replace: true });
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const markSold = (e) => {
        axios.post(MARK_AS_SOLD, data.product.id.toString())
            .then((response) => {
                console.log("Response: " , response.data)
                navigate('/dashboard/products', { replace: true });
            })
            .catch((error) => {
                console.log(error)
            })
    }


    const handleOnClick = (e) => {
        e.preventDefault();
        console.log("Passing seller email id to fetch seller details: ", data.product);
        axios.post(GET_SELLER_BY_EMAIL, data.product)
            .then((response) => {
                console.log("Response: " , response.data)
                setSellerInfo(response.data);
            })
            .catch((error) => {
                console.log(error)
            })
        setOpenPopup(true)
    };

    console.log(data.product.userid);
    console.log("Seller info: ", sellerInformation);
    let deleteButton, markAsSold;
    if(user.email === data.product.userid){
        deleteButton = <Button variant="outlined" sx={{ color: pink[500] }} onClick = { handleDelete } startIcon={<DeleteIcon />}>
            Delete Product
        </Button>
    }
    if(user.email === data.product.userid && data.product.status === 0){
        markAsSold = <Button variant="contained" color="success" size = "large" onClick = { markSold }>
            Mark As Sold
        </Button>
    }

    return (
        <Page title="Product Details">
            <Container>
                <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
                    <Typography variant="h3" paragraph>
                        Product Details <br />
                    </Typography>
                    <Box
                        component="img"
                        src={imgSrc}
                        sx={{ height: 250, mx: 'auto', my: { xs: 5, sm: 2 } }}
                    />
                    <Typography variant="p" paragraph>
                        <br />
                    </Typography>
                    <Typography variant="h3" paragraph>
                        <u>Product : {data.product.prdname}</u> <br />
                    </Typography>
                    <Typography variant="h4" paragraph>
                        Product Category : {data.product.prdtype} <br />
                    </Typography>
                    <Typography variant="h4" paragraph>
                        Condition : {data.product.prdcondition} <br />
                    </Typography>
                    <Typography variant="h4" paragraph>
                        Price : ${data.product.prdprice} <br />
                    </Typography>
                    <Typography variant="p" paragraph>
                        <b>Description :</b> <i>{data.product.prddec}</i> <br />
                    </Typography>
                    <Button
                        size="large"
                        variant="contained"
                        onClick={handleOnClick}>
                      Get Seller Details
                    </Button>
                    <br />
                    {markAsSold} <br />  {deleteButton}
                </ContentStyle>
            </Container>
            <Popup
                title = "Seller Details"
                openPopup = {openPopup}
                setOpenPopup = {setOpenPopup}
            >
                <Container>
                    <Typography variant="p" paragraph>
                        <b>Name: </b> {sellerInformation.firstName + " " + sellerInformation.lastName} <br />
                    </Typography>
                    <Typography variant="p" paragraph>
                        <b>Email Id: </b> {sellerInformation.email} <br />
                    </Typography>
                    <Typography variant="p" paragraph>
                        <b>Phone Number: </b> {sellerInformation.phoneNumber} <br />
                    </Typography>
                </Container>
            </Popup>
        </Page>
    );
}
