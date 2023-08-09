import styles from "./Attributes.module.css"
import { useState, useEffect } from "react"
import { FaRegCircle } from "react-icons/fa"

export const Attributes = () => {

    const url = "http://localhost:3000/attributes"

    const [attributesList, setAttributesList] = useState(null)

    const getAttributes = async () => {
        const res = await fetch(url)
        const fetchData = await res.json()

        setAttributesList(fetchData)
    }

    useEffect(() => {
        getAttributes()
    }, [])

    const upDateScore = async (item, action) => {
        let newScore = item.score

        if (action === "more") {
            if (newScore === 4) {
                return
            }
            newScore += 1
        }
        if (action === "less") {
            if (newScore === 0) {
                return
            }
            newScore -= 1
        }

        const setNewScore = { ...item, score: newScore }
        const scoresChange = await fetch(`${url}/${item.id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(setNewScore)
        })
        getAttributes()
    }

    return (
        <div>
            <h1 className={styles.titleAttri}>Attributes</h1>
            <div className={styles.attritubtesTitles}>
                <h2>Physical</h2>
                <h2>Social</h2>
                <h2>Mental</h2>
            </div>

            <div className={styles.GContainerAttri}>


                <div className={styles.MContainerAttri}>

                    {attributesList?.map((item) =>

                        <div key={item.id} className={styles.divContainerAttri}>

                            <div><h2 className={styles.nameAttributes}>{item.nameAttributes}</h2></div>
                            <button onClick={() => upDateScore(item, 'less')}>-</button>
                            <div className={styles.spheres}>
                                <h2><FaRegCircle className={styles.filledScore} /></h2>
                                {[0, 1, 2, 3].map((_, index) => (
                                    <h2 key={index} >
                                        <FaRegCircle className={`${item.score > index && styles.filledScore}`} />
                                    </h2>
                                ))}
                            </div>
                            <button onClick={() => upDateScore(item, 'more')}>+</button>

                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
