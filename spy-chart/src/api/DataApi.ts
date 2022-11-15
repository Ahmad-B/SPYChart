import ky, { Options } from 'ky';
import { DataApiRequest } from '../models/DataApiRequest';

const DEFAULT_APP_TIMEOUT = 5000;

export default class DataApi {
    
    // Standard function for fetch data, easily maintainable to change libraries or upgrade
    static async getData<T>(request: DataApiRequest) {
        var kyOptions = DataApi.mapRequestToKyOptions(request);
        var response = await ky.get(request.url, {...kyOptions});
        return response.json() as T;
    }

    // Map the options of our request to the options of whatever library we are using to fetch data
    static mapRequestToKyOptions(request: DataApiRequest) {
        return {
            method: request.method,
            headers: request.headers,
            json: request.json,
            timeout: request.timeout ?? DEFAULT_APP_TIMEOUT
        } as Options
    }
}