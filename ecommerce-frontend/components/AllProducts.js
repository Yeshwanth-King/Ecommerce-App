"use client"
import React from 'react'
import ProductBox from './ProductBox'

const AllProducts = ({ products }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products?.map((pro) => (
                <ProductBox key={pro?._id} product={pro} />
            ))}
        </div>
    )
}

export default AllProducts
