import { useTheme } from "@emotion/react";
import moment from "moment";
import React from "react";
import { useEffect, useState } from "react";
import { ColorModeContext } from "../App";
import { SpyData } from "../models/SPYData";
import { Theme } from "../models/Themes";
import SpyDataChart from "./SpyDataChart";
import ChartOptionSelectors from "./ChartOptionSelectors";

export interface Props {
    spyData: SpyData[]
}

export default function SPYDataViewer(props: Props) {

    const currentTheme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    const [fromDate, setFromDate] = useState<moment.Moment | null | undefined>();
    const [toDate, setToDate] = useState<moment.Moment | null | undefined>();
    const [theme, setTheme] = useState(Theme.LIGHT);
    const [format, setFormat] = useState(-1);
    const [showGridLines, setShowGridLines] = useState(true);
    const dateFormatting = "DD/MM/YYYY";

    useEffect(() => {
        setFromDate(moment(props.spyData[0].date, dateFormatting))
        setToDate(moment(props.spyData[props.spyData.length - 1].date, dateFormatting))
    }, [props.spyData])

    function displaySpyData(): SpyData[] {
        var dateFilteredData = filterDataBySelectedDates();
        var formattedData = applyFormattingToData(dateFilteredData);
        return formattedData;
    }

    function filterDataBySelectedDates() {
        if (!fromDate && !toDate) return props.spyData;
        var filteredData: SpyData[] = [];

        for (const dataDay of props.spyData) {
            var date = moment(dataDay.date, dateFormatting);
            if (date.isSameOrBefore(toDate) && date.isSameOrAfter(fromDate)) filteredData.push(dataDay)
        }

        return filteredData;
    }

    function applyFormattingToData(spyData: SpyData[]) {
        if (format === -1) return spyData;
        var updatedData = [...spyData]
        for (let i = 0; i < updatedData.length; i++) {
            updatedData[i] = applyFormatting(updatedData[i])
        }
        return updatedData;
    }

    function applyFormatting(spyData: SpyData): SpyData {
        // ToDo: bad for performance, find a better way to round and keep number type
        return { ...spyData, open: Number(spyData.open.toFixed(format)), high: Number(spyData.high.toFixed(format)), low: Number(spyData.low.toFixed(format)), close: Number(spyData.close.toFixed(format)) }
    }

    return (
        <div>
            <h2>SPY Data</h2>
            <ChartOptionSelectors data={props.spyData} theme={theme} format={format} fromDate={fromDate} toDate={toDate} showGridLines={showGridLines} onSelectedFormat={setFormat} onSelectedFromDate={setFromDate} onSelectedToDate={setToDate} onShowGridLinesChanged={setShowGridLines} onSelectedTheme={(t) => { setTheme(t); colorMode.toggleColorMode() }} />
            <SpyDataChart data={displaySpyData()} formatting={format === -1 ? undefined : format} theme={theme} showGridLines={showGridLines} />
        </div>
    );
}