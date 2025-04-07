import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useClearOrderData() {
    const location = useLocation();
    useEffect(() => {
        if (location.pathname !== "/order-success") {
            localStorage.removeItem("orderData");
        }
    }, [location.pathname]);
}