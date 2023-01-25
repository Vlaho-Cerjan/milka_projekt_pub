import { Grid, Card, CardContent, Typography, Box, Divider } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { CustomThemeContext } from "../../../store/customThemeContext";
import { getEUR } from "../../../utility/hrkToEur";

const ServicesGrid = ({ services, servicesSubprices }: { services: any, servicesSubprices: any }) => {
    const { theme } = React.useContext(CustomThemeContext);
    const [eurPrice, setEurPrice] = React.useState<any>(null);

    React.useEffect(() => {
        const getEurPrice = async () => {
            const eur = await getEUR();
            setEurPrice(parseFloat(eur));
        }
        getEurPrice();
    }, []);

    return (
        <Grid
            container
            spacing={2}
        >
            {services.map((service: any, index: number) => (
                <Grid
                    component={motion.div}
                    whileHover={{ scale: 1.04, transition: { duration: 0.3 } }}
                    key={"derm_price_list_" + index}
                    item
                    xs={12}
                    sm={6}
                    md={4}>
                    <Card
                        component={motion.div}
                        animate={service.highlighted === 1 ? { scale: [1, 1.04, 1, 1.04, 1] } : { scale: 1 }}
                        transition={service.highlighted === 1 ? { duration: 1.5, ease: "easeInOut", times: [0, 0.5, 1], repeat: 2, repeatDelay: 1 } : { duration: 0.3 }}
                        elevation={service.highlighted === 1 ? 4 : 2}
                        sx={{
                            height: "100%",
                            background: service.highlighted === 1 ? theme.palette.primary.main : undefined,
                            color: service.highlighted === 1 ? theme.palette.primary.contrastText : undefined,
                        }}>
                        <CardContent sx={{ textAlign: "center" }}>
                            <Typography sx={{ pb: "12px" }} component="h3" variant={"h5"} gutterBottom>
                                {service.name}
                            </Typography>
                            {service.description ?
                                <Typography sx={{ pb: "12px" }}>
                                    {service.description}
                                </Typography>
                                : null}
                            {service.value !== null && eurPrice ?
                                <Typography>
                                    {service.value} kn / {Math.round(((service.value / eurPrice) + Number.EPSILON) * 100) / 100} €
                                </Typography>
                                :
                                typeof servicesSubprices !== "undefined" && servicesSubprices.length > 0 && servicesSubprices.filter((subprice: any) => subprice.service_list_id === service.id).length > 0 ?
                                    servicesSubprices.filter((subprice: any) => subprice.service_list_id === service.id).map((subprice: any, index: number) => (
                                        <Box sx={{
                                            padding: "0",
                                        }} key={"subprice_" + index}>
                                            <Typography>
                                                <strong>{subprice.title}</strong> - {subprice.value} kn / {Math.round(((subprice.value / eurPrice) + Number.EPSILON) * 100) / 100} €
                                            </Typography>
                                            <Typography>
                                                {subprice.description}
                                            </Typography>
                                            <Divider flexItem sx={{ my: "12px" }} />
                                        </Box>
                                    ))
                                    : null
                            }
                        </CardContent>
                    </Card>
                </Grid>
            ))
            }
        </Grid>
    )
}

export default ServicesGrid;