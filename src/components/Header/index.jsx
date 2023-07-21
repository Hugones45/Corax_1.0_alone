import { useState, useEffect } from "react"
import styles from "./Header.module.css"

export const Header = () => {

    const [description, setDescription] = useState('')

    const geography = [{
        id: 8,
        size: 18,
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

    const [toggle, setToggle] = useState(false)

    const upDateDescription = async (item) => {

        setToggle((prevState) => ({
            ...prevState,
            [item.id]: !prevState[item.id]
        }))

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

                {headerList?.map((item) =>
                    <div key={item.id} className={styles.divContainerHeader}>
                        <h2 style={{ fontSize: `${getGeo(item.id)}px` }}>{item.itemName}:</h2>
                        {!toggle[item.id] && <p className={styles.itemDescription} style={{ fontSize: '18px' }}>{item.description}</p>}
                        {!item.dropDown && toggle[item.id] && < input value={description.id} onChange={e => setDescription(e.target.value)} />}
                        {item.dropDown && toggle[item.id] && <>
                            <select value={description.id} onChange={e => setDescription(e.target.value)}>
                                <option />
                                {item.dropDown.map((item, index) => <option key={index}>{item}</option>)}
                            </select>
                        </>}
                        <div className={styles.buttonUpadate}>
                            <button onClick={() => upDateDescription(item)}>Enviar</button>
                        </div>
                    </div>)}

            </div>
        </div>
    )

}
