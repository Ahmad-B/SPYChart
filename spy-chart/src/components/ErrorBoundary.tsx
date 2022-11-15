import { Alert, AlertTitle, Stack } from "@mui/material";

export interface Props {
    message?: string | null
}

export default function ErrorBonudary(props: Props) {

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center'
        }}>
            <Stack alignItems="center">
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <p aria-label="ErrorMessageDisplay">{props.message ?? 'An error has occured, please try refreshing the page'}</p>
                </Alert>
            </Stack>

        </div>
    );
}