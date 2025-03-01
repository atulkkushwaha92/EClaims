/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import { useFormik } from "formik";
import * as yup from "yup";
import FormLabel from "@mui/material/FormLabel";
import { useEffect, useState } from "react";

import { apiget, apiput } from "../../service/api";
// import { FiSave } from "react-icons/fi";
// import { GiCancel } from "react-icons/gi";

const Edit = (props) => {

    const { handleClose, open, id, fetchUser } = props
    const [userDetails, setUserDetails] = useState({});

    // -----------  validationSchema
    const validationSchema = yup.object({
        firstName: yup.string().required("First Name is required"),
        lastName: yup.string().required("Last Name is required"),
        emailAddress: yup.string().email('Invalid email').required("Email is required"),
        address: yup.string().required("Address is required"),
        city: yup.string().required("City is required"),
        state: yup.string().required("State is required"),
        country: yup.string().required("Country is required")
    });

    // -----------   initialValues
    const initialValues = {
        firstName: userDetails?.firstName,
        lastName: userDetails?.lastName,
        emailAddress: userDetails?.emailAddress,
        address: userDetails?.address,
        state: userDetails?.state,
        city: userDetails?.city,
        country: userDetails?.country,
        modifiedOn: ""
    };

    // fetch api
    const fetchdata = async () => {
        const result = await apiget(`user/view/${id}`)
        if (result && result.status === 200) {
            setUserDetails(result.data)
        }
    }

    // edit api
    const EditUser = async (values) => {
        let data = values;
        const result = await apiput(`user/edit/${id}`, data)
        if (result && result.status === 200) {
            handleClose();
            fetchUser();
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const userData = {
                firstName: values.firstName,
                lastName: values.lastName,
                emailAddress: values.emailAddress,
                address: values.address,
                state: values.state,
                city: values.city,
                country: values.country,
                modifiedOn: new Date()
            }
            EditUser(userData)
        },
    });

    useEffect(() => {
        fetchdata();
    }, [])
    return (
        <div>
            <Dialog
                open={open}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle
                    id="scroll-dialog-title"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="h6">Edit </Typography>
                    <Typography>
                        <ClearIcon
                            onClick={handleClose}
                            style={{ cursor: "pointer" }}
                        />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid
                            container
                            rowSpacing={3}
                            columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                        >
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>First Name</FormLabel>
                                <TextField
                                    id="firstName"
                                    name="firstName"
                                    size="small"
                                    maxRows={10}
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={
                                        formik.touched.firstName &&
                                        Boolean(formik.errors.firstName)
                                    }
                                    helperText={
                                        formik.touched.firstName && formik.errors.firstName
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Last name</FormLabel>
                                <TextField
                                    id="lastName"
                                    name="lastName"
                                    size="small"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={
                                        formik.touched.lastName && Boolean(formik.errors.lastName)
                                    }
                                    helperText={
                                        formik.touched.lastName && formik.errors.lastName
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Email</FormLabel>
                                <TextField
                                    id="emailAddress"
                                    name="emailAddress"
                                    size="small"
                                    value={formik.values.emailAddress}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={
                                        formik.touched.emailAddress &&
                                        Boolean(formik.errors.emailAddress)
                                    }
                                    helperText={
                                        formik.touched.emailAddress && formik.errors.emailAddress
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Address</FormLabel>
                                <TextField
                                    id="address"
                                    name="address"
                                    size="small"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={
                                        formik.touched.address && Boolean(formik.errors.address)
                                    }
                                    helperText={
                                        formik.touched.address && formik.errors.address
                                    }
                                />
                            </Grid>
							<Grid item xs={12} sm={12} md={12}>
                                <FormLabel>City</FormLabel>
                                <TextField
                                    id="city"
                                    name="city"
                                    size="small"
                                    value={formik.values.city}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={
                                        formik.touched.city && Boolean(formik.errors.city)
                                    }
                                    helperText={
                                        formik.touched.city && formik.errors.city
                                    }
                                />
                            </Grid>
							<Grid item xs={12} sm={12} md={12}>
                                <FormLabel>State</FormLabel>
                                <TextField
                                    id="state"
                                    name="state"
                                    size="small"
                                    value={formik.values.state}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={
                                        formik.touched.state && Boolean(formik.errors.state)
                                    }
                                    helperText={
                                        formik.touched.state && formik.errors.state
                                    }
                                />
                            </Grid>
							<Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Country</FormLabel>
                                <TextField
                                    id="country"
                                    name="country"
                                    size="small"
                                    value={formik.values.country}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={
                                        formik.touched.country && Boolean(formik.errors.country)
                                    }
                                    helperText={
                                        formik.touched.country && formik.errors.country
                                    }
                                />
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={formik.handleSubmit}
                        style={{ textTransform: "capitalize" }}
                    >
                        Save
                    </Button>
                    <Button
                        type="reset"
                        variant="outlined"
                        color="error"
                        style={{ textTransform: "capitalize" }}
                        onClick={() => {
                            formik.resetForm()
                            handleClose()
                        }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Edit