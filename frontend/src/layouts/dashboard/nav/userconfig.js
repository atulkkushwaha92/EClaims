// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;


const UserConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'My Policy',
    path: '/dashboard/policy',
    icon: icon('ic_document'),
  },
  {
    title: 'Claim Intimation',
    path: '/dashboard/claiminitiation',
    icon: icon('ic_contact'),
  },
  {
    title: 'My Claims',
    path: '/dashboard/claims',
    icon: icon('ic_policy'),
  },
  {
    title: 'Policy Payment',
    path: '/dashboard/payment',
    icon: icon('ic_task'),
  },
  {
    title: 'My Messages',
    path: '/dashboard/email',
    icon: icon('ic_email'),
  }
];

export default UserConfig;
