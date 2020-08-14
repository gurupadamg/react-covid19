import React , {useState, useEffect} from 'react'
import {fetchDailyData} from '../../api'
import {Line, Bar} from 'react-chartjs-2'

import styles from './Charts.module.css'

function Charts({data : {confirmed, recovered, deaths, lastUpdate}, country}) {
    let date
    if(confirmed){
        console.log('Charts data', confirmed.value, recovered.value, deaths.value)
        date = new Date(lastUpdate).toDateString()
    }  
    const [dailyData, setDailyData] = useState([])

    useEffect(() => {
        const fetchedDailyData = async () => {
            setDailyData(await fetchDailyData())
        }
        fetchedDailyData();
        
    },[])

    const barChart = (
        confirmed ? (
            
            <Bar 
                data={{
                        labels: ['Infected', 'Recovered', 'Death'],
                        datasets: [{
                            label: 'People',
                            backgroundColor:[
                                'rgba(0,0,255,0.5)',
                                'rgba(0,255,0,0.5)',
                                'rgba(255,0,0,0.5)',
                            ],
                            data: [confirmed.value, recovered.value, deaths.value],
                        }]
                    }}
                    options={
                        {
                            legend: {display: false},
                            title: {display: true, text: `Current state in ${country} as of now ${date}`}
                        }
                    }
            />
        ): null
    )
    const lineChart = (
        dailyData.length ? (
        <Line 
            data={{
                labels: dailyData.map(data => data.reportDate),
                datasets: [{
                    data: dailyData.map(data => data.confirmed),
                    label: 'Infected',
                    fill: true,
                    borderColor: '#3333ff'
                }, 
                {
                    data: dailyData.map(data => data.deaths),
                    label: 'Deaths',
                    fill: true,
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,0,0,0.5)'
                }] 
            }}
        />) : null
        
    )

    return (
        
        <div className={styles.container}>
            {country? barChart : lineChart}
           
        </div>
    )
}

export default Charts
