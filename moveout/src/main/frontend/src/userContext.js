import {createContext, useEffect, useState} from 'react'
export const UserContext = createContext();

export const UserContextProvider = (props) => {
    const [userInfo, setUserInfo] = useState('');
    const [productInfo, setProductInfo] = useState([]);
    return (
        <UserContext.Provider
            value={{ userInfo: [userInfo, setUserInfo], productInfo: [productInfo, setProductInfo] }}
        >
            {props.children}
        </UserContext.Provider>
    );
};
