import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useFormik } from 'formik';
import * as yup from "yup";

import CircularProgress from '@mui/material/CircularProgress';
import { apipost } from '../../../service/api';
import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLogin] = useState(false)
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const initialValues = {
    policyNumber: "",
	otp: ""
  }

  // -----------  validationSchema
  const validationSchema = yup.object({
    policyNumber: yup.string().required('Policy No is Required'),
  });
  


  const Adddata = async (values) => {
    setIsLogin(true)
    const data = values
	// const result = await apipost('user/login', data)
	const result = {
		status: 200,
		data: {	
		user:{
		_id: "123456",
		role: "user",
		firstName: "Atul",
		lastName: "Kushwaha",
		policyNo: "123456"
		}
		}
	}
    if (result && result.status === 200) {
      localStorage.setItem('user', JSON.stringify(result?.data?.user))
      localStorage.setItem('user_id', result?.data?.user?._id)
      localStorage.setItem('userRole', result?.data?.user?.role)
      localStorage.setItem('policyNo', result?.data?.user?.policyNo)
      localStorage.setItem('firstName', result?.data?.user?.firstName)
	  localStorage.setItem('token','1234');
      navigate('/dashboard/app')
    } else {
      navigate('/login')
    }
    setIsLogin(false)
  }


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      //	Adddata(values)
	  if(isOtpSent){
		Adddata(values)
	  }
	  else{
		setIsOtpSent(true)
	  }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3} mb={2}>
          <TextField
            name="policyNumber"
            label="Policy Number"
            value={formik.values.policyNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.policyNumber &&
              Boolean(formik.errors.policyNumber)
            }
            helperText={
              formik.touched.policyNumber && formik.errors.policyNumber
            }
          />
		   {isOtpSent ? (
		  <TextField
            name="otp"
            label="OTP"
            type={showOtp ? 'text' : 'password'}
            value={formik.values.otp}
            onChange={formik.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowOtp(!showOtp)} edge="end">
                    <Iconify icon={showOtp ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
		   />):(<p/>)}
        </Stack>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={!!isLoading}>
          {isLoading ? <CircularProgress /> : 'Submit'}
        </LoadingButton>
      </form>
    </>
  );
}
