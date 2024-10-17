"use client"
import React from 'react'
import Center from './Center'
import ProductBox from './ProductBox'

const LatestProduct = ({ lateProduct }) => {
    return (
        <Center>
            <span className='font-semibold text-2xl text-center w-full'>Latest Product</span>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-3 pt-4'>
                {lateProduct.map((product) => (
                    <ProductBox key={product?._id} product={product} />
                ))}

            </div>
        </Center>
    )
}

export default LatestProduct
