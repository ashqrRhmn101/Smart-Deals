import React, { Children, use } from 'react';
import { AuthContext } from './AuthProvider';

const PrivateRouter = ({children}) => {
    const {user,loading} = use(AuthContext)

    if(loading){
        return <h2>Loading...</h2>
    }
    if(user && user?.email){
        return children
    }

    return (
        <div>
            
        </div>
    );
};

export default PrivateRouter;