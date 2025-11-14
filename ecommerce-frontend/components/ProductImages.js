"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils';

const ProductImages = ({ images }) => {
    const [activeImage, setActiveImage] = useState(images?.[0]);

    useEffect(() => {
        if (images && images.length > 0) {
            setActiveImage(images[0]);
        }
    }, [images]);

    if (!activeImage) {
        return (
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-lg flex items-center justify-center">
                <p className="text-gray-400">Loading images...</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                <Image
                    src={activeImage}
                    fill
                    alt={'Product Image'}
                    priority
                    className="object-cover"
                />
            </div>

            <div className="grid grid-cols-4 gap-3">
                {images?.map((image, index) => {
                    return (
                        <div 
                            key={index}
                            onClick={() => { setActiveImage(image) }} 
                            className={cn(
                                "relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300 hover:border-primary-600",
                                activeImage === image ? "border-primary-600 ring-2 ring-primary-600" : "border-gray-200"
                            )}
                        >
                            <Image src={image} fill alt={`Thumbnail ${index + 1}`} className="object-cover" />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default ProductImages
