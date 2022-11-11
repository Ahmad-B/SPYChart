// Common object that will be used for all requests without having to maintain a specific libraries model
export interface DataApiRequest {
    url: string
    timeout?: number
    headers?: any
    method?: any
    json?: any
}