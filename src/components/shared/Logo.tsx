import Image from 'next/image';
import React from 'react';

const Logo = () => {
    return (
        <div className='flex items-center -ml-3'>
            <Image src={'/images/logo.png'} height={50} width={50} alt='logo'></Image>
            <h2 className='text-2xl -ml-3 font-semibold'>
                Mock<span className='text-accent'>Forge</span>
            </h2>
        </div>
    );
};

export default Logo;