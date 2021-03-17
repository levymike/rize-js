/**
 * <T>
 */
export type RizeList<T> = {
    /**
     * - Total count of items available to retrieve
     */
    total_count: number;
    /**
     * - Number of items retrieved
     */
    count: number;
    /**
     * - Maximum number of items to retrieve
     */
    limit: number;
    /**
     * - Index of the first item to retrieve
     */
    offset: number;
    data: Array<T>;
};
export type Address = {
    street1: string;
    street2?: string | null;
    city: string;
    state: string;
    postal_code: string;
};
