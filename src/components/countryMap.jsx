import React, { useEffect, useState } from 'react'

function CountryMap({ country, selectCountryAndCapital, winnigCounrtry, selectedCountry, wrongSelected }) {

    const [display, setDisplay] = useState('')
    const [active, setActive] = useState('')


    const [wrongGuss, setWrongGuess] = useState('')

    useEffect(() => {
        if (winnigCounrtry.includes(country)) {
            setActive('active')
            const timer = setTimeout(() => {
                setDisplay('displayOff')
            }, 1000)
            return (() => clearInterval(timer))
        }

        if (wrongSelected.includes(country)) {
            setWrongGuess('wrongGuess')
            const timer = setTimeout(() => {
                setWrongGuess('')
            }, 1000)

            return (() => clearInterval(timer))
        }
    }, [winnigCounrtry, wrongSelected])

    return (
        <div className={`countrycard ${display} ${active} ${selectedCountry.includes(country) && 'selectedActive'} ${wrongGuss}`} onClick={() => selectCountryAndCapital(country)} style={{ cursor: 'pointer' }}>
            <p>{country}</p>
        </div>
    )
}

export default CountryMap