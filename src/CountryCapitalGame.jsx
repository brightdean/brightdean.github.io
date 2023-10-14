import { useEffect, useRef, useState } from 'react'
import './CountryCapitalGame.css'

const CountryCapitalGame = ({ data }) => {

    const selected = useRef([])

    const [pairs, setPairs] = useState(8);

    const shuffleData = () => {
        let array = []
        let pairCounter = 0;
        Object.keys(data).map((key) => {
            if (pairCounter < pairs) {
                array.push({ text: key, match: data[key] })
                array.push({ text: data[key], match: key })
                pairCounter++
            }

        })


        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const [gameData, setGameData] = useState(shuffleData)
    const [matches, setMatches] = useState(0)

    useEffect(() => {
        setGameData(shuffleData)
    }, [pairs])

    const handleButtonClick = (text, match) => {


        if (selected.current.length === 0) {
            selected.current.push({ text: text, match: match })

            document.getElementById(text).classList.add("selected");
            return;
        }

        if (selected.current.length === 1) {
            selected.current.push({ text: text, match: match })

            if (selected.current[0].match === selected.current[1].text) {
                const filteredData = gameData.filter((o) => (o.text !== text && o.match !== text))

                selected.current = []
                setMatches(matches + 1)
                setGameData(filteredData);
                return;
            }
            document.getElementById(selected.current[0].text).classList.remove("selected");
            document.getElementById(selected.current[0].text).classList.add("wrong");

            document.getElementById(text).classList.add("wrong")

            return;

        }

        if (selected.current.length === 2) {
            document.getElementById(selected.current[0].text).classList.remove("wrong");
            document.getElementById(selected.current[1].text).classList.remove("wrong");
            selected.current = []
            selected.current.push({ text: text, match: match })
            document.getElementById(text).classList.add("selected");

        }


    }

    const GameButton = ({ text, match }) => {

        return (
            <button
                id={text}
                className="game-button"
                onClick={() => handleButtonClick(text, match)}>
                {text}
            </button>
        )
    }

    const PairButton = ({ count }) => {
        return (
            <button
                className='pair-button'
                onClick={() => setPairs(count)}>
                {count}
            </button>
        )
    }

    return (
        <main className='game'>
            <section className='pairs'>
                <PairButton count={8} />
                <PairButton count={16} />
                <PairButton count={24} />
                <PairButton count={32} />
            </section>
            <span className='counter'>Total Matches: {matches}</span>
            <div className='grid'>
                {
                    gameData.map((d, i) => {
                        return <GameButton key={i} text={d.text.replace('_', ' ')} match={d.match.replace('_', ' ')} />
                    })
                }
            </div>
        </main>

    )
}

export default CountryCapitalGame