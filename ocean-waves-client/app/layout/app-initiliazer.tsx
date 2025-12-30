"use client";
import { getProducts } from "../service/product";
import useProductStore from "../store/product-store";
import { useEffect, useState } from "react";


export default function AppInitializer({children}: {children: React.ReactNode}) {
    const [isLoading, setIsLoading] = useState(true);
    const { setProducts } = useProductStore();
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            const products = await getProducts();
            setProducts(products);
            setIsLoading(false);
        }
        fetchProducts();
    }, [setProducts]);

    return <>{isLoading ? <div>Loading...</div> : children}</>
}