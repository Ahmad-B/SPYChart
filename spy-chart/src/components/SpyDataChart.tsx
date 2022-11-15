import ReactApexChart from 'react-apexcharts';
import { SpyData } from '../models/SPYData';
import { Theme } from '../models/Themes';

export interface Props {
    data: SpyData[],
    formatting?: number | undefined,
    theme: Theme,
    showGridLines: boolean
}

export default function SpyDataChart(props: Props) {

    // ToDo: Make a standard options object and use as default base
    var options: ApexCharts.ApexOptions = {
        series: [{
            data: props.data.map((d: SpyData) => {
                return { x: d.date, y: [d.open, d.high, d.low, d.close] }
            })
        }],
        chart: {
            type: 'candlestick',
            height: 290,
            id: 'candles',
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true,
                }
            },
            zoom: {
                enabled: false
            },
        },
        title: {
            text: "SPY",
            align: "left"

        },
        plotOptions: {
            candlestick: {
                colors: {
                    upward: '#32A852',
                    downward: '#ff0000'
                }
            }
        },
        xaxis: {
            categories: props.data.map((d: SpyData) => d.date),
            labels: {
                show: false
            }
        },
        yaxis: {
            decimalsInFloat: props.formatting,
        },
        theme: {
            mode: props.theme === Theme.DARK ? "dark" : "light"
        },
        grid : {
            yaxis: {
                lines: {
                    show: props.showGridLines
                }
            }
        }
    };

    var optionsBar: ApexCharts.ApexOptions = {
        series: [{
            name: 'volume',
            data: props.data.map((d: SpyData) => { 
                return d.volume 
            })
        }],
        chart: {
            height: 160,
            type: 'bar',
            brush: {
                enabled: true,
                target: 'candles'
            },
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true,
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            bar: {
                columnWidth: '80%',
                colors: {
                    ranges: [{
                        from: -1000,
                        to: 0,
                        color: '#F15B46'
                    }, {
                        from: 1,
                        to: 10000,
                        color: '#FEB019'
                    }],

                },
            }
        },
        stroke: {
            width: 0
        },
        xaxis: {
            categories: props.data.map((d: SpyData) => d.date)
        },
        yaxis: {
            labels: {
                show: true,
                align: 'right'
            }
        },
        tooltip: {
            enabled: true
        },
        theme: {
            mode: props.theme === Theme.DARK ? "dark" : "light"
        },
        grid : {
            yaxis: {
                lines: {
                    show: props.showGridLines
                }
            }
        }
    };

    return (
        <div className="chart-box">
            <div id="chart-candlestick" style={{ marginBottom: '-50px'}}>
                <ReactApexChart options={options} series={options.series} type="candlestick" height={400} />
            </div>
            <div id="chart-bar">
                <ReactApexChart options={optionsBar} series={optionsBar.series} type="bar" height={200} />
            </div>

        </div>
    )
}