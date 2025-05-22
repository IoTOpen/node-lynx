import { LynxClient } from './client';
import { SearchOptions, SearchResultsData } from './types';

/**
 * Performs a search across various resource types based on query, types, and metadata.
 * This function is intended to be bound to a LynxClient instance.
 * @param this - The LynxClient instance.
 * @param options - Search parameters including query term, types, metadata filters, limit, offset, and signal.
 * @returns A promise that resolves with the search results.
 * @throws Will throw an error if the request fails or the response format is invalid.
 */
export async function Search(this: LynxClient, options: SearchOptions): Promise<SearchResultsData> {
    // This will now use the global URLSearchParams available in browsers and modern Node.js
    const params = new URLSearchParams({ q: options.q });

    if (options.types && options.types.length > 0) {
        params.set('types', options.types.join(','));
    }

    if (options.metadata) {
        for (const key in options.metadata) {
            // Automatically prefix metadata keys if they don't already start with 'metadata.'
            // Adjust this logic if your API expects keys differently.
            const fullKey = key.startsWith('metadata.') ? key : `metadata.${key}`;
            params.append(fullKey, options.metadata[key]);
        }
    }

    if (options.limit !== undefined) {
        params.set('limit', String(options.limit));
    }
    if (options.offset !== undefined) {
        params.set('offset', String(options.offset));
    }

    const path = `/api/v3beta/search?${params.toString()}`;

    // Pass the signal to requestJson.
    // requestJson in util.ts already accepts RequestInit, which includes 'signal'.
    const responseData = await this.requestJson<SearchResultsData>(path, { signal: options.signal });

    // Basic validation of the response structure
    if (!responseData || typeof responseData.total !== 'number' || !Array.isArray(responseData.results)) {
        // Consider using a more specific error type if you have one defined
        throw new Error('Invalid search response format received from API');
    }

    return responseData;
}