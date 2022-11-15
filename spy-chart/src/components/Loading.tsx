import { CircularProgress, Stack } from "@mui/material";
import Box from '@mui/material/Box';

export interface Props {
    name: string
}

export default function Loading(props: Props) {

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center'
        }}>
            <Stack alignItems="center">
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
                <p aria-label="LoadingMessageDisplay"> Loading {props.name} please wait... </p>
            </Stack>

        </div>
    );
}