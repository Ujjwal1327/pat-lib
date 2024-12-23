import React from 'react'
import { HelmetProvider, Helmet } from "react-helmet-async";


export default function PageTitle({ title = "" }) {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Patna Library - {title} </title>
            </Helmet>
        </HelmetProvider>
    )
}
