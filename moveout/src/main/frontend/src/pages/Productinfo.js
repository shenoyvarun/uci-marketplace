import {Link as RouterLink, useLocation} from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box, Stack } from '@mui/material';
// components
import Page from '../components/Page';
import Popup from '../components/Popup';
import axios from "axios";
import {GET_SELLER_BY_EMAIL} from "../api-config";
import {useContext, useState} from "react";
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
    console.log("Seller info: ", sellerInformation);
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
