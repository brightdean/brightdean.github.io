import { useRef, useState } from 'react'
import './CountryCapitalGame.css'

const CountryCapitalGame = ({ data }) => {

    const selected = useRef([])

    const shuffleData = () => {
        let array = []
        Object.keys(data).map((key) => {
            array.push({ text: key, match: data[key] })
            array.push({ text: data[key], match: key })
        })

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const [gameData, setGameData] = useState(shuffleData)
    const [matches, setMatches] = useState(0)



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

    return (
        <main className='game'>
            <span className='counter'>Total Matches: {matches}</span>
            <div className='grid'>
                {
                    gameData.map((d, i) => {
                        return <GameButton key={i} text={d.text} match={d.match} />
                    })
                }
            </div>
        </main>

    )
}

export default CountryCapitalGame