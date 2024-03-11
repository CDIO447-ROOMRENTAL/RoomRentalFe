import { createContractFailed, createContractStart, createContractSuccess } from "./ContractSlice";

export const createContractRequest = async (contractData, dispatch, jwt) => {
    try {
        dispatch(createContractStart()); // Dispatch action to indicate contract creation process started

        // Make API request to create a contract
        const response = await fetch('http://localhost:8080/api/accommodation/room/contract/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`, // Assuming jwt is used for authorization
            },
            body: JSON.stringify(contractData),
        });

        if (response.ok) {
            // If request is successful, parse the response data
            const data = await response.json();
            // Dispatch action for successful contract creation
            dispatch(createContractSuccess(data));
            return true;
        } else {
            // If request fails, dispatch action for contract creation failure
            dispatch(createContractFailed('Failed to create contract'));
            console.error('Error:', response.statusText);
            return false;
        }
    } catch (error) {
        // If an error occurs during the process, dispatch action for contract creation failure
        dispatch(createContractFailed(`Failed to create contract. An error occurred: ${error.message}`));
        console.error('Error:', error.message);
        return false;
    }
};
