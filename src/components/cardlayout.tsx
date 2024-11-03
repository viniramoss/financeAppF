import React, { ReactNode } from 'react'

type CardLayoutProps = {
    children: ReactNode;
}

const CardLayout: React.FC<CardLayoutProps> = ({ children }) => (
    <div className=" custom:mt-[-20vh] xl:mt-[-20vh] w-full max-w-4xl h-auto rounded-3xl bg-neutral-100 shadow-customCardShadow xl:p-12 custom:p-16 pt-0 custom:pb-10 relative flex flex-col justify-center items-center">
        {children}
    </div>
)

export default CardLayout;