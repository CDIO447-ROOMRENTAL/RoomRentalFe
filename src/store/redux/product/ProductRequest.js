import {
    categoriesFailed,
    categoriesStart,
    categoriesSuccess,
    createProductStart,
    createProductSuccess,
    createProductFailed,
    productsSuccess,
    productsStart,
    productsFailed,
    updateProductStart,
    updateProductSuccess,
    updateProductFailed,
    getProductByIdStart,
    getProductByIdSuccess,
    getProductByIdFailed,
    createRoomStart,
    createRoomSuccess,
    createRoomFailed,
    getRoomsStart,
    getRoomsSuccess,
    getRoomsFailed,
    updateRoomStart,
    updateRoomSuccess,
    updateRoomFailed,
    getRoomByIdStart,
    getRoomByIdSuccess,
    getRoomByIdFailed
} from "./ProductSlice";


export const categoriesRequest = async (dispatch) => {
    try {
        dispatch(categoriesStart());
        const response = await fetch(`http://localhost:8080/api/accommodation/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(categoriesSuccess(data));
            return true;
        } else {
            dispatch(categoriesFailed());
            console.error('Error:', response.statusText);
            return false;
        }
    } catch (error) {
        dispatch(categoriesFailed());
        console.error('Error:', error.message);
        return false;
    }
}

export const createProductRequest = async (newForm, dispatch, jwt) => {
    try {
        dispatch(createProductStart());
        console.log(newForm);

        const response = await fetch(`http://localhost:8080/api/accommodation/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify(newForm)
        });

        if (!response.ok) {
            dispatch(createProductFailed(`Failed to create product`));
            return;
        }

        const data = await response.json();
        dispatch(createProductSuccess(data))
        return data;
    } catch (error) {
        dispatch(createProductFailed(`Failed to create product. An error occurred: ${error.message}`));
        return;
    }
};


export const productRequest = async (dispatch, jwt, pageable) => {
    try {
        dispatch(productsStart());
        const response = await fetch(`http://localhost:8080/api/accommodation/get?page=${pageable.number}&search=${pageable.search}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(productsSuccess(data));
            return true;
        } else {
            dispatch(productsFailed());
            console.error('Error:', response.statusText);
            return false;
        }
    } catch (error) {
        dispatch(productsFailed());
        console.error('Error:', error.message);
        return false;
    }
}

export const producPublicRequest = async (dispatch, pageableForm, searchForm) => {
    try {
        dispatch(productsStart());
        const response =
            await fetch(
                `http://localhost:8080/api/accommodation/public/get?page=${pageableForm?.currentPage || 0}&search=${searchForm?.search || ""}&address=${searchForm?.searchAddress || ""}&sortDate=${searchForm?.sortDate}&category=${searchForm.category}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        if (response.ok) {
            const data = await response.json();
            dispatch(productsSuccess(data));
            return true;
        } else {
            dispatch(productsFailed());
            console.error('Error:', response.statusText);
            return false;
        }
    } catch (error) {
        dispatch(productsFailed());
        console.error('Error:', error.message);
        return false;
    }
}

export const getProductByIdRequest = async (productId, dispatch, jwt) => {
    try {
        dispatch(getProductByIdStart());

        const response = await fetch(`http://localhost:8080/api/accommodation/getById?id=${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(getProductByIdSuccess(data));
            return true;
        } else {
            dispatch(getProductByIdFailed('Failed to get product by id.'));
            console.error('Error:', response.statusText);
            return false;
        }
    } catch (error) {
        dispatch(getProductByIdFailed('Failed to get product by id. An error occurred.'));
        console.error('Error:', error.message);
        return false;
    }
};

export const updateProductByIdRequest = async (productId, updatedProductData, dispatch, jwt) => {
    try {
        dispatch(updateProductStart());

        const response = await fetch(`http://localhost:8080/api/accommodation/update?id=${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify(updatedProductData)
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(updateProductSuccess(data));
            return true;
        } else {
            dispatch(updateProductFailed('Failed to update room by id.'));
            console.error('Error:', response.statusText);
            return false;
        }
    } catch (error) {
        dispatch(updateProductFailed('Failed to update room by id. An error occurred.'));
        console.error('Error:', error.message);
        return false;
    }
};



export const roomCreateRequest = async (dispatch, jwt, createForm) => {
    try {
        dispatch(createRoomStart()); // Dispatch action to indicate room creation process started

        console.log(createForm);
        const response = await fetch('http://localhost:8080/api/accommodation/room/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`, // Assuming jwt is used for authorization
            },
            body: JSON.stringify(createForm),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(createRoomSuccess(data)); // Dispatch action for successful room creation
            return true;
        } else {
            dispatch(createRoomFailed()); // Dispatch action for room creation failure
            console.error('Error:', response.statusText);
            return false;
        }
    } catch (error) {
        dispatch(createRoomFailed()); // Dispatch action for room creation failure
        console.error('Error:', error.message);
        return false;
    }
};


export const getRoomsRequest = async (dispatch, jwt, accommodationId, search, pageNumber) => {
    try {
        // Dispatch action để thông báo bắt đầu quá trình lấy phòng
        dispatch(getRoomsStart());

        // Gửi yêu cầu lấy danh sách phòng đến server
        const response = await fetch(`http://localhost:8080/api/accommodation/room/get?accommodationId=${accommodationId}&search=${search}&page=${pageNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        });

        if (response.ok) {
            // Nếu yêu cầu thành công, phân tích dữ liệu phản hồi
            const data = await response.json();
            // Dispatch action để thông báo lấy phòng thành công
            dispatch(getRoomsSuccess(data));
            return true;
        } else {
            // Nếu yêu cầu thất bại, dispatch action để thông báo lấy phòng không thành công
            dispatch(getRoomsFailed());
            console.error('Lỗi:', response.statusText);
            return false;
        }
    } catch (error) {
        // Nếu có lỗi xảy ra trong quá trình xử lý, dispatch action để thông báo lỗi
        dispatch(getRoomsFailed());
        console.error('Lỗi:', error.message);
        return false;
    }
};


export const roomUpdateRequest = async (dispatch, jwt, roomId, roomData) => {
    try {
        // Dispatch action to notify start of room update process
        dispatch(updateRoomStart());

        // Send the room update request to the server
        const response = await fetch(`http://localhost:8080/api/accommodation/room/update?roomId=${roomId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify(roomData) // Convert room data to JSON string
        });

        if (response.ok) {
            // If request is successful, dispatch action to notify room update success
            dispatch(updateRoomSuccess());
            return true;
        } else {
            // If request fails, dispatch action to notify room update failure
            dispatch(updateRoomFailed());
            console.error('Error:', response.statusText);
            return false;
        }
    } catch (error) {
        // If an error occurs during the process, dispatch action to notify room update failure
        dispatch(updateRoomFailed());
        console.error('Error:', error.message);
        return false;
    }
};

export const roomGetByIdRequest = async (dispatch ,jwt, accommodationId, roomId) => { // Remove dispatch from parameters
    try {
        dispatch(getRoomByIdStart());

        const response = await fetch(`http://localhost:8080/api/accommodation/room/getById?accommodationId=${accommodationId}&roomId=${roomId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        });

        if (response.ok) {
            // Parse the JSON response
            const data = await response.json();
            // Dispatch the action to indicate success and pass the room data
            dispatch(getRoomByIdSuccess(data));
            return true;
        } else {
            dispatch(getRoomByIdFailed());
            return false;
        }
    } catch (error) {
        // Dispatch the action to indicate failure and pass the error message
        dispatch(getRoomByIdFailed(error.message));
        return false;
    }
};

export const getPublicRoomsRequest = async (dispatch, accommodationId) => {
    try {
        // Dispatch action để thông báo bắt đầu quá trình lấy phòng
        dispatch(getRoomsStart());

        // Gửi yêu cầu lấy danh sách phòng đến server
        const response = await fetch(`http://localhost:8080/api/accommodation/room/public/getRoomsByAccommodationId?accommodationId=${accommodationId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            // Nếu yêu cầu thành công, phân tích dữ liệu phản hồi
            const data = await response.json();
            // Dispatch action để thông báo lấy phòng thành công
            dispatch(getRoomsSuccess(data));
            return true;
        } else {
            // Nếu yêu cầu thất bại, dispatch action để thông báo lấy phòng không thành công
            dispatch(getRoomsFailed());
            console.error('Lỗi:', response.statusText);
            return false;
        }
    } catch (error) {
        // Nếu có lỗi xảy ra trong quá trình xử lý, dispatch action để thông báo lỗi
        dispatch(getRoomsFailed());
        console.error('Lỗi:', error.message);
        return false;
    }
};

export const getPriceMinMaxRoomsByAccommodationId = async (accommodationId) => {
    try {
        // Dispatch action để thông báo bắt đầu quá trình lấy phòng
        // Gửi yêu cầu lấy danh sách phòng đến server
        const response = await fetch(`http://localhost:8080/api/accommodation/room/public/getPriceMinMaxRoomsByAccommodationId?accommodationId=${accommodationId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            // Nếu yêu cầu thành công, phân tích dữ liệu phản hồi
            const data = await response.json();
            // Dispatch action để thông báo lấy phòng thành công
            return data;
        } else {
            // Nếu yêu cầu thất bại, dispatch action để thông báo lấy phòng không thành công
            console.error('Lỗi:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Lỗi:', error.message);
        return false;
    }
};

export const getProductPublicByIdRequest = async (accommodationId, dispatch) => {
    try {
        dispatch(getProductByIdStart());

        const response = await fetch(`http://localhost:8080/api/accommodation/public/getPublicAccommodationById?accommodationId=${accommodationId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(getProductByIdSuccess(data));
            return true;
        } else {
            dispatch(getProductByIdFailed('Failed to get product by id.'));
            console.error('Error:', response.statusText);
            return false;
        }
    } catch (error) {
        dispatch(getProductByIdFailed('Failed to get product by id. An error occurred.'));
        console.error('Error:', error.message);
        return false;
    }
};
