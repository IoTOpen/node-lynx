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

// SearchOptions defines the contract for search endpoint queries.
// Allows filtering by type, metadata, and supports pagination and aborting requests.
export interface SearchOptions {
    q: string;
    types?: string[];
    metadata?: Record<string, string>;
    limit?: number;
    offset?: number;
    signal?: AbortSignal;
}

// SearchResultItem represents a single entity returned from a search query.
// Allows for extensibility to support various resource types and custom fields.
export interface SearchResultItem {
    id: string;
    type: string;
    name?: string;
    [key: string]: any;
}

// SearchResultsData defines the structure of a paginated search response from the API.
// Includes metadata about the query, filters, and the result set.
export interface SearchResultsData {
    total: number;
    results: SearchResultItem[];
    limit: number;
    offset: number;
    q: string;
    types?: string[];
    metadata?: Record<string, string>;
}

export type PermissionMap = { [key: string]: boolean }
