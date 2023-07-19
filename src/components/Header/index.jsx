import { useState, useEffect } from "react"
import styles from "./Header.module.css"

export const Header = () => {

    const [description, setDescription] = useState('')

    const geography = [{
        id: 8,
        size: 15,
    }]

    const url = "http://localhost:3000/characterSheets"

    const [headerList, setHeaderList] = useState(null)

    const getDataHeader = async () => {
        const res = await fetch(url)
        const fetchData = await res.json()

        setHeaderList(fetchData)
    }

    useEffect(() => {
        getDataHeader()
    }, [])

    const getGeo = (headerID) => {
        const finder = geography.find((item) => item.id === headerID)?.size
        return finder
    }

    const upDateDescription = async (item) => {

        let newDescription = { ...item, description }

        const update = await fetch(`${url}/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newDescription)
        })

        getDataHeader()
    }


    return (
        <div className={styles.GContainerHeader}>

            <div className={styles.MContainerHeader}>
                {headerList?.map((item) => <div key={item.id}>
                    <h2 style={{ fontSize: `${getGeo(item.id)}px` }}>{item.itemName}:</h2>
                    {item.description}
                    <input value={description.id} onChange={e => setDescription(e.target.value)}
                    
                    />
                    <button onClick={() => upDateDescription(item)}>Enviar</button>
                </div>)}
            </div>

        </div>
    )
}
