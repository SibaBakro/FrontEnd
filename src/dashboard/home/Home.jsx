import React, { useState, useEffect } from 'react'
import Header from "../../components/Header";
import Card from '../../components/Card'
import axios from 'axios';
import { CalendarMonth, CategoryOutlined, DarkModeOutlined, HomeOutlined, LightModeOutlined, NotificationsOutlined, Person2Outlined, PersonOutlineOutlined, PrecisionManufacturingOutlined, SettingsOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Typography, Paper, Stack, useTheme } from '@mui/material'
import Pie from "../pieChart/pie"
import Bar from "../barChart/bar"
const Home = () => {
    document.title = 'Dashboard Home'

    const theme = useTheme();
    const [category, setCategory] = useState()
    const [product, setProduct] = useState()
    const [user, setUser] = useState()

    useEffect(() => {
        // @ts-ignore
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/user/homeDashboard`, {
            headers: {
                'Accept': "application/json",
                Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
            },
        }).then((response) => {
            setCategory(response.data.category)
            setProduct(response.data.product)
            setUser(response.data.user)
        }).catch((error) => {
            console.error(error)
        })

    }, [])
    return (
        <div>
            <Header
                isDashboard={true}
                title={"DASHBOARD"}
                subTitle={"Welcome to your dashboard"}
            />

            <Stack
                direction={"row"}
                flexWrap={"wrap"}
                gap={1}
                justifyContent={{ xs: "center", sm: "space-between" }}
            >


                <Card title='Categories' quantity={category}
                    icon={<CategoryOutlined
                        sx={{ fontSize: "40px", color: theme.palette.secondary.main }}

                    />} />

                <Card title='Products' quantity={product}
                    icon={<PrecisionManufacturingOutlined
                        sx={{ fontSize: "40px", color: theme.palette.secondary.main }}

                    />} />


                <Card title='Clients' quantity={user}
                    icon={<PersonOutlineOutlined
                        sx={{ fontSize: "40px", color: theme.palette.secondary.main }}

                    />} />
            </Stack>




            {/* Chart */}
            <Stack gap={1.5} direction={"row"} flexWrap={"wrap"} mt={1.4}>
                <Paper sx={{ flexGrow: 1, minWidth: "400px", width: "28%", }}>
                    <Typography
                        color={theme.palette.secondary.main}
                        sx={{ padding: "30px 30px 0 30px" }}
                        variant="h6"
                        fontWeight="600"
                    >
                        Products
                    </Typography>

                    <Pie isDashbord={true} />
                    <Typography variant="h6" align="center" sx={{ mt: "15px" }}>
                        Products Quantity
                    </Typography>
                    {/* <Typography variant="body2" px={0.7} pb={3} align="center">
                        Includes extra misc expenditures and costs
                    </Typography> */}
                </Paper>

                <Paper sx={{ flexGrow: 1, minWidth: "400px", width: "33%", }}>
                    <Typography
                        color={theme.palette.secondary.main}
                        variant="h6"
                        fontWeight="600"
                        sx={{ padding: "30px 30px 0 30px" }}
                    >
                        Sales Quantity
                    </Typography>


                    <Bar isDashbord={true} />


                </Paper>

                {/* <Paper sx={{ flexGrow: 1, minWidth: "400px", width: "33%", }}>


                    <Geo isDashbord={true} />
                </Paper> */}
            </Stack>
        </div>
    )
}

export default Home