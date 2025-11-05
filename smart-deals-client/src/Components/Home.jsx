// import React, { useEffect, useState } from 'react';
import LatestProducts from './LatestProducts';
// import AllProducts from './AllProducts';

const latestProducts = fetch("http://localhost:3000/latest-products").then(res => res.json());

// const allProducts = fetch("http://localhost:3000/products").then(res => res.json())


const Home = () => {

    return (
        <div>
            <h2>Latest Products</h2>
            <LatestProducts latestProducts={latestProducts}></LatestProducts>
            {/* <AllProducts allProducts={allProducts}/> */}
        </div>
    );
};

export default Home;