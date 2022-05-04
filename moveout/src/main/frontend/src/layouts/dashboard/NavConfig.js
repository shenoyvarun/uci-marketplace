// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Post Ad',
    path: '/dashboard/postad',
    icon: getIcon('eva:file-add-fill'),
  },
  {
    title: 'Log out',
    path: '/login',
    icon: getIcon('eva:log-in-fill'),
  },
];

export default navConfig;
