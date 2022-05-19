import {createContext, useState} from 'react'
export const UserContext = createContext();

export const UserContextProvider = (props) => {
    const [userInfo, setUserInfo] = useState(()=>{
        const savedUser = JSON.parse(localStorage.getItem("userDetails"));
        // const initialValue = JSON.parse(savedUser);
        return savedUser || null;
    });
    const [productInfo, setProductInfo] = useState([]);
    const [sellerInfo, setSellerInfo] = useState([]);
    return (
        <UserContext.Provider
            value={{ userInfo: [userInfo, setUserInfo], productInfo: [productInfo, setProductInfo], sellerInfo: [sellerInfo, setSellerInfo] }}
        >
            {props.children}
        </UserContext.Provider>
    );
};
