import React, { Component } from 'react'

import { Cards, Charts, CountryPicker} from './components'
import { fetchData } from './api'
import styles from './App.module.css'

import covid from './images/corona.jpg'

class App extends Component {
    state = {
        data: {},
        country: ''
    }

    countryChangeHandler = async (country) => {
        this.setState({country: country})
        // Fetch Data
       const data = await fetchData(country)
       
       this.setState({data: data })
       
    }

    async componentDidMount(){
        const fetchedData  = await fetchData()
        this.setState({data: fetchedData})
    }
    render() {
        const { data, country } = this.state
        return (
            <div className={styles.container}>
                <img className={styles.image} src={covid} alt="COIVID-19" />
                <Cards data = {data} />
                <CountryPicker countryChangeHandler={this.countryChangeHandler} />
                <Charts data={data} country={country}/>
                
            </div>
        )
    }
}

export default App
