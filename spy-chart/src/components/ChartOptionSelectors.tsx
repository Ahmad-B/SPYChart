import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { SpyData } from '../models/SPYData';
import { Theme } from '../models/Themes';


export interface Props {
    data: SpyData[] | undefined;
    theme: Theme;
    format: number;
    fromDate: moment.Moment | null | undefined;
    toDate: moment.Moment | null | undefined;
    showGridLines: boolean;
    onSelectedFromDate(from: moment.Moment | null | undefined): void;
    onSelectedToDate(to: moment.Moment | null | undefined): void;
    onSelectedFormat(format: number): void;
    onSelectedTheme(theme: Theme): void;
    onShowGridLinesChanged(update: boolean): void
}

export default function ChartOptionSelectors(props: Props) {

    function getDate(index: number) {
        if (!props.data) return undefined;
        var myDate = props.data[index].date;
        myDate = moment(myDate, "DD/MM/YYYY").toISOString();
        return moment(myDate);
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
        }}>

            <Stack direction="row" spacing={2}>

                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                        label="From"
                        value={props.fromDate}
                        onChange={(newValue) => {
                            props.onSelectedFromDate(newValue)
                        }}
                        inputFormat="DD/MM/YYYY"
                        minDate={getDate(0)}
                        maxDate={props.toDate}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                        label="To"
                        value={props.toDate}
                        onChange={(newValue) => {
                            props.onSelectedToDate(newValue)
                        }}
                        inputFormat="DD/MM/YYYY"
                        minDate={props.fromDate}
                        maxDate={getDate(props.data ? props.data.length - 1 : 0)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

                <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
                    <InputLabel id="format-select">Price Format</InputLabel>
                    <Select
                        aria-label="format-selector"
                        data-testid="format-selector"
                        id="format-select"
                        value={props.format}
                        label="Price Format"
                        onChange={(e) => props.onSelectedFormat(e.target.value as number)}
                    >
                        {[-1, 0, 1, 2, 3, 4, 5].map(v => <MenuItem key={v} value={v}> {v === -1 ? <em>None</em> : `${v} dp`}</MenuItem>)}
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
                    <InputLabel id="gridlines-select">Grid Lines</InputLabel>
                    <Select
                        aria-label="gridlines-selector"
                        data-testid="gridlines-selector"
                        id="gridlines-select"
                        value={props.showGridLines ? "Show" : "Hide"}
                        label="Grid Lines"
                        onChange={(e) => props.onShowGridLinesChanged(e.target.value === "Show" ? true : false)}
                    >
                        <MenuItem value={"Show"} disabled={props.showGridLines}>Show</MenuItem>
                        <MenuItem value={"Hide"} disabled={!props.showGridLines}>Hide</MenuItem>

                    </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
                    <InputLabel id="theme-select">Theme</InputLabel>
                    <Select
                        aria-label="themes-selector"
                        data-testid="themes-selector"
                        id="themes-select"
                        value={props.theme}
                        label="Theme"
                        onChange={(e) => props.onSelectedTheme(e.target.value as Theme)}
                    >
                        <MenuItem value={Theme.LIGHT} disabled={props.theme === Theme.LIGHT}>Light</MenuItem>
                        <MenuItem value={Theme.DARK} disabled={props.theme === Theme.DARK}>Dark</MenuItem>

                    </Select>
                </FormControl>

            </Stack>
        </div>
    );
}