import styles from "./Advantages.module.css"
import React, { useEffect, useState, useRef } from 'react'
import { FaRegCircle } from "react-icons/fa"

export const Advantages = () => {

    const urlBackgrounds = "http://localhost:3000/backgrounds"
    const urlGifts = "http://localhost:3000/gifts"

    const inputRef = useRef()

    const [backgroundsList, setBackgroundsList] = useState([])
    const [giftList, setGiftList] = useState([])

    const [namesS, setNamesS] = useState("")
    const [giftName, setGiftName] = useState("")
    const [getLevel, setGetLevel] = useState("")

    const [toggleName, setTogglename] = useState(false)
    const [giftToggle, setGiftToggle] = useState(false)

    const getBackgroundsData = async () => {
        const res = await fetch(urlBackgrounds)
        const json = await res.json()

        const res2 = await fetch(urlGifts)
        const json2 = await res2.json()

        setBackgroundsList(json)
        setGiftList(json2)
    }

    useEffect(() => {
        getBackgroundsData()
    }, [])

    const upDateScore = async (item, action) => {
        let newScore = item.score

        if (action === 'more') {
            if (newScore === 5) {
                return newScore
            }
            newScore++
        }

        if (action === 'less') {
            if (newScore === 0) {
                return newScore
            }
            newScore--
        }

        if (action === 'name') {
            setTogglename((prevState) => ({
                ...prevState,
                [item.id]: !prevState[item.id]
            }))
            setNamesS('')
        }

        if (action === 'getGift') {
            setGiftToggle((prevState) => ({
                ...prevState,
                [item.id]: !prevState[item.id]
            }))

            setGiftName('')
        }

        const finalScore = { ...item, score: newScore }
        const finalName = { ...item, namesS }
        const newGift = { ...item, giftName }

        if (action === "more" || action === "less") {
            const update = await fetch(`${urlBackgrounds}/${item.id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(finalScore)
            })
        } else if (action === 'name') {
            const update = await fetch(`${urlBackgrounds}/${item.id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(finalName)
            })
        } else {
            const update = await fetch(`${urlGifts}/${item.id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(newGift)
            })
        }
        getBackgroundsData()

        inputRef.current.focus()
    }

    const update = (item) => {

        let newLevel = { ...item, getLevel }

        fetch(`${urlGifts}/${item.id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newLevel)
        })
        setGetLevel('')
        getBackgroundsData()
    }

    const [buttonToggle, setButtonToggle] = useState(false)
    const openDropDow = (item) => {
        setButtonToggle((prevState) => ({
            ...prevState,
            [item.id]: !prevState[item.id]
        }))
    }

    return (
        <div className={styles.GContainerAd}>
            <div>
                <h1 className={styles.advantageTitle}>Advantages</h1>
                <div className={styles.attritubtesAbilitiesAd}>

                    <div style={{ marginLeft: '80px' }}>
                        <h2 className={styles.forTitleBackgrounds}>Antecedentes</h2>

                        {backgroundsList.map((item) => <div key={item.id} className={styles.backgroundListItens}>
                            <div className={styles.putTheBackgrounds}>
                                {toggleName[item.id] && <input
                                    ref={inputRef}
                                    value={namesS}
                                    onChange={e => setNamesS(e.target.value)}
                                />}
                                {!toggleName[item.id] && <h2>{item.namesS}</h2>}
                            </div>

                            <div className={styles.setBackgrounds}>
                                <button onClick={() => upDateScore(item, 'less')}>-</button>
                                <div className={styles.spheres}>
                                    {[0, 1, 2, 3, 4].map((_, index) => (
                                        <h2 key={index}>
                                            <FaRegCircle className={`${item.score > index && styles.filledScore}`} />
                                        </h2>
                                    ))}
                                </div>
                                <button onClick={() => upDateScore(item, 'more')}>+</button>
                            </div>
                            <button onClick={() => upDateScore(item, 'name')}>Enviar</button>
                        </div>)}
                    </div>

                    <div>
                        <h2 style={{ textAlign: 'center' }}>Gifts</h2>

                        <div className={styles.MContainerGifts}>

                            {giftList.map((item) =>
                                <div key={item.id} className={styles.listOfGifts}>

                                    <div className={styles.theNames}>
                                        {giftToggle[item.id] && <input
                                            ref={inputRef}
                                            placeholder="Escolha um Dom"
                                            value={giftName}
                                            onChange={e => setGiftName(e.target.value)}
                                        />}
                                        {!giftToggle[item.id] && <h3>{item.giftName}</h3>}
                                    </div>

                                    <div className={styles.giftButton}>
                                        <button onClick={() => upDateScore(item, "getGift")}>G</button>
                                    </div>

                                    <div className={styles.theLevel}>
                                        <button onClick={() => openDropDow(item)}>L</button> <h2 onClick={() => update(item)}>{item.getLevel}</h2>

                                        {buttonToggle[item.id] && <select
                                            onClick={() => update(item)}
                                            value={getLevel.id} onChange={e => setGetLevel(e.target.value)}>
                                            <option />

                                            {item.level.map((item, index) => <option

                                                key={index}> {item}</option>)}

                                        </select>
                                        }

                                    </div>
                                </div>)}

                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}