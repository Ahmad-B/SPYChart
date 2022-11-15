import { useQuery } from 'react-query'
import SPYDataApi from '../api/SPYDataApi'
import ErrorBonudary from '../components/ErrorBoundary'
import Loading from '../components/Loading'
import SPYDataViewer from '../components/SPYDataViewer'

export default function Main() {

    const { data, isLoading, isError } = useQuery('spy-data', SPYDataApi.getSPYData)

    if (isLoading)
        return <Loading name='SPY data'/>

    if (isError || !data)
        return <ErrorBonudary />

    return (
        <div>
            <SPYDataViewer spyData={data}/>
        </div>

    )
}