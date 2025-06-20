import React, { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { ResponsivePie } from "@nivo/pie";
import axios from 'axios';

import { Box, useTheme } from "@mui/material";

let data = [
  // {
  //   id: "React",
  //   label: "React",
  //   value: 272,
  //   color: "hsl(107, 70%, 50%)",
  // },
  // {
  //   id: "stylus",
  //   label: "stylus",
  //   value: 543,
  //   color: "hsl(64, 70%, 50%)",
  // },
  // {
  //   id: "sass",
  //   label: "sass",
  //   value: 401,
  //   color: "hsl(41, 70%, 50%)",
  // },
  // {
  //   id: "haskell",
  //   label: "haskell",
  //   value: 434,
  //   color: "hsl(172, 70%, 50%)",
  // },
  // {
  //   id: "Vue",
  //   label: "Vue",
  //   value: 333,
  //   color: "hsl(219, 70%, 50%)",
  // },
];

const Pie = ({ isDashbord = false }) => {
  const theme = useTheme();
  // const [count, setCount] = useState(0)
  const [product, setProduct] = useState([])
  const [data, setdata] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    // @ts-ignore
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/user/products`, {
      headers: {
        'Accept': "application/json",
        Authorization: `Bearer ${localStorage.getItem('zuhra_token')}`,
      },
    }).then((response) => {
      // console.log(response.data.product, 'pie')
      setProduct(response.data.product)
      setdata(response.data.product)
      // product.forEach(element => {
      //   data.push(
      //     {
      //       id: element.id,
      //       label: element.translations[0].product_title,
      //       value: element.product_quantity,
      //       color: "hsl(107, 70%, 50%)",
      //     },
      //   )
      //   alert(element.id + " " + element.translations[0].product_title + " " + element.product_quantity)
      // });
      setLoading(false)
    }).catch((error) => {
      console.error(error)
    })
    // product.map((item, index) => (
    // ))

  }, [])

  // useEffect(() => {
  //   product.forEach(element => {
  //     // data = [];

  //     // setdata([])
  //     data.push(
  //       {
  //         id: element.id,
  //         label: element.translations[0].product_title,
  //         value: element.product_quantity,
  //         color: "hsl(107, 70%, 50%)",
  //       },
  //     )
  //     alert(element.id + " " + element.translations[0].product_title + " " + element.product_quantity)
  //   });
  //   setCount(x => x + 1)
  // }, [])

  return (
    <Box sx={{ height: isDashbord ? "200px" : "75vh" }}>
      {
        loading ? <CircularProgress sx={{ color: theme.palette.success.dark, fontSize: "10px", margin: "30px" }} /> :

          <ResponsivePie
            data={
              data.map(function (item) {
                return {
                  id: item.product_name,
                  label: item.product_name,
                  value: item.product_quantity,
                  color: "hsl(210, 70%, 50%)",
                }
              })
              // [
              //   {
              //     id: data.map((item) => item.product_title),
              //     label: "Vue",
              //     value: data.map((item) => item.id),
              //     color: "hsl(219, 70%, 50%)",
              //   },
              // ]
            }
            theme={{
              // @ts-ignore
              textColor: theme.palette.text.primary,
              fontSize: 11,
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.divider,
                    strokeWidth: 1,
                  },
                },
                legend: {
                  text: {
                    fontSize: 12,
                    fill: theme.palette.text.primary,
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.divider,
                    strokeWidth: 1,
                  },
                  text: {
                    fontSize: 11,
                    fill: theme.palette.text.secondary,
                  },
                },
              },
              grid: {
                line: {
                  stroke: theme.palette.divider,
                  strokeWidth: 1,
                },
              },
              legends: {
                title: {
                  text: {
                    fontSize: 11,
                    fill: theme.palette.text.primary,
                  },
                },
                text: {
                  fontSize: 11,
                  fill: theme.palette.text.primary,
                },
                ticks: {
                  line: {},
                  text: {
                    fontSize: 10,
                    fill: theme.palette.text.primary,
                  },
                },
              },
              annotations: {
                text: {
                  fontSize: 13,
                  fill: theme.palette.text.primary,
                  outlineWidth: 2,
                  outlineColor: "#ffffff",
                  outlineOpacity: 1,
                },
                link: {
                  stroke: "#000000",
                  strokeWidth: 1,
                  outlineWidth: 2,
                  outlineColor: "#ffffff",
                  outlineOpacity: 1,
                },
                outline: {
                  stroke: "#000000",
                  strokeWidth: 2,
                  outlineWidth: 2,
                  outlineColor: "#ffffff",
                  outlineOpacity: 1,
                },
                symbol: {
                  fill: "#000000",
                  outlineWidth: 2,
                  outlineColor: "#ffffff",
                  outlineOpacity: 1,
                },
              },
              tooltip: {
                container: {
                  background: theme.palette.background.default,
                  color: theme.palette.text.primary,
                  fontSize: 12,
                },
                basic: {},
                chip: {},
                table: {},
                tableCell: {},
                tableCellValue: {},
              },
            }}
            margin={
              isDashbord
                ? { top: 10, right: 0, bottom: 10, left: 0 }
                : { top: 40, right: 80, bottom: 80, left: 80 }
            }
            innerRadius={isDashbord ? 0.8 : 0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ scheme: "nivo" }}
            borderWidth={1}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={theme.palette.text.primary}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            enableArcLabels={isDashbord ? false : true}
            enableArcLinkLabels={isDashbord ? false : true}
            arcLabelsTextColor={{
              from: "color",
              modifiers: [["darker", 2]],
            }}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: theme.palette.text.primary,
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: theme.palette.text.primary,
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: "ruby",
                },
                id: "dots",
              },
              {
                match: {
                  id: "c",
                },
                id: "dots",
              },
              {
                match: {
                  id: "go",
                },
                id: "dots",
              },
              {
                match: {
                  id: "python",
                },
                id: "dots",
              },
              {
                match: {
                  id: "scala",
                },
                id: "lines",
              },
              {
                match: {
                  id: "lisp",
                },
                id: "lines",
              },
              {
                match: {
                  id: "elixir",
                },
                id: "lines",
              },
              {
                match: {
                  id: "javascript",
                },
                id: "lines",
              },
            ]}
            legends={
              isDashbord
                ? []
                : [
                  {
                    anchor: "bottom",
                    direction: "row",
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: theme.palette.text.primary,
                    itemDirection: "left-to-right",
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: "circle",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemTextColor: theme.palette.text.primary,
                        },
                      },
                    ],
                  },
                ]
            }
          />
      }
    </Box>
  );
};

export default Pie;
