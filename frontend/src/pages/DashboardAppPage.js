/* eslint-disable react-hooks/exhaustive-deps */
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import { useEffect, useState } from 'react';
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { apiget } from '../service/api';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();


  const [totalClaims, setTotalClaims] = useState([])
  const userid = localStorage.getItem('user_id');
  const userRole = localStorage.getItem("userRole")


  // Claims api
  const fetchClaims = async () => {
    const result = await apiget(userRole === 'admin' ? `claims/list` : `claims/list/?createdBy=${userid}`)
    if (result && result.status === 200) {
      setTotalClaims(result?.data?.total_records)
    }
  }

  useEffect(() => {
    fetchClaims();
  }, [])
  return (
    <>
      <Helmet>
        {/* <title> Dashboard | Minimal UI </title> */}
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back 
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="No of Claims" total="1" color="warning" icon={'ic:baseline-policy'} />
          </Grid>
          <Grid item>
            <AppOrderTimeline
              title="Recent Claim Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  'Payment Reminder #XF-2346',
                  'Payment Requested #XF-2346',
                  'Adjustor Approved #XF-2346',
                  'Surveyor Approved #XF-2346',
                  'Claim Initiated #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
