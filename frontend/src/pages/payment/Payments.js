/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
// @mui
import { Card, Stack, Button, Container, Typography, Box } from '@mui/material';
// components
import { useNavigate } from 'react-router-dom';
import { apiget, deleteManyApi } from '../../service/api';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------


const Payments = () => {

  const [PaymentsList, setPaymentsList] = useState([]);
  const [userAction, setUserAction] = useState(null)
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const navigate = useNavigate()

  const userid = localStorage.getItem('user_id')
  const userRole = localStorage.getItem("userRole")

  const fetchdata = async () => {
    const result = await apiget(userRole === "admin" ? `Payments/list` : `Payments/list/?createdBy=${userid}`)
    if (result && result.status === 200) {
      setPaymentsList(result?.data?.result)
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
              Payments Details
            </Typography>
          </Stack>
      </Container>
    </>
  );
}

export default Payments