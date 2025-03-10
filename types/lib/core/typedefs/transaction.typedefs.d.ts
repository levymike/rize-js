export type Transaction = {
    /**
     * - A unique identifier generated by Rize
     */
    uid: string;
    /**
     * - A unique numeric identifier that indicates the order in which the Transactions were created
     */
    id: number;
    /**
     * - A unique index that indicates the order in which the Transactions were settled. Null if status is `queued` or `pending`.
     */
    settled_index?: number | null;
    /**
     * - The UID of the Transfer this Transaction is associated with, if any.
     */
    transfer_uid?: number | null;
    /**
     * - Synthetic Account from where the asset is pulled
     */
    source_synthetic_account_uid: string;
    /**
     * - Synthetic Account where the asset is landed
     */
    destination_synthetic_account_uid: string;
    /**
     * - A list of UIDS referring to Transaction Events belonging to this Transaction, if any.
     * An empty array will be returned if there is no event involved.
     * The array may contain more values as the Transaction progresses and will no longer grow when its status becomes settled.
     * The array may still be empty by the time the Transaction is `settled` if there is no custodial asset movement as a result of this Transaction.
     */
    transaction_event_uids: Array<string>;
    /**
     * - A list of UIDS referring to Custodial Accounts that are so far invovled in this Transaction.
     * An empty array will be returned if there is Custodial Account involved.
     * The array may contain more values as the Transaction progresses and will no longer grow when its status becomes settled.
     * The array may still be empty by the time the Transaction is `settled` if there is no custodial asset movement as a result of this Transaction.
     */
    custodial_account_uids: Array<string>;
    /**
     * - When a Transfer is created via `transfers.init()`, an associated Transaction is created with queued status.
     * If it involves at least one custodial transfer, once the custodial transfer is initiated, the status will transition to pending.
     *
     * Once a Transaction is settled, whether it has asset movement in custodial level, or is synthetic-only, or is RDFI (no Transfer associated), it will have a settled status.
     *
     * - ***queued*** - The Transaction is being prepared as a result of a Transfer request. Transactions that originate outside of Rize (e.g., debit card transactions, RDFI ACHs, direct deposits, etc.) will not be given this status.
     * - ***pending*** - The Transaction is being processed. This state will persist until all related Transaction Events have settled or could not be completed.
     * - ***settled*** - The Transaction is complete. All of the related Transaction Events are settled.
     * - ***failed*** - The Transaction has failed. This state indicates that one of the related Transaction Events could not be settled. A failed Transaction may require the reversal of a related Synthetic Line Item and/or Custodial Line Item.
     */
    status: 'queued' | 'pending' | 'settled' | 'failed';
    /**
     * - The amount will never be negative
     */
    us_dollar_amount: string;
    /**
     * - ***atm_withdrawal*** - Cash is withdrawn at an ATM using a Debit Card.
     * - ***card_purchase*** - A purchase is made using a Debit Card.
     * - ***card_refund*** - A previous Debit Card Transaction is refunded.
     * - ***dispute*** - If a Customer claims that a Transaction was created in error, one or more Transactions will be created with this type to credit or debit based on the dispute outcome.
     * - ***external_transfer*** - This Transaction originates from a Transfer to or from an external Synthetic Account.
     * - ***fee*** - A fee charged to the account. This includes ACH reversals and Debit Card ATM fees.
     * - ***internal_transfer*** - The Transaction originates from a Transfer between two Synthetic Accounts that are not of type external.
     * - ***other*** - Miscellaneous Transactions, such as write-offs.
     * - ***reversed_transfer*** - A previous Transfer is reversed; when a Transfer is reversed, the type of the original Transaction will be `external_transfer`, `internal_transfer`, or `third_party_transfer`.
     * - ***third_party_transfer*** - The Transaction was initiated from an external source. This will likely be an RDFI ACH, where an external source initiates a withdrawal from or deposit to the account.
     */
    type: 'atm_withdrawal' | 'card_purchase' | 'card_refund' | 'dispute' | 'external_transfer' | 'fee' | 'internal_transfer' | 'other' | 'reversed_transfer' | 'third_party_transfer';
    /**
     * - Indicates whether the Customer's asset has gone up (`positive`), gone down (`negative`) or stayed the same (`neutral`) as a result of this Transaction.
     */
    net_asset: 'positive' | 'negative' | 'neutral';
    description: string;
    /**
     * - The date and time when the Transaction is first recognized by Rize. This may be when the Transfer is initiated if the Transaction is associated with one.
     */
    created_at: string;
    /**
     * - The date and time when the Transaction is settled.
     */
    settled_at: string;
};
export type TransactionListQuery = {
    /**
     * - Filter by Customer.
     */
    customer_uid?: Array<string>;
    /**
     * - Filter by source Synthetic Account.
     */
    source_synthetic_account_uid?: Array<string>;
    /**
     * - Filter by destination Synthetic Account.
     */
    destination_synthetic_account_uid?: Array<string>;
    /**
     * - Filter by Synthetic Account, source or destination.
     */
    synthetic_account_uid?: Array<string>;
    /**
     * - Filter by type.
     */
    type?: Array<'atm_withdrawal' | 'card_purchase' | 'card_refund' | 'dispute' | 'external_transfer' | 'fee' | 'internal_transfer' | 'other' | 'reversed_transfer' | 'third_party_transfer'>;
    /**
     * - Filter by status.
     */
    status?: Array<'queued' | 'pending' | 'settled' | 'failed'>;
    /**
     * - Attempts to search for the provided string in the description field. '*' can be used as a wildcard. Any record with a match will be returned.
     */
    search_description?: string;
    /**
     * - Maximum number of items to retrieve. This filter is automatically applied with the default value if not given. Default = 100.
     */
    limit?: number;
    /**
     * - Index of the items to start retrieving from. Default = 0.
     */
    offset?: number;
    sort?: 'created_at_asc' | 'created_at_desc' | 'description_asc' | 'description_desc' | 'id_asc' | 'id_desc' | 'settled_index_asc' | 'settled_index_desc' | 'us_dollar_amount_asc' | 'us_dollar_amount_desc';
};
export type TransactionEvent = {
    /**
     * - A unique identifier generated by Rize
     */
    uid: string;
    /**
     * - A unique index that indicates the order in which Transaction Events were settled
     */
    settled_index: number;
    /**
     * - UID of the Transaction this line item belongs to
     */
    transaction_uid: string;
    /**
     * - Some Transfer types will trigger multiple transfers at the custodial level. Some of these custodial transfers must wait for all dependent custodial transfers to complete before initiating. Transaction Events with `phase` value 1 are recorded for the first set of custodial transfers that get initiated after the (Synthetic) Transfer starts. Custodial transfers in later phases cannot initiate before all events from previous phases are settled.
     */
    phase: number;
    /**
     * - Custodial Account from which the asset is pulled
     */
    source_custodial_account_uid: string;
    /**
     * - Custodial Account where the asset lands
     */
    destination_custodial_account_uid: string;
    /**
     * - A list of UIDS referring to Custodial Line Items belonging to this event. There are always at least two line items if the status is `settled`.
     */
    custodial_line_item_uids: Array<string>;
    status: string;
    /**
     * - The amount will never be negative
     */
    us_dollar_amount: string;
    type: 'odfi_ach_deposit' | 'odfi_ach_withdrawal' | 'rdfi_ach_deposit' | 'rdfi_ach_withdrawal';
    /**
     * - Indicates whether the Customer's asset has gone up (`positive`), gone down (`negative`) or stayed the same (`neutral`) as a result of this Transaction Event. This value is determined by `type`.
     */
    net_asset: 'positive' | 'negative' | 'neutral';
    description: string;
    /**
     * - The date and time when the event is first recognized by Rize. This may be when the Transfer is initiated if the event is associated with one.
     */
    created_at: string;
    /**
     * - The date and time when the event is settled.
     */
    settled_at: string;
};
export type TransactionEventListQuery = {
    /**
     * - Filter by source Custodial Account.
     */
    source_custodial_account_uid?: Array<string>;
    /**
     * - Filter by destination Custodial Account.
     */
    destination_custodial_account_uid?: Array<string>;
    /**
     * - Filter by Custodial Account, source or destination.
     */
    custodial_account_uid?: Array<string>;
    /**
     * - Filter by type. Multiple values are allowed.
     */
    type?: Array<'odfi_ach_deposit' | 'odfi_ach_withdrawal' | 'rdfi_ach_deposit' | 'rdfi_ach_withdrawal'>;
    /**
     * - Filter by Transaction. Multiple values are allowed
     */
    transaction_uid?: Array<string>;
    /**
     * - Maximum number of items to retrieve. This filter is automatically applied with the default value if not given. Default = 100.
     */
    limit?: number;
    /**
     * - Index of the items to start retrieving from. Default = 0.
     */
    offset?: number;
    sort?: 'created_at_asc' | 'created_at_desc' | 'description_asc' | 'description_desc' | 'settled_index_asc' | 'settled_index_desc' | 'us_dollar_amount_asc' | 'us_dollar_amount_desc';
};
export type SyntheticLineItem = {
    /**
     * - A unique identifier generated by Rize
     */
    uid: string;
    /**
     * - A unique index that indicates the order in which the Synthetic Line Items were settled
     */
    settled_index: number;
    /**
     * - UID of the Transaction this Synthetic Line Item belongs to
     */
    transaction_uid: string;
    /**
     * - UID of the Synthetic Account this Synthetic Line Item is associated with
     */
    synthetic_account_uid: string;
    status: string;
    /**
     * - The signed USD amount of this specific Synthetic Line Item
     */
    us_dollar_amount: string;
    /**
     * - The Synthetic Account balance after this Synthetic Line Item was settled
     */
    running_us_dollar_balance: string;
    /**
     * - Human-readable description in context of Synthetic Accounts
     */
    description: string;
    /**
     * - The date and time when the Synthetic Line Item is first recognized by Rize. This may be when the Transfer is initiated if the Synthetic Line Item is associated with one.
     */
    created_at: string;
    /**
     * - The date and time when the Synthetic Line Item is settled
     */
    settled_at: string;
};
export type SyntheticLineItemListQuery = {
    /**
     * - Filter by Customer.
     */
    customer_uid?: Array<string>;
    /**
     * - Filter by pool.
     */
    pool_uid?: Array<string>;
    /**
     * - Filter by Synthetic Account.
     */
    synthetic_account_uid?: Array<string>;
    /**
     * - Maximum number of items to retrieve. This filter is automatically applied with the default value if not given. Default = 100.
     */
    limit?: number;
    /**
     * - Index of the items to start retrieving from. Default = 0.
     */
    offset?: number;
    /**
     * - Filter by Transaction.
     */
    transaction_uid?: Array<string>;
    /**
     * - Filter by status.
     */
    status?: Array<'begun' | 'failed' | 'in_progress' | 'settled'>;
    /**
     * '|'created_at_desc'|'description_asc'|'description_desc'|'settled_index_asc'|'settled_index_desc'|'us_dollar_amount_asc'|'us_dollar_amount_desc} [sort]
     */
    "": created_at_asc;
};
export type CustodialLineItem = {
    /**
     * - A unique identifier generated by Rize.
     */
    uid: string;
    /**
     * - A unique index that indicates the order in which the Custodial Line Items were settled.
     */
    settled_index: number;
    /**
     * - UID of the Transaction this Custodial Line Item belongs to.
     */
    transaction_uid: string;
    /**
     * - UID of the Transaction Event this Custodial Line Item belongs to.
     */
    transaction_event_uid: string;
    /**
     * - UID of the Custodial Account this Custodial Line Item is associated with.
     */
    custodial_account_uid: string;
    status: string;
    /**
     * - The signed USD amount of this specific Custodial Line Item
     */
    us_dollar_amount: string;
    /**
     * - US dollar balance of the Custodial Account as of the completion of this Custodial Line Item. This field may be empty unless the status is `settled` or `voided`.
     */
    running_us_dollar_balance?: string | null;
    /**
     * - Symbols and/or numbers that represent different types of Custodial Line Items.
     */
    type: string;
    /**
     * - Descriptions pulled from the custodians, such as through NACHA description or ISO-8583 data element 43.
     */
    description: string;
    /**
     * - The date and time when the Custodial Line Items is first recognized by Rize. This may be when the Transfer is initiated if the Custodial Line Item is associated with one.
     */
    created_at: string;
    /**
     * - This field may be empty if status is not settled or voided.
     */
    occurred_at: string;
    /**
     * - The date and time when the Custodial Line Item is settled.
     */
    settled_at: string;
};
export type CustodialLineItemListQuery = {
    /**
     * - Filter by Customer.
     */
    customer_uid?: Array<string>;
    /**
     * - Filter by Custodial Account.
     */
    custodial_account_uid?: Array<string>;
    /**
     * - Filter by status.
     */
    status?: Array<'settled' | 'voided'>;
    /**
     * - Return any records having a us_dollar_amount at or below us_dollar_amount_max.
     */
    us_dollar_amount_tax?: number;
    /**
     * - Return any records having a us_dollar_amount at or above us_dollar_amount_min.
     */
    us_dollar_amount_min?: number;
    /**
     * - Filter by Transaction Event.
     */
    transaction_event_uid?: Array<string>;
    /**
     * - Filter by Transaction.
     */
    transaction_uid?: Array<string>;
    /**
     * - Maximum number of items to retrieve. This filter is automatically applied with the default value if not given. Default = 100.
     */
    limit?: number;
    /**
     * - Index of the items to start retrieving from. Default = 0.
     */
    offset?: number;
    sort?: 'created_at_asc' | 'created_at_desc' | 'description_asc' | 'description_desc' | 'settled_index_asc' | 'settled_index_desc' | 'us_dollar_amount_asc' | 'us_dollar_amount_desc';
};
