import Skeleton from '@mui/material/Skeleton';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useDispatch } from 'react-redux';
import { addCart } from './redux/action';


const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const addProduct = (product)=>{
        dispatch(addCart(product))
    }
    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const resp = await fetch(`https://fakestoreapi.com/products/${id}`);
            setProduct(await resp.json());
            setLoading(false);
        }
        getProduct();
    }, [])
    const Loading = () => {
        return (
            <Card>
                <Skeleton height={200} />
            </Card>
        )
    }
    
const ProductCard = ({ item }) => {
    const { image, title, description, price, rating } = item;
    console.log(item, '///');
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <Card>
                        <Box
                            component="img"
                            sx={{
                                height: 233,
                                width: 350,
                                maxHeight: { xs: 233, md: 167 },
                                maxWidth: { xs: 350, md: 250 },
                            }}
                            alt={title}
                            src={image}
                        />
                    </Card>
                </Grid>
                <Grid item xs={7}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography component="div" variant="h5">
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            <IconButton>{rating?.rate} <StarBorderIcon/></IconButton>
                        </Typography>
                        <Typography variant="h4" component="div">
                            ${price}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" component="div">
                            {description}
                        </Typography>

                                <Button variant='outlined' onClick={()=>addProduct(item)}>Add to cart</Button>
                                <Button variant='outlined' >View cart</Button>
                        
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
    const ShowProduct = () => {
        return (
            <ProductCard item={product} />

        )
    }
    return (
        <Box sx={{ p: 5, m: 5 }}>
            {loading ? <Loading /> : <ShowProduct />}
        </Box>
    )
}

export default Product;



