"use client"
import Image from 'next/image';
import React, { useState } from 'react'

const ProductImages = ({ images }) => {
    const [activeImage, setActiveImage] = useState(images?.[0]);

    return (
        <div className='flex flex-col gap-5 justify-center items-center'>
            <Image
                src={activeImage}
                width={300}
                height={300}
                alt={'Image'}
                priority
                className="rounded-lg cursor-pointer hover:shadow-lg transition-all duration-400"
            />

            <div className="grid grid-cols-3 gap-3">
                {images?.map((image) => {
                    return (
                        <div onClick={() => { setActiveImage(image) }} className="border-2 flex p-1 cursor-pointer hover:shadow-lg transition-all duration-400">
                            <Image src={image} height={100} width={100} alt={image} />
                        </div>
                    );
                })}
            </div>

        </div>
    )
}

export default ProductImages
