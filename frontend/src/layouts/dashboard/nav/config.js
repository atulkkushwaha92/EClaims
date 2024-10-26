// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;


const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Policy Management',
    path: '/dashboard/policy',
    icon: icon('ic_policy'),
  },
  {
    title: 'Tasks',
    path: '/dashboard/task',
    icon: icon('ic_task'),
  },
  {
    title: 'Emails',
    path: '/dashboard/email',
    icon: icon('ic_email'),
  },
  {
    title: 'Calendar',
    path: '/dashboard/calendar',
    icon: icon('ic_calendar'),
  },
  {
    title: 'Document Management',
    path: '/dashboard/document',
    icon: icon('ic_document'),
  },
  {
    title: 'User Management',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  }

  // {
  //   title: 'History',
  //   path: '/dashboard/history',
  //   icon: icon('ic_history'),
  // },

];

export default navConfig;
