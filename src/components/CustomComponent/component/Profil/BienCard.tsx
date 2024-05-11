"use client"

import { Property } from '@/type/Property';
import { Property_image } from '@/type/Property_image';
import React, { ReactNode, useEffect, useState } from 'react';

interface LayoutProps {
    children?: ReactNode
    property: Property
}

const BienCard: React.FC<LayoutProps> = ({ children, property }) => {

    
    const [photos, setPhotos] = useState<Property_image>();

    useEffect(() => {
        const dataFetch = async () => {
            const data: Property_image[] = await (
                await fetch(
                    `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/property_image`
                )
            ).json();
            
            setPhotos(data.find((property_image) => property_image.idproperty == property.id));
        };

        dataFetch();
    }, [property]);

    return (
      <div className='w-full h-full rounded-lg border justify-between flex flex-col'>
        <img src={photos ? photos.image : ""} alt="Image du bien" className='h-1/2 w-full object-cover rounded-lg max-h-96'/>
        <div className='flex flex-col mx-4 pt-4 h-1/2 gap-8'>
            <h2 className='text-2xl font-bold'>{property.name}</h2>
            <p className='text-sm'>{property.description}</p>
            <p className='text-sm'>{property.price} €</p>
        </div>
      </div>
    );
}

export default BienCard;