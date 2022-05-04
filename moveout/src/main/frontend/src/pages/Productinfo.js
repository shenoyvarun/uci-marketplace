import {Link as RouterLink, useLocation} from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
// components
import Page from '../components/Page';

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

// ----------------------------------------------------------------------
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'space-between'
//     },
//     buttonStyle: {
//         backgroundColor: 'blue',
//         width: '40%',
//         height: 40
//     }
// });


export default function Productinfo() {
    let location = useLocation();
    const data = location.state;
    const imgSrc = `/static/mock-images/products/product_${data.product.id}.jpg`;
    console.log(data);
    return (
        <Page title="Product Details">
            <Container>
                <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
                    <Typography variant="h3" paragraph>
                        Details for Product Id : {data.product.id} <br />
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
                        <u>Product : {data.product.prd_name}</u> <br />
                    </Typography>
                    <Typography variant="h4" paragraph>
                        Product Category : {data.product.prd_type} <br />
                    </Typography>
                    <Typography variant="h4" paragraph>
                        Condition : {data.product.prd_condition} <br />
                    </Typography>
                    <Typography variant="h4" paragraph>
                        Price : ${data.product.prd_price} <br />
                    </Typography>
                    <Typography variant="p" paragraph>
                        <b>Description :</b> <i>{data.product.prd_dec}</i> <br />
                    </Typography>

                    <Button to="/404" size="large" variant="contained" component={RouterLink}>
                      Get Seller Details
                    </Button>
                </ContentStyle>
            </Container>
        </Page>
    );
}
