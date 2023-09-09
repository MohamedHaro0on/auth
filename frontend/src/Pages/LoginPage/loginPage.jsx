import React from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";

import signUpImage from "../../assets/images/draw1.webp";
import "./logInPage.css";
import { useFormik } from "formik";
import validationSchema from "./validationSchema";
import inputs from "./loginInInputs";
import { ToastContainer, toast } from "react-toastify";
const LogInPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("inside");
      axios
        .post("http://localhost:5000/sign-in", values)
        .then((res) => {
          console.log(res)
          toast.success("Succefull Login ...... ", {
            position: toast.POSITION.TOP_RIGHT,
          });
          navigate("/home")
        })
        .catch((error) => {
          console.log(error)
          toast.error(
            ` error Login ......  ${error.response.data.message}`,
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
        });
    },
  });

  return (
    <Grid container className={"mainContainer"}>
      <Grid
        item
        xs={11}
        lg={8}
        xl={8}
        justifyContent={"space-around"}
        bgcolor={"#fff"}
        borderRadius={"50px"}
        padding={{xs : 1 , sm : 1 , md : 2 , lg : 3}}
      >
        <Grid container margin={2} justifyContent={"space-between"}>
          <Grid item xs={12} sm={12} lg={6} md={6} xl={4} >
            <form onSubmit={formik.handleSubmit}>
              <Typography variant="h4" gutterBottom>
                log in
              </Typography>
              <Grid container alignItems="center" margin={1}>
                <FormControl fullWidth>
                  {inputs.map(({ name, label, id, options, type, icon }) => (
                    <Grid container key={name} gap={{xs : 0 , sm : 0 , md : 1 , lg : 1}}>
                      <Grid
                        item
                        xs = {2}
                        sm={2}
                        md={2}
                        lg={1}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Typography
                          variant="h6"
                          color={
                            formik.touched[name] && Boolean(formik.errors[name])
                              ? "#d32f2f"
                              : "primary"
                          }
                        >
                          {icon}
                        </Typography>
                      </Grid>
                      <Grid item xs = {9} sm={9} md={9} lg={10}>
                        <TextField
                          key={name}
                          fullWidth
                          id={id}
                          type={type}
                          select={type === "select" ? true : false}
                          name={name}
                          label={label}
                          margin="normal"
                          value={formik.values[name]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched[name] && Boolean(formik.errors[name])
                          }
                          helperText={
                            formik.touched[name] && formik.errors[name]
                          }
                        >
                          {options &&
                            options.map((opt) => (
                              <MenuItem key={opt} value={opt}>
                                {opt}
                              </MenuItem>
                            ))}
                        </TextField>
                      </Grid>
                    </Grid>
                  ))}
                </FormControl>
              </Grid>
            </form>

            <Grid container>
              <Grid item xs={12} md={12} xl={12} lg={12}>
                <Button
                  variant="contained"
                  className="signUpButton"
                  onClick={formik.handleSubmit}
                >
                  sign In
                </Button>
              </Grid>
              <Grid item xs={12} md={12} xl={12} lg={12} margin={"normal"}>
                <Typography variant="p" fontSize={"15px"}>
                  <span> don't have an account !! , you can </span>
                  <Link to={"/sign-up"}> register</Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box
              component="img"
              src={signUpImage}
              sx={{ height: "100%", width: "100%" }}
              alt="sign up"
            />
          </Grid>
        </Grid>
      </Grid>
      <ToastContainer/>
    </Grid>
  );
};
export default LogInPage;
