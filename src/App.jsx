import './App.css'
import CountryCapitalGame from './CountryCapitalGame'
import countryCapitals from './mockup/countryCapitals'

function App() {

  return (
    <>
      <h1>~~ Today's Pairs ~~</h1>
      <CountryCapitalGame data={countryCapitals} />
    </>
  )
}

export default App
