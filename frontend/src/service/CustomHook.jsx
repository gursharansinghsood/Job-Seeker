// service/CustomHook.js
import { useState, useEffect, useCallback } from 'react'
import { API } from './api'

const useAxios = (url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            const response = await API.get(url)
            setData(response.data)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }, [url])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return { data, loading, error, refetch: fetchData }  // ← refetch add kiya
}

export default useAxios