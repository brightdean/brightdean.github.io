import { useRef, useState } from 'react'
import './App.css'
import CountryCapitalGame from './CountryCapitalGame'
import Timer from './Timer'
import countryCapitals from './mockup/countryCapitals'
import PairCountSelector from './PairCountSelector'

function App() {


  const [status, setStatus] = useState(0);
  
  const pairs = useRef(4);

  function handlePairCountChange(count){
    pairs.current = count
  }

  return (
    <>
    {status === 1 ? 
    <>
      <h1>~~ Today's Pairs ~~</h1>
      {/* <Timer setStatus={setStatus} pairs={pairs.current}/> */}
      <CountryCapitalGame data={countryCapitals} pairs={pairs.current} setStatus={setStatus}/>
    </> : status === 0 ?
    <>
      <h2>Match Countries with their capitals !!</h2>
      <p style={{marginTop: '50px'}}>Select the number of pairs to be shown</p>
      <PairCountSelector handlePairCountChange={handlePairCountChange}/>
      <button 
      className='start-button'
      onClick={() => setStatus(1)}>Start</button>
    </> :
    <>
      <h1>~~ Congratulations !! ~~</h1>
    </>
    }
    </>
  )
}

export default App
