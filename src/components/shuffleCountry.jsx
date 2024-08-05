import React, { useEffect, useState } from 'react'
import CountryMap from './countryMap';

function ShuffleCountry() {

    const [mainCountryData, setCountryData] = useState([])
    const [shuffleCountry, setShuffleCountry] = useState([])

    const [selectedCountry, setSelectedCountry] = useState([])
    const [winnigCounrtry, setWinngCountry] = useState([])

    const [wrongSelected, setWrongSelected] = useState([])
    const [showWinCompo, setShowWinCompo] = useState(false)

    const Data = {
        'India': 'Delhi',
        'Russia': 'Moscow',
        'China': 'Beijing',
        'United States': 'Washington, D.C.',
        'United Kingdom': 'London',
        'France': 'Paris',
        'Germany': 'Berlin',
        // 'Japan': 'Tokyo',
        // 'Australia': 'Canberra',
        // 'Canada': 'Ottawa',
        // 'Brazil': 'Brasília'
    };

    const transInArray = Object.entries(Data)

    useEffect(() => {
        // ham itna sab na karke flat() array method ka bhi use kar sakte hai wo nested array ko signle array mai convert kar dega like [ [india,delhi] ] to [india,delhi] and you have to do entries to get that array first const transInArray = Object.entries(Data).flat() just like that  fir niche jo kiya vo karne ke jarurat nahi hai just loop through that
        transInArray.map((item) => {
            const show = mainCountryData.indexOf(item[0])
            if (show == -1) {
                setCountryData(prev => [...prev, item[0]])
                setCountryData(prev => [...prev, item[1]])
            }
        })
    }, [])

    useEffect(() => {
        if (mainCountryData) {
            mainCountryData.sort(() => Math.random() - 0.5)
            setShuffleCountry(mainCountryData)
        }
    }, [mainCountryData])

    function selectCountryAndCapital(country) {
        if (selectedCountry.length < 2) {
            setSelectedCountry(prev => ([...prev, country]))
        }
    }

    useEffect(() => {
        for (let i = 0; i < transInArray.length; i++) {
            if (selectedCountry.length == 2) {
                if (transInArray[i]) {
                    if (transInArray[i][0] == selectedCountry[0] && transInArray[i][1] == selectedCountry[1] || transInArray[i][1] == selectedCountry[0] && transInArray[i][0] == selectedCountry[1]) {
                        setWinngCountry(prev => [...prev, selectedCountry[0], selectedCountry[1]])
                        setSelectedCountry([])
                    } else {
                        setWrongSelected([selectedCountry[0], selectedCountry[1]])
                        setSelectedCountry([])
                    }
                }
            }
        }
    }, [selectedCountry])

    useEffect(() => {
        if (shuffleCountry && shuffleCountry.length) {
            if (winnigCounrtry.length == shuffleCountry.length) {
                setShowWinCompo(true)
            }
        }
    }, [winnigCounrtry, selectedCountry])

    return (
        <>
            {
                showWinCompo ? (
                    <div>
                        <h1>Congratulations</h1>
                    </div>
                ) : (
                    <div className='maincard'>
                        {
                            shuffleCountry.map((country, idx) => {
                                return (
                                    <CountryMap key={idx} country={country} selectCountryAndCapital={selectCountryAndCapital} winnigCounrtry={winnigCounrtry} selectedCountry={selectedCountry} wrongSelected={wrongSelected} />
                                )
                            })
                        }
                    </div>
                )
            }
        </>
    )
}

export default ShuffleCountry