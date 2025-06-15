import React, { useEffect, useState } from 'react'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Avatar, Button, MenuItem, Snackbar, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import Header from "../../components/Header";
import axios from 'axios';

const numberRegex = /^[1-9][0-9]*$/;

const Execute = () => {
  document.title = 'Dashboard Execute'

  const { id } = useParams();

  const [invoice, setInvoice] = useState()
  const [invoice_shipping, setInvoice_shipping] = useState('')
  const [invoice_delivery, setInvoice_delivery] = useState('')

  useEffect(() => {
    // @ts-ignore
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/invoice/show/${id}`, {
      headers: {
        'Accept': "application/json",
        Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
      },

    }).then((response) => {
      console.log(response.data.invoice)
      setInvoice(response.data.tax.invoice)

    });

  }, [])
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const onSubmit = () => {
    // console.log("doneeeeeeeeeeee");
    const data = {
      invoice_shipping: invoice_shipping,
      invoice_delivery: invoice_delivery,
    }
    // @ts-ignore
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/invoice/store/${id}`, data, {
      headers: {
        'Accept': "application/json",
        Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
      },
    }).then((response) => {
    });
    handleClick();
  };


  return (
    <Box>
      <Header title="Execute Order" subTitle="Here you can Execute Orders" />
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
        noValidate
        autoComplete="off"
      >

        <TextField
          error={Boolean(errors.invoice_shipping)}
          helperText={
            Boolean(errors.invoice_shipping)
              ? "This field is required & number"
              : null
          }
          {...register("invoice_shipping", { required: true, pattern: numberRegex })}
          sx={{ flex: 1 }}
          label="Invoice Shipping"
          variant="filled"
          value={invoice_shipping}
          // @ts-ignore
          onChange={(e) => setInvoice_shipping(e.target.value)}
        />
        <TextField
          error={Boolean(errors.invoice_delivery)}
          helperText={
            Boolean(errors.invoice_delivery)
              ? "This field is required & date"
              : null
          }
          {...register("invoice_delivery", { required: true, minLength: 3 })}
          sx={{ flex: 1 }}
          label="Invoice Delivery"
          variant="filled"
          value={invoice_delivery}
          type='date'
          // @ts-ignore
          onChange={(e) => setInvoice_delivery(e.target.value)}
        />


        <Box sx={{ textAlign: "right" }}>
          <Button
            type="submit"
            sx={{ textTransform: "capitalize" }}
            variant="contained"
          >
            Execute Order
          </Button>

          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
              Order Executed successfully
            </Alert>
          </Snackbar>
        </Box>
      </Box>


    </Box>
  )
}

export default Execute