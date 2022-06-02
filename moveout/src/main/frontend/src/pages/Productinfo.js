import {Link as RouterLink, useLocation, useNavigate} from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DownloadIcon from '@mui/icons-material/Download';
import { pink, yellow } from '@mui/material/colors';
// components
import Page from '../components/Page';
import Popup from '../components/Popup';
import axios from "axios";
import {GET_PRODUCTS_BY_USER, GET_SELLER_BY_EMAIL, DELETE_PRODUCT, MARK_AS_SOLD, CHECKOUT} from "../api-config";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../userContext";
import Chat from "../components/Chat";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {makeStyles} from "@mui/styles";


// ----------------------------------------------------------------------

toast.configure()

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '50vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(0, 0)
}));

const useStyles = makeStyles(theme =>({
    prdDetails:{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        padding: 50,
    },

    prdImage:{
        maxWidth: 400,
        maxHeight: 400,
        minHeight: 300,
        minWidth: 300,
        overflow: "hidden",
        margin: 25,

        "& img":{
            width: "100%",
            height: "100%",
            maxWidth: 400,
            maxHeight: 400,
            display: "block",
            objectFit: "cover",
        }
    },

    prdTable: {
        maxWidth: 400,
        minWidth: 300,
        margin: 25,

        "& h2": {
            textTransform: "uppercase",
            marginBottom: 5,
        },

        "& h3":{
            marginTop: 5,
            marginBottom: 5,
        },
        "& p":{
            marginBottom: 4,
        },
    },

    buttonRowBuyer: {
        marginTop: 10,
        marginBottom: 10,

        "& Button": {
            width: 180,
            height: 50,
            paddingTop:10,
            paddingBottom:10,
            marginRight: 5,
            marginLeft: 5
        }
    },

    buttonRowSeller: {
        marginTop: 10,
        marginBottom: 10,

        "& Button": {
            width: 180,
            height: 50,
            paddingTop:10,
            paddingBottom:10,
            marginRight: 5,
            marginLeft: 5,
        }
    },

}))

export default function Productinfo() {
    const navigate = useNavigate();
    let location = useLocation();
    const data = location.state;
    console.log(data);
    const imgSrc = `/static/mock-images/products/product_${data.product.prdimage}`;
    const [openPopup, setOpenPopup] = useState(false);
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
    let deleteButton, markAsSold, stripePayment;
    if(user.email === data.product.userid){
        deleteButton = <Button
                        variant="outlined"
                        sx={{ color: pink[500] }}
                        onClick = { handleDelete }
                        startIcon={<DeleteIcon />}>
                        Delete Product
                       </Button>
    }
    if(user.email === data.product.userid && data.product.status === 0){
        markAsSold = <Button
                        variant="outlined"
                        sx={{ color: yellow[700] }}
                        onClick = { markSold }
                        startIcon={<BeenhereIcon />}>
                        Mark As Sold
                     </Button>
    }

    if(data.product.status === 0){
        stripePayment = <StripeCheckout
            stripeKey="pk_test_51L5LumGBpmLA0jmo4weGb6D7x7MvIGlqtx45iJpxJYkd1oxhsxHaYOeTmhb91gmyTQy8zf2x8nKRiK6OeEJMbjLO00yIOsMNAr"
            token={handleToken}
            amount={data.product.prdprice * 100}
            name={data.product.prdname}
            billingAddress
            shippingAddress
        >
            <Button
                variant="contained"
                color = "success"
                startIcon={<ShoppingCartIcon />}>
                Buy Now
            </Button>
        </StripeCheckout>
    }
    async function handleToken(token, addresses) {
        const response = await axios.post(
            CHECKOUT, { data, token
            });
        const { status } = response.data;
        console.log("Response:", response.data);
        if (status === "success") {
            toast("Congrats! Your Payment has Successfully been Processed!", { type: "success" });
            {markSold()};
        } else {
            toast("Something went wrong", { type: "error" });
        }
        console.log({token, addresses});
    }
    const classes = useStyles();
    return (
        <Page title="Details">
            <Typography sx={{ textAlign: 'center', alignItems: 'center' }} variant="h3" paragraph>
                <u>Product Details</u><br />
            </Typography>
            <div className={classes.prdDetails}>
                <div className={classes.prdImage}>
                    <img src = {imgSrc}
                         alt=""
                    />
                </div>
                <div className={classes.prdTable}>
                        <h2>{data.product.prdname}</h2>
                        <h3><b>${data.product.prdprice}</b></h3>
                        <hr />
                        <h3><b>Details: </b></h3>

                        <p><b>Category:</b> {data.product.prdtype}</p>
                        <p><b>Condition:</b> {data.product.prdcondition}</p>
                        <p><b>Description:</b> {data.product.prddec}</p>
                        <hr />
                        <div className={classes.buttonRowBuyer}>
                            <Button
                                variant="contained"
                                onClick={handleOnClick}
                                startIcon={<DownloadIcon/>}>
                                Get Seller Details
                            </Button>
                            {stripePayment}
                        </div>
                        <div className={classes.buttonRowSeller}>
                            {markAsSold}
                            {deleteButton}
                        </div>

                    </div>
            </div>

            {/*<Container>*/}
            {/*    <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>*/}
            {/*        <Typography variant="h3" paragraph>*/}
            {/*            Product Details <br />*/}
            {/*        </Typography>*/}
            {/*        <Box*/}
            {/*            component="img"*/}
            {/*            src={imgSrc}*/}
            {/*            sx={{ height: 250, mx: 'auto', my: { xs: 5, sm: 2 } }}*/}
            {/*        />*/}
            {/*        <Typography variant="p" paragraph>*/}
            {/*            <br />*/}
            {/*        </Typography>*/}
            {/*        <Typography variant="h3" paragraph>*/}
            {/*            <u>Product : {data.product.prdname}</u> <br />*/}
            {/*        </Typography>*/}
            {/*        <Typography variant="h4" paragraph>*/}
            {/*            Product Category : {data.product.prdtype} <br />*/}
            {/*        </Typography>*/}
            {/*        <Typography variant="h4" paragraph>*/}
            {/*            Condition : {data.product.prdcondition} <br />*/}
            {/*        </Typography>*/}
            {/*        <Typography variant="h4" paragraph>*/}
            {/*            Price : ${data.product.prdprice} <br />*/}
            {/*        </Typography>*/}
            {/*        <Typography variant="p" paragraph>*/}
            {/*            <b>Description :</b> <i>{data.product.prddec}</i> <br />*/}
            {/*        </Typography>*/}
            {/*        <Button*/}
            {/*            size="large"*/}
            {/*            variant="contained"*/}
            {/*            onClick={handleOnClick}>*/}
            {/*          Get Seller Details*/}
            {/*        </Button>*/}
            {/*        <br />*/}
            {/*        {markAsSold} <br />*/}
            {/*        <StripeCheckout*/}
            {/*            stripeKey="pk_test_51L5LumGBpmLA0jmo4weGb6D7x7MvIGlqtx45iJpxJYkd1oxhsxHaYOeTmhb91gmyTQy8zf2x8nKRiK6OeEJMbjLO00yIOsMNAr"*/}
            {/*            token={handleToken}*/}
            {/*            amount={data.product.prdprice * 100}*/}
            {/*            name={data.product.prdname}*/}
            {/*            billingAddress*/}
            {/*            shippingAddress*/}
            {/*        />*/}
            {/*        <br/>*/}
            {/*        {deleteButton}*/}
            {/*    </ContentStyle>*/}
            {/*</Container>*/}
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
            <Chat/>
        </Page>
    );
}
