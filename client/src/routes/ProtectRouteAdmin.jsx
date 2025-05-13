import React, { useState, useEffect } from 'react'
import useEcomStore from '../store/store'
import { currentAdmin } from '../api/auth'
import LoadingToRedirect from './LoadingToRedirect'


const ProtectRouteAdmin = ({ element }) => {
    const [ok, setOk] = useState(true)
    const [errMessage, setErrMessage] = useState('')
    const user = useEcomStore((state) => state.user)
    const token = useEcomStore((state) => state.token)


    useEffect(() => {
        const getCurrentAdmin = async (token) => {
            try {
                const data = await currentAdmin(token)
                console.log(data);
            } catch (error) {
                setErrMessage(error.response.data.message);
                setOk(false)
            }

        }
        // if (user.role === 'admin' && token) {
        //     // send to back
        //     currentAdmin(token)
        //         .then((res) => setOk(true))
        //         .catch((err) => setOk(false))
        // }
        const response = getCurrentAdmin(token)
        console.log(response);

    }, [])

    return ok ? element : <LoadingToRedirect errMessage={errMessage} />
}

export default ProtectRouteAdmin