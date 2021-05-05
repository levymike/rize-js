export = ComplianceWorkflowService;
/**
 * The Compliance Workflow service class.
 */
declare class ComplianceWorkflowService {
    /**
     * @hideconstructor
     * @param {import('axios').AxiosInstance} api
     */
    constructor(api: import('axios').AxiosInstance);
    /** @ignore @protected */ protected _api: import("axios").AxiosInstance;
    /**
     * @ignore
     * @protected
     * @param {string} complianceWorkflowUid - A UID referring to the Compliance Workflow.
     * @param {string} customerUid - A UID referring to the Customer.
     */
    protected _validateAcknowledgeDocumentParams(complianceWorkflowUid: string, customerUid: string): void;
    /**
     * @ignore
     * @protected
     * @param {ComplianceDocumentAcknowledgementRequest} document
     */
    protected _validateAcknowledgeDocumentDocument(document: ComplianceDocumentAcknowledgementRequest): void;
    /**
     * Creates a new Compliance Workflow.
     * @param {string} customerExternalUid - A Customer identifier supplied by the Partner, unique among the collection of all partner Customers.
     * @param {string} email - Email address associated with the Customer.
     * @returns {Promise<ComplianceWorkflow>} - A promise that returns the new Compliance Workflow if resolved.
     * @example
     * const newWorkflow = await rize.complianceWorkflow.create('client-generated-42', 'tomas@example.com');
     */
    create(customerExternalUid: string, email: string): Promise<ComplianceWorkflow>;
    /**
     * Renew a Compliance Workflow after it expired the given timeframe
     * @param {string} customerExternalUid - A Customer identifier supplied by the Partner, unique among the collection of all partner Customers.
     * @param {string} customerUid - A UID referring to the Customer generated by Rize
     * @param {string} email - Email address associated with the Customer.
     * @returns {Promise<ComplianceWorkflow>} A promise that returns the new Compliance Workflow entity if resolved.
     */
    renew(customerExternalUid: string, customerUid: string, email: string): Promise<ComplianceWorkflow>;
    /**
     * Retrieves the most recent Compliance Workflow for a Customer.
     * @param {string} customerUid - A UID referring to the Customer
     * @returns {Promise<ComplianceWorkflow>} - A promise that returns the latest Compliance Workflow if resolved.
     * @example
     * const latestWorkflow = await rize.complianceWorkflow.viewLatest('h9MzupcjtA3LPW2e');
     */
    viewLatest(customerUid: string): Promise<ComplianceWorkflow>;
    /**
     * Indicate acceptance or rejection of Compliance Documents within a given Compliance Workflow.
     * @param {string} complianceWorkflowUid - A UID referring to the Compliance Workflow.
     * @param {string} customerUid - A UID referring to the Customer.
     * @param {ComplianceDocumentAcknowledgementRequest | Array<ComplianceDocumentAcknowledgementRequest>} documents
     * @returns {Promise<ComplianceWorkflow>} - A promise that returns the updated Compliance Workflow if resolved.
     * @example
     * // Acknowledge a single compliance document
     * const updatedWorkflow = await rize.complianceWorkflow.acknowledgeComplianceDocuments(
     *     'SPbiwv93C6M5pSWu', //complianceWorkflowUid
     *     'h9MzupcjtA3LPW2e', //customerUid
     *     {
     *         document_uid: 'Yqyjk5b2xgQ9FrxS',
     *         accept: 'yes',
     *         user_name: 'Olive Oyl',
     *         ip_address: '152.32.111.61'
     *     }
     * );
     *
     * // Acknowledge multiple compliance documents
     * const updatedWorkflow = await rize.complianceWorkflow.acknowledgeComplianceDocuments(
     *     'SPbiwv93C6M5pSWu', //complianceWorkflowUid
     *     'h9MzupcjtA3LPW2e', //customerUid
     *     [{
     *         document_uid: 'Yqyjk5b2xgQ9FrxS',
     *         accept: 'yes',
     *         user_name: 'Olive Oyl',
     *         ip_address: '152.32.111.61'
     *     }, {
     *         document_uid: 'dc6PApa2nn9K3jwL',
     *         accept: 'yes',
     *         user_name: 'Olive Oyl',
     *         ip_address: '152.32.111.61'
     *     }])
     * );
     */
    acknowledgeComplianceDocuments(complianceWorkflowUid: string, customerUid: string, documents: ComplianceDocumentAcknowledgementRequest | Array<ComplianceDocumentAcknowledgementRequest>): Promise<ComplianceWorkflow>;
}
declare namespace ComplianceWorkflowService {
    export { ComplianceWorkflow, ComplianceDocumentAcknowledgementRequest };
}
type ComplianceDocumentAcknowledgementRequest = import('./typedefs/compliance-workflow.typedefs').ComplianceDocumentAcknowledgementRequest;
type ComplianceWorkflow = import('./typedefs/compliance-workflow.typedefs').ComplianceWorkflow;
