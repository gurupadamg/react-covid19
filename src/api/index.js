import axios from 'axios'

const uri = 'https://covid19.mathdro.id/api'

export const fetchData = async (country) => {
    let changeableUri = uri
    if(country){
        changeableUri = `${changeableUri}/countries/${country}`
    }
    try{
        const {data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUri)
        return { confirmed, recovered, deaths, lastUpdate }
    }catch(error){
        console.log('Error', error.message)
    }
}

export const fetchDailyData = async () => {
    try{
        const {data} = await axios.get(`${uri}/daily`)
        const modifiedData = data.map( dailyData => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            reportDate: dailyData.reportDate
        }))
        return modifiedData
    }catch(error){
        console.log('Error', error.message)
    }
} 


export const fetchCountries = async () => {
    try{
        const {data} = await axios.get(`${uri}/countries`)
        return data.countries.map(country => country.name)
    }catch(error){
        console.log(error)
    }
}