import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Skeleton from '@mui/material/Skeleton';
import { NavLink } from "react-router-dom";

const PRODUCT_TYPES = [
    { category: "all", title: "All" },
    { category: "men's clothing", title: "Mens" },
    { category: "women's clothing", title: "Womens" },
    { category: "jewelery", title: "Jwellery" },
    { category: "electronics", title: "Electronics" }
]

const Products = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);

    let componentMounted = true;

    useEffect(() => {
        getProducts();
    }, [])
    const getProducts = async () => {
        setLoading(true)
        let resp = await fetch('https://fakestoreapi.com/products');
        if (componentMounted) {
            setData(await resp.clone().json());
            setFilter(await resp.json());
            setLoading(false)
        }
        return () => {
            componentMounted = false;
        }
    }
    const Loading = () => {
        return (
            <Grid container spacing={2} px={5}>
                {[1, 2, 3, 4].map((item) => (
                    <Grid item md={3} xs={12} key={item}>
                        <Skeleton height={250} />
                    </Grid>
                ))}
            </Grid>
        )
    }
    const ShowProducts = () => {
        return (
            <>
                <Grid container spacing={2} p={5}>
                    {filter.map(product => (
                        <Grid item md={3} sm={6} key={product.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    image={product.image}
                                    height='400px'
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {product.title.substring(0, 20)}
                                    </Typography>
                                    {/* <Typography variant="body2" color="text.secondary">
                                        {product.description.substring(0,30)}
                                    </Typography> */}
                                    <Typography variant="body2" color="text.secondary">
                                        {product.price}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                        <NavLink to={`/products/${product.id}`}> 
                                    <Button variant='outlined'>
                                        Buy Now
                                    </Button>
                                        </NavLink>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </>
        )
    }
    const filterProducts = (cat) => {
        if (cat === 'all') {
            setFilter(data);
            return;
        }
        const updatedList = data.filter((x) => {
            return x.category === cat;
        });
        setFilter(updatedList);
    }
    return (

        <Box sx={{ marginBottom: '100px', textAlign: 'center', padding: '20px' }}>
            <Typography variant='h3' sx={{ margin: '30px', textAlign: 'center' }}>
                Latest Products
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {PRODUCT_TYPES.map((item, index) => (
                    <Button variant='outlined' key={index} onClick={() => filterProducts(item.category)}>{item.title}</Button>
                ))}
                {/* <Button variant='outlined' onClick={()=>filterProducts(data)}>All</Button>
                <Button variant='outlined' onClick={()=>filterProducts("men's clothing")}>Men</Button>
                <Button variant='outlined' onClick={()=>filterProducts("women's clothing")}>Women</Button>
                <Button variant='outlined' onClick={()=>filterProducts("jewelery")}>Jewelery</Button>
                <Button variant='outlined' onClick={()=>filterProducts("electronics")}>Electronics</Button>
             */}
            </Box>
            {loading
                ? <Loading />
                : <ShowProducts />
            }
        </Box>
    )
}
export default Products