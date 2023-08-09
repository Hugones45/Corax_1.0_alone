import styles from "./Abilities.module.css"
import { useState } from "react"
import { UseFetchAbilities } from "../../UseFecthAbilities"
import { FaRegCircle } from "react-icons/fa"

export const Abilities = () => {

    const urlT = "http://localhost:3000/talents"
    const urlS = "http://localhost:3000/skills"
    const urlK = "http://localhost:3000/knowledges"

    const { getData: getTalents, setGetData: setT } = UseFetchAbilities(urlT)
    const { getData: getSkills, setGetData: setS } = UseFetchAbilities(urlS)
    const { getData: getknowledges, setGetData: setK } = UseFetchAbilities(urlK)

    const [selectNameTalents, setSelecNametTalents] = useState('')
    const [selectNameSkills, setSelectNameSkills] = useState('')
    const [selectNameKnowledges, setSelectNameKnowledges] = useState('')

    const upDateScore = async (item, action, abilityType) => {
        let newScore = item.score

        if (action === 'more') {
            if (newScore === 5) {
                return
            }
            newScore += 1
        }

        if (action === 'less') {
            if (newScore === 0) {
                return
            }
            newScore -= 1
        }

        const setNewScore = { ...item, score: newScore }
        const getPut = await fetch(`http://localhost:3000/${abilityType}/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(setNewScore)
        })
        if (getPut.ok && abilityType === 'knowledges') {
            setK((prev) => prev.map((k) => (k.id === item.id ? setNewScore : k)))
        }
        if (getPut.ok && abilityType === 'talents') {
            setT((prev) => prev.map((k) => (k.id === item.id ? setNewScore : k)))
        }
        if (getPut.ok && abilityType === 'skills') {
            setS((prev) => prev.map((k) => (k.id === item.id ? setNewScore : k)))
        }

    }

    const [toggle, setToggle] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    const secondeUpdate = async (item, abilityType) => {

        setToggle((prevState) => ({
            ...prevState,
            [item.id]: !prevState[item.id]
        }))
        const findID = getTalents.find((finder) => finder.id === item.id)
        setSelectedItem(findID)
        const findIDs = getSkills.find((finder) => finder.id === item.id)
        setSelectedItem(findIDs)
        const findIDk = getknowledges.find((finder) => finder.id === item.id)
        setSelectedItem(findIDk)

        let newDescription = { ...item };

        if (abilityType === "skills") {
            newDescription.selectName = selectNameSkills;
        } else if (abilityType === "knowledges") {
            newDescription.selectName = selectNameKnowledges;
        } else if (abilityType === 'talents') {
            newDescription.selectName = selectNameTalents;
        }

        const update = await fetch(`http://localhost:3000/${abilityType}/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newDescription)
        })
        if (update.ok) {
            if (abilityType === "skills") {
                setS((prev) => prev.map((k) => (k.id === item.id ? { ...k, ...newDescription } : k)));
            } else if (abilityType === "knowledges") {
                setK((prev) => prev.map((k) => (k.id === item.id ? { ...k, ...newDescription } : k)));
            } else if (abilityType === "talents") {
                setT((prev) => prev.map((k) => (k.id === item.id ? { ...k, ...newDescription } : k)));
            }
        }
    }


    return (
        <div className={styles.GContainerAbi}>
            <h1>Abilities</h1>
            <div className={styles.attritubtesAbilities}>
                <h2>Talents</h2>
                <h2>Skills</h2>
                <h2>Knowledges</h2>
            </div>
            <div className={styles.MContainerAbi}>

                <div className={styles.testDiv}>

                    {getTalents.map((item) =>
                        <div key={item.id} className={styles.divContainerAttriK}>

                            {toggle[item.id] && item.id === 10 ? (
                                <input
                                    className={styles.yourCustomClassName}
                                    value={selectNameTalents}
                                    onChange={(e) => setSelecNametTalents(e.target.value)}
                                />
                            ) : (
                                <>
                                    {item.selectName && !toggle[item.id] && <h2 className={styles.yourCustomClassName}>{item.selectName}</h2>}
                                    {!item.selectName && !toggle[item.id] && <h2 className={styles.nameAttributesK}>{item.name}</h2>}
                                </>
                            )}

                            <button onClick={() => upDateScore(item, 'less', "talents")}>-</button>
                            <div className={styles.spheresK}>
                                {[0, 1, 2, 3, 4].map((_, index) => (
                                    <h2 key={index} >
                                        <FaRegCircle className={` ${item.score > index && styles.filledScore}`} />
                                    </h2>
                                ))}

                                <button onClick={() => upDateScore(item, 'more', "talents")}>+</button>
                            </div>
                            {item.id === 10 && <button onClick={() => secondeUpdate(item, 'talents')}>Enviar</button>}

                        </div>)}
                </div>


                <div className={styles.testDiv}>
                    {getSkills.map((item) =>
                        <div key={item.id} className={styles.divContainerAttriK}>

                            {toggle[item.id] && item.id === 11 ? (
                                <input
                                    className={styles.yourCustomClassName}
                                    value={selectNameSkills}
                                    onChange={(e) => setSelectNameSkills(e.target.value)}
                                />
                            ) : (
                                <>
                                    {item.selectName && !toggle[item.id] && <h2 className={styles.yourCustomClassName}>{item.selectName}</h2>}
                                    {!item.selectName && !toggle[item.id] && <h2 className={styles.nameAttributesK}>{item.name}</h2>}
                                </>
                            )}

                            <button onClick={() => upDateScore(item, 'less', 'skills')}>-</button>
                            <div className={styles.spheresK}>
                                {[0, 1, 2, 3, 4].map((_, index) => (
                                    <h2 key={index} >
                                        <FaRegCircle className={` ${item.score > index && styles.filledScore}`} />
                                    </h2>
                                ))}

                                <button onClick={() => upDateScore(item, 'more', 'skills')}>+</button>
                            </div>
                            {item.id === 11 && <button onClick={() => secondeUpdate(item, 'skills')}>Enviar</button>}
                        </div>)}
                </div>



                <div className={styles.testDiv}>
                    {getknowledges.map((item) =>
                        <div key={item.id} className={styles.divContainerAttriK}>

                            {toggle[item.id] && item.id === 16 ? (
                                <input
                                    className={styles.yourCustomClassName}
                                    value={selectNameKnowledges}
                                    onChange={(e) => setSelectNameKnowledges(e.target.value)}
                                />
                            ) : (
                                <>
                                    {item.selectName && !toggle[item.id] && <h2 className={styles.yourCustomClassName}>{item.selectName}</h2>}
                                    {!item.selectName && !toggle[item.id] && <h2 className={styles.nameAttributesK}>{item.name}</h2>}
                                </>
                            )}

                            <button onClick={() => upDateScore(item, 'less', 'knowledges')}>-</button>
                            <div className={styles.spheresK}>
                                {[0, 1, 2, 3, 4].map((_, index) => (
                                    <h2 key={index} >
                                        <FaRegCircle className={` ${item.score > index && styles.filledScore}`} />
                                    </h2>
                                ))}

                                <button onClick={() => upDateScore(item, 'more', 'knowledges')}>+</button>
                            </div>
                            {item.id === 16 && <button onClick={() => secondeUpdate(item, 'knowledges')}>Enviar</button>}
                        </div>)}
                </div>

            </div>
        </div>
    )
}



