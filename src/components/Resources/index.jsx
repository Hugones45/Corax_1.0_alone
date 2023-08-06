import styles from "./Resources.module.css"

import { useState, useEffect } from "react"

import { BiSquare } from "react-icons/Bi"
import { FaRegCircle } from "react-icons/fa"


export const Resouces = () => {

    const urlRenown = "http://localhost:3000/renown"
    const urlEnergies = "http://localhost:3000/energies"
    const urlHealth = "http://localhost:3000/health"

    const [renownData, setRenown] = useState([])
    const [energiesData, setEnergiesData] = useState([])
    const [healthData, setHealthData] = useState([])

    const [currentDamage, setCurrentDamage] = useState("")

    const getDataResourcers = async () => {
        const resData = await fetch(urlRenown)
        const jsonData = await resData.json()

        const resEnergies = await fetch(urlEnergies)
        const jsonEnergies = await resEnergies.json()

        const resHealth = await fetch(urlHealth)
        const jsonHealth = await resHealth.json()

        setRenown(jsonData)
        setEnergiesData(jsonEnergies)
        setHealthData(jsonHealth)
    }

    useEffect(() => {
        getDataResourcers()
    }, [])

    const upValues = (urlRE, item, forJson) => {
        fetch(`${urlRE}/${item.id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(forJson)
        })
    }

    const setTheScoresByName = (action, novoScore, squareScore) => {
        let newScore = novoScore
        let newSquareScore = squareScore;

        if (action === "more") {
            newScore++;
        }

        if (action === 'moreSquare') {
            newSquareScore++;
        }

        if (action === "less") {
            newScore--;
        }

        if (action === "lessSquare") {
            newSquareScore--;
        }

        return { newScore, newSquareScore }

    }

    const upDateScores = (item, action, type) => {
        const { newScore, newSquareScore } = setTheScoresByName(action, item.score, item.squareScore);

        const finalScore = { ...item, score: newScore };
        const finalSquareScore = { ...item, squareScore: newSquareScore };

        if (type === 'FaRegCircle') {
            upValues(urlRenown, item, finalScore)
            setRenown((prevRenown) => prevRenown.map((el) => (el.id === item.id ? finalScore : el)));
        } else if (type === 'BiSquare') {
            upValues(urlRenown, item, finalSquareScore)
            setRenown((prevRenown) => prevRenown.map((el) => (el.id === item.id ? finalSquareScore : el)));
        }

        if (type === 'FaRegCircleRE') {
            upValues(urlEnergies, item, finalScore)
            setEnergiesData((prevEnergy) => prevEnergy.map((el) => (el.id === item.id ? finalScore : el)));
        } else if (type === 'BiSquareRE') {
            upValues(urlEnergies, item, finalSquareScore)
            setEnergiesData((prevEnergy) => prevEnergy.map((el) => (el.id === item.id ? finalSquareScore : el)));
        }
    }

    const upDamage = (item) => {

        const newDamage = { ...item, currentDamage }

        fetch(`${urlHealth}/${item.id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newDamage)
        })

        getDataResourcers()
    }

    return (
        <div className={styles.GContainerAd}>

            <div className={styles.Ccontainer}>
                <h1>Renown</h1>

                {renownData.map((item) => <div key={item.id} style={{ textAlign: 'center' }}>

                    <h2>{item.nameRenown}</h2>
                    <div className={styles.renownDataMap}>
                        <button onClick={() => upDateScores(item, 'less', 'FaRegCircle')}>-</button>

                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
                            <h2 key={index}>
                                <FaRegCircle className={`${item.score > index && styles.filledScore}`} />
                            </h2>
                        ))}
                        <button onClick={() => upDateScores(item, 'more', 'FaRegCircle')}>+</button>
                    </div>

                    <div className={styles.renownDataMap}>
                        <button onClick={() => upDateScores(item, 'lessSquare', 'BiSquare')}>-</button>

                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
                            <h2 key={index}>
                                <BiSquare className={`${item.squareScore > index && styles.squarefilledScore}`} />
                            </h2>
                        ))}
                        <button onClick={() => upDateScores(item, 'moreSquare', 'BiSquare')}>+</button>
                    </div>
                </div>)}
            </div>

            <div>

                <div className={styles.Ccontainer}>

                    {energiesData.map((item) => <div key={item.id} style={{ textAlign: 'center' }}>

                        <h2>{item.nameEnergies}</h2>
                        <div className={styles.renownDataMap}>
                            <button onClick={() => upDateScores(item, 'less', 'FaRegCircleRE')}>-</button>

                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
                                <h2 key={index}>
                                    <FaRegCircle className={`${item.score > index && styles.filledScore}`} />
                                </h2>
                            ))}
                            <button onClick={() => upDateScores(item, 'more', 'FaRegCircleRE')}>+</button>
                        </div>

                        <div className={styles.renownDataMap}>
                            <button onClick={() => upDateScores(item, 'lessSquare', 'BiSquareRE')}>-</button>

                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
                                <h2 key={index}>
                                    <BiSquare className={`${item.squareScore > index && styles.squarefilledScore}`} />
                                </h2>
                            ))}
                            <button onClick={() => upDateScores(item, 'moreSquare', 'BiSquareRE')}>+</button>
                        </div>
                    </div>)}
                </div>
            </div>

            <div >

                <div>
                    {healthData.map((item) => <div className={styles.healthContainer} key={item.id}>

                        <div className={styles.damageAndSave}>
                            <div>
                                <h2>{item.leves}</h2>
                            </div>
                            <div>
                                <h2>{item.penalties}</h2>
                            </div>
                        </div>

                        <div className={styles.squareForDamage}>

                            <div className={styles.currentDamgeSize}><h2>{item.currentDamage}</h2></div>

                            <div className={styles.selector}>

                                {item.scores && <select className={styles.setSelectSize}
                                    value={currentDamage.id} onChange={e => setCurrentDamage(e.target.value)}>
                                    <option />
                                    {item.scores.map((item, index) => <option key={index}>{item}</option>)}
                                </select>}

                                <div> {item.scores && <button onClick={() => upDamage(item)}>D</button>}</div></div>


                        </div>

                        <div className={styles.weakness}>
                            <h2 style={{ textAlign: 'center' }}>{item.stateWe}</h2>
                            <h2>{item.descripion}</h2>
                        </div>

                    </div>)}
                </div>
            </div>

        </div>
    )
}