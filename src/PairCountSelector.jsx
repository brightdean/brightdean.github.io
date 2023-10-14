import React, { useState } from 'react'

const PairCountSelector = ({handlePairCountChange}) => {
   
    const pairButtonCounts = [4, 8, 12, 16, 20]

    const [selected, setSelected] = useState(pairButtonCounts[0])


    const PairButton = ({ count }) => {
        return (
            <button
                id={count}
                className={selected == count ? 'pair-button selected' : 'pair-button'}
                onClick={() => {
                    setSelected(count);
                    handlePairCountChange(count);
                }}>
                {count}
            </button>
        )
    }

    return (
        <section className='pairs'>
            {/* <p>Number of pairs </p> */}
            {pairButtonCounts.map((count, i) => {
                return <PairButton key={i} count={count} />
            })}
        </section>
    )
}

export default PairCountSelector