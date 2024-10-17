"use client"
import React from 'react'
import ProductBox from './ProductBox'

const AllProducts = ({ products }) => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-4">
                {products?.map((pro) => (
                    <ProductBox key={pro?._id} product={pro} />
                ))}
            </div>
        </div>
    )
}

export default AllProducts
