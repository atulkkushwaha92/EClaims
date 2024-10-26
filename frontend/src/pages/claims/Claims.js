import { useEffect, useState } from 'react';
// @mui
import { Card, Stack, Button, Container, Typography, Box } from '@mui/material';
// components
import { useNavigate } from 'react-router-dom';
import { apiget, deleteManyApi } from '../../service/api';

const Claims = () => {

  return (
    <>
      <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" >
              Claim Details
            </Typography>
          </Stack>
      </Container>
    </>
  );
}

export default Claims