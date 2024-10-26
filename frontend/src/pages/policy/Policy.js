/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
// @mui
import { Card, Stack, Button, Container, Typography, Box, Grid } from '@mui/material';
// components
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'
import { apiget, deleteManyApi } from '../../service/api';
import Palette from '../../theme/palette'
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------


const Policy = () => {

  const [policyList, setPolicyList] = useState([]);
  const [userAction, setUserAction] = useState(null)
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const navigate = useNavigate()

  const userid = localStorage.getItem('user_id')
  const userRole = localStorage.getItem("userRole")
const data = [];
  const fetchdata = async () => {
    const result = await apiget(userRole === "admin" ? `policy/list` : `policy/list/?createdBy=${userid}`)
    if (result && result.status === 200) {
      setPolicyList(result?.data?.result)
    }
  }

  useEffect(() => {
    fetchdata();
  }, [userAction])

  return (
    <>
      <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" >
              Policy Details
            </Typography>
          </Stack>
		   <div>
      <Card style={{ borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}>
        <Box p={3}>
          <Grid container display="flex" spacing={4}>
            <Grid item xs={12} sm={6}>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                <Typography variant="body1">Policy number :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>{data?.policyNumber ? data?.policyNumber : "--"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400], }} py={2}>
                <Typography variant="body1">Policy type :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.policyType ? data?.policyType : "--"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Policy start date :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >
                  {
                    data?.policyStartDate ? dayjs(data?.policyStartDate).format("DD/MM/YYYY") : "--"
                  }
                </Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400], }} py={2}>
                <Typography variant="body1">Deductibles :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.deductibles ? data?.deductibles : "--"}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                <Typography variant="body1">Policy end date :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >
                  {
                    data?.policyEndDate ? dayjs(data?.policyEndDate).format("DD/MM/YYYY") : "--"
                  }
                </Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Policy status :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.policyStatus ? data?.policyStatus : "--"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Coverage Amounts  :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.coverageAmounts ? data?.coverageAmounts : "--"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Limits  :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.limits ? data?.limits : "--"}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
      </Container>
    </>
  );
}

export default Policy