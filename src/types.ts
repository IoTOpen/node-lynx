export type Metadata = Record<string, string>;

export interface WithMeta {
    meta: Metadata
    protected_meta: Metadata
}

export interface Address {
    address: string
    city: string
    country: string
    zip: string
}

export interface Identifier {
    id: number
}

export interface CreationDate {
    created: number
    updated: number
}

export interface PaginatedResponse<T> {
    total: number
    last_time: number
    count: number
    data: T[]
}

export interface ErrorResponse {
    message: string
    status: number
}

export interface OKResponse {
    message: string
}

export interface MetaObject {
    value: string
    protected: boolean
}

export type PermissionMap = Record<string, boolean>;
