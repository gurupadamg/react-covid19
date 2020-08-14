import React , { useState, useEffect } from 'react'
import {FormControl, NativeSelect} from '@material-ui/core'
import {fetchCountries} from '../../api'

import styles from './CountryPicker.module.css'

function CountryPicker({countryChangeHandler}) {
    const [countries, setCountries] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            setCountries(await fetchCountries())
        }

        fetchAPI()
    }, [])

    return (
        <FormControl className={styles.formControl} >
            <NativeSelect defaultValue="" onChange= { e => countryChangeHandler(e.target.value)}>
                <option value="">Global</option>
                     {countries.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker
