import { DataApiRequest } from "../models/DataApiRequest"
import { SpyData } from "../models/SPYData";
import DataApi from "./DataApi"

const SPY_DATA_URL = 'http://localhost:4000/spydata'

export default class SPYDataApi {

    // Standard call to query the SPY data from the specified URL
    static async getSPYData() {
        var request : DataApiRequest = { url: SPY_DATA_URL, timeout: 3000 }
        var spyData = await DataApi.getData<SpyData[]>(request);
        return spyData;
    }

}