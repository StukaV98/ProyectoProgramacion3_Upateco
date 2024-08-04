import { useEffect, useState } from 'react'

export default function useFetch(url, options = {}, errorMessagge= 'Error de peticion') {

    const [data, setData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        setData(null)
        setIsError(false)
        setLoading(true)

        fetch(url,{...options})
            .then((response) => {
                if(response.ok){
                    return response.json()
                }
            })
            .then((data) => {
                setData(data)
            })
            .catch((e) => {
                setIsError(true)
            })
            .finally(()=>{
                setLoading(false)
            })


    },[url])


    return [data, isError, loading]
}
