import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/Label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { id, prd_condition, prd_dec, prd_name, prd_price, prd_type, cover } = product;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
          <Label
            variant="filled"
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
          </Label>
        <ProductImgStyle alt={prd_name} src={`/static/mock-images/products/product_${id}.jpg`} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={`/productinfo`} state = {{ product }}  color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {prd_name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">

          <Typography variant="subtitle1">
            {/*<Typography*/}
            {/*  component="span"*/}
            {/*  variant="body1"*/}
            {/*  sx={{*/}
            {/*    color: 'text.disabled',*/}
            {/*    textDecoration: 'line-through',*/}
            {/*  }}*/}
            {/*>*/}
            {/*  {prd_price && fCurrency(prd_price)}*/}
            {/*</Typography>*/}
            &nbsp;
            {fCurrency(prd_price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
