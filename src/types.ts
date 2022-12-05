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
