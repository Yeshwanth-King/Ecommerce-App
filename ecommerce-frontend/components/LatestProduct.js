"use client"
import React from 'react'
import ProductBox from './ProductBox'
import { Sparkles } from 'lucide-react'

const LatestProduct = ({ lateProduct }) => {
    return (
        <section className="py-16 lg:py-24">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full mb-4">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-semibold">New Arrivals</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Latest Products
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover our newest collection of premium products
                    </p>
                </div>
                
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {lateProduct.map((product) => (
                        <ProductBox key={product?._id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default LatestProduct
