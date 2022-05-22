import { CovidData } from "./global";

const COVID_DATA_URL = "https://api.covid19api.com/summary";

export const fetchCovidData: () => Promise<CovidData> = () => {
    return fetch(COVID_DATA_URL).then((response) => {
        if(response.status === 200) {
            return response.json()
        } else if(response.ok) {
            return []
        } else {
            throw Error(JSON.stringify({message: "Invalid response", status: response.status}))
        }
    })
}