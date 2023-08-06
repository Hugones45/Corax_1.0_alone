import { useState, useEffect } from "react"

export const UseFetchAbilities = (url) => {

    const [getData, setGetData] = useState([])

    const fetchAbilitiesData = async () => {
        const res = await fetch(url)
        const json = await res.json()

        setGetData(json)
    }

    useEffect(() => {
        fetchAbilitiesData()
    }, [url])


    return { getData, setGetData }
}
