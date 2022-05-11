import {useState, useEffect, useContext} from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import axios from "axios";
import {GET_PRODUCTS} from "../api-config";
import {UserContext} from "../userContext";

// ----------------------------------------------------------------------

export default function EcommerceShop() {

    const { userInfo, productInfo } = useContext(UserContext);
    const [prodInfo, setprodInfo] = productInfo;
  useEffect(() =>{
    axios.get(GET_PRODUCTS)
        .then(res => {
          setprodInfo(res.data);
          console.log(res.data);
          console.log(res.data.map(info =>(
              info.prdname
          )));
        })
  }, []);

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };



  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            {/*<ProductFilterSidebar*/}
            {/*  isOpenFilter={openFilter}*/}
            {/*  onOpenFilter={handleOpenFilter}*/}
            {/*  onCloseFilter={handleCloseFilter}*/}
            {/*/>*/}
            {/*<ProductSort />*/}
          </Stack>
        </Stack>

        <ProductList products={prodInfo} />
        {/*<ProductCartWidget />*/}
      </Container>
    </Page>
  );
}
