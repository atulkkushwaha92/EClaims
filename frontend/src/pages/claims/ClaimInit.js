import { useEffect, useState } from 'react';
// @mui
import { Card, Stack, Button, Container, Typography, Box, FormLabel } from '@mui/material';
// components
import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import { useFormik } from "formik";
import * as yup from "yup";
import { apipost } from "../../service/api";

const ClaimInit = () => {
	
    const userid = localStorage.getItem('user_id');
	const user = JSON.parse(localStorage.getItem('user'))
	const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  
	// -----------  validationSchema
    const validationSchema = yup.object({
        file: yup.string().required("File is required"),
        claimdetails: yup.string().required("Claim Details is required")
    });

    // -----------   initialValues
    const initialValues = {
        file: "",
        claimdetails: "",
        createdBy: userid
    };
	
	// formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            fileUpload(values)
        },
    });
	 // add contact api
    const fileUpload = async (values) => {
    const url = 'http://localhost:9091/engine-rest/process-definition/key/Process_0wtg2ed/start';
    const data = {
      variables: {
        PolicyNo: { value: user.policyNo, type: 'String' },
        CustomerName: { value: user.firstName, type: 'String' },
        PolicyEndDate: { value: '2025-10-30', type: 'String' }
      },
      businessKey: user.policyNo
    };

    const options = {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ZGVtbzpkZW1v',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const json = await res.json();
      setResponse(json);
	  alert('Claim Initiated');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" >
              Claim Intimation
            </Typography>
          </Stack>
		   <form encType="multipart/form-data">
                        <Grid
                            container
                            rowSpacing={3}
                            columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                        >
						 <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Claim Details</FormLabel>
                                <TextField
                                    id="claimdetails"
                                    name="claimdetails"
                                    size="small"
                                    fullWidth
									multiline
									rows={4}
                                    value={formik.values.claimdetails}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.claimdetails && Boolean(formik.errors.claimdetails)
                                    }
                                    helperText={formik.touched.claimdetails && formik.errors.claimdetails}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Upload File</FormLabel>
                                <TextField
                                    id="file"
                                    name="file"
                                    size="small"
                                    maxRows={10}
                                    fullWidth
                                    type="file"
                                    multiple
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(event) => {
                                        formik.setFieldValue("file", event.currentTarget.files[0]);
                                    }}
                                    error={
                                        formik.touched.file &&
                                        Boolean(formik.errors.file)
                                    }
                                    helperText={
                                        formik.touched.file && formik.errors.file
                                    }
                                />
                            </Grid>
							<Grid item xs={12} sm={12} md={12}>
							<Button
                        type="submit"
                        variant="contained"
                        onClick={formik.handleSubmit}
                        style={{ textTransform: "capitalize" }}
							// startIcon={<FiSave />}
						>
                        Submit
                    </Button>
							</Grid>
							
                        </Grid>
						
                    </form>
      </Container>
    </>
  );
}

export default ClaimInit