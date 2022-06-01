import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import {useContext, useEffect, useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import {UserContext} from "../userContext";
import axios from "axios";
import {GET_PRODUCTS, GET_PRODUCTS_BY_NAME, GET_PRODUCTS_BY_USER, GET_PRODUCTS_BY_USER_SOLD} from "../api-config";
import {ProductList} from "../sections/@dashboard/products";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const { userInfo, productInfo, soldProducts } = useContext(UserContext);
  const [prodInfo, setprodInfo] = productInfo;
  const [soldProductsInfo, setsoldProductsInfo] = soldProducts;
  const [ user ] = userInfo;
  useEffect(() =>{
    axios.post(GET_PRODUCTS_BY_USER, user.email).then((response) => {
      console.log(response.data);
      setprodInfo(response.data);
      console.log(productInfo);
    }).catch((error) => {
      console.log(error);
    })
    axios.post(GET_PRODUCTS_BY_USER_SOLD, user.email).then((response) => {
      console.log(response.data);
      setsoldProductsInfo(response.data);
      console.log(soldProductsInfo);
    }).catch((error) => {
      console.log(error);
    })
  }, []);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  let addText;
  if(productInfo[0].length === 0){
    addText = "Start selling all the stuff you don't need!!"
  }

  let soldText;
  if(soldProductsInfo.length === 0){
    soldText = "Not sold anything yet!"
  }
  return (
    <Page title="User">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Active Products Listed by the User
        </Typography>
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          </Stack>
        </Stack>
          {addText}
        <ProductList products={prodInfo} />
      </Container>
      <br /><br /><br /><br />
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Sold Products Listed by the User
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          </Stack>
        </Stack>
        <Typography>
          {soldText}
        </Typography>
        <ProductList products={soldProductsInfo} />
      </Container>
    </Page>
  );
}
