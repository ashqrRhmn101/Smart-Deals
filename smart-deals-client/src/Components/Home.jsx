import React from 'react';
import LatestProducts from './LatestProducts';

const latestProducts = fetch("http://localhost:3000/latest-products").then(res => res.json());

const Home = () => {
    return (
        <div>
            <h2>Latest Products</h2>
            <LatestProducts latestProducts={latestProducts}></LatestProducts>
        </div>
    );
};

export default Home;