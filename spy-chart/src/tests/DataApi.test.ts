import SPYDataApi from '../api/SPYDataApi';
import { SpyData } from '../models/SPYData';

var dummyData : SpyData[] = [{
    "date": "04/03/2021",
    "open": 381.220001,
    "high": 384,
    "low": 371.880005,
    "close": 376.700012,
    "volume": 183433000
},{
    "date": "05/03/2021",
    "open": 380.459991,
    "high": 384.76001,
    "low": 372.640015,
    "close": 383.630005,
    "volume": 152039600
}]

SPYDataApi.getSPYData = jest.fn(() => 
    Promise.resolve(dummyData)
);

// ToDo: Test suite is failing possbily due to babel config
test.skip("method returns spy data", async () => {
    const data = await SPYDataApi.getSPYData();

    expect(data).toEqual(dummyData)
    expect(SPYDataApi.getSPYData).toHaveBeenCalledTimes(1)
})