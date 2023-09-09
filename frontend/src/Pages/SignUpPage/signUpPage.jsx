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
import { Link } from "react-router-dom";

import signUpImage from "../../assets/images/draw1.webp";
import "./signUpPage.css";
import { useFormik } from "formik";
import validationSchema from "./validationSchema";
import inputs from "./signUpInputs";
import { ToastContainer, toast } from 'react-toastify';

const SignUpPage = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
    validationSchema: validationSchema,
    onSubmit: ({firstName , lastName , role , email , password}) => {
      axios
        .post("http://localhost:5000/add-user", {
          firstName , lastName , role , email , password
        })
        .then((res) => {
          toast.success('Succefull Registration ...... ', {
            position: toast.POSITION.TOP_RIGHT
        });
        })
        .catch((error) => {
          toast.error(` error Registration ......  ${error.response.data.message}`, {
            position: toast.POSITION.TOP_RIGHT
        });
        });
    },
  });

  return (
    <Grid container className={"mainContainer"}>
      <Grid
        item
        xs={11}
        lg={8}
        xl={9}
        justifyContent={"space-around"}
        bgcolor={"#fff"}
        borderRadius={"50px"}
        padding={{xs : 1 , sm : 1 , md : 2 , lg : 3}}
      >
        <Grid container  justifyContent={"space-between"}>
          <Grid item xs={12} sm={12} lg={6} md={6} xl={5}>
            <form onSubmit={formik.handleSubmit}>
              <Typography variant="h4" gutterBottom>
                Sign up
              </Typography>
              <Grid container alignItems="center">
                  {inputs.map(({ name, label, id, options, type , icon }) => (
                    <Grid container key={name} gap={{xs : 0 , sm : 0 , md : 1 , lg : 1}} >
                      <Grid item xs = {2} sm={2} md={2} lg={1}  display={"flex"} justifyContent={"center"} alignItems={"center"}> 
                        <Typography 
                          variant="h6"
                          padding = {"2"}
                          color = {formik.touched[name] && Boolean(formik.errors[name]) ? "#d32f2f" : "primary"}
                          >{icon}</Typography>
                      </Grid>
                      <Grid item xs = {10} sm={9} md={9} lg={10}>
                        <TextField
                          fontSize = "15px"
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
                              <MenuItem  key={opt} value={opt}>
                                {opt}
                              </MenuItem>
                            ))}
                        </TextField>
                      </Grid>
                    </Grid>
                  ))}
              </Grid>
            </form>

            <Grid container>
              <Grid item xs={12} md={12} xl={12} lg={12}>
                <Button
                  variant="contained"
                  className="signUpButton"
                  onClick={formik.handleSubmit}
                >
                  register
                </Button>
              </Grid>
              <Grid item xs={12} md={12} xl={12} lg={12} margin={"normal"}>
                <Typography variant="p" fontSize={"15px"}>
                  <span> Already , have an account ! </span>
                  <Link to={"/login"}> sign in </Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={5}  padding={1}>
            <Box
              component="img"
              src={signUpImage}
              sx={{ height: "100%", width: "100%" }}
              alt="sign up"
            />
          </Grid>
        </Grid>
      </Grid>
      <ToastContainer />
    </Grid>
  );
};
export default SignUpPage;
