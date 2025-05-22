export type Metadata = { [key: string]: string }

export type WithMeta = {
    meta: Metadata
    protected_meta: Metadata
}

export type Address = {
    address: string
    city: string
    country: string
    zip: string
}

export type Identifier = {
    id: number
}

export type CreationDate = {
    created: number
    updated: number
}

export type PaginatedResponse<T> = {
    total: number
    last_time: number
    count: number
    data: T[]
}

export type ErrorResponse = {
    message: string
    status: number
}

export type OKResponse = {
    message: string
}

export type MetaObject = {
    value: string
    protected: boolean
}

// Options for the search endpoint
export interface SearchOptions {
    q: string; // The search query term
    types?: string[]; // Optional array of types to filter by (e.g., ['installation', 'device'])
    metadata?: Record<string, string>; // Optional key-value pairs for metadata filtering
    limit?: number; // Optional limit for results
    offset?: number; // Optional offset for pagination
    signal?: AbortSignal; // Add this line
}

// Structure of a single search result item
export interface SearchResultItem {
    id: string;
    type: string;
    name?: string;
    [key: string]: any; // Allow for other properties
}

// Structure of the overall search response
export interface SearchResultsData {
    total: number;
    results: SearchResultItem[];
    limit: number;
    offset: number;
    q: string;
    types?: string[];
    metadata?: Record<string, string>;
    // ... any other top-level properties from the API response
}

export type PermissionMap = { [key: string]: boolean }
