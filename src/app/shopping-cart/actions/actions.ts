

/* 
cookie: cart 
{
 'uui-123-1: 4,
 'uui-123-2: 1,
 'uui-123-3: 2,
}

*/

import { getCookie, hasCookie, setCookie } from "cookies-next";

export const getCookieCart = (): { [id: string]: number } => {

    if ( hasCookie('cart') ) {
        const cookieCart = JSON.parse(getCookie('cart') as string ?? '{}');
        return cookieCart;
    }

    return {};
}

export const addProductToCart = (id: string) => {
    const cookieCart = getCookieCart();
    if ( cookieCart[id] ) {
        cookieCart[id]++;
    } else {
        cookieCart[id] = 1;
    }
    setCookie('cart', JSON.stringify(cookieCart));
}

export const removeProductFromCart = (id: string) => {
    const cookieCart = getCookieCart();
    delete cookieCart[id];
    setCookie('cart', JSON.stringify(cookieCart));
}

export const removeSingleItemFromCart = (id: string) => {
    const cookieCart = getCookieCart();
    if ( !cookieCart[id] ) return;
    if ( cookieCart[id] ) {
        cookieCart[id]--;
        if ( cookieCart[id] === 0 ) {
            delete cookieCart[id];
        }
    }
    setCookie('cart', JSON.stringify(cookieCart));
}