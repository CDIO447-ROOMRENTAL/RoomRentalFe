import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: {
            data: [],
            isFetching: false,
            isSuccess: null,
            error: null,
        },
        categories: {
            data: [],
            isFetching: false,
            isSuccess: null,
            error: null,
        },
        // Thêm initialState mới cho thông tin sản phẩm theo id
        productById: {
            data: null,
            isFetching: false,
            isSuccess: null,
            error: null,
        }
    },
    reducers: {
        productsStart: (state) => {
            state.products = {
                ...state.products,
                data: [],
                isFetching: true,
                isSuccess: null,
                error: null,
            };
        },
        productsSuccess: (state, action) => {
            state.products = {
                ...state.products,
                data: action.payload,
                isFetching: false,
                isSuccess: true,
                error: null,
            };
        },
        productsFailed: (state, action) => {
            state.products = {
                ...state.products,
                data: [],
                isFetching: false,
                isSuccess: false,
                error: action.payload,
            };
        },
        categoriesStart: (state) => {
            state.categories = {
                ...state.categories,
                data: null,
                isFetching: true,
                isSuccess: null,
                error: null,
            };
        },
        categoriesSuccess: (state, action) => {
            state.categories = {
                ...state.categories,
                data: action.payload,
                isFetching: false,
                isSuccess: true,
                error: null,
            };
        },
        categoriesFailed: (state, action) => {
            state.categories = {
                ...state.categories,
                data: null,
                isFetching: false,
                isSuccess: false,
                error: action.payload,
            };
        },
        createProductStart: (state) => {
            state.products = {
                ...state.products,
                isFetching: true,
                isSuccess: null,
                error: null,
            };
        },
        createProductSuccess: (state) => {
            state.products = {
                ...state.products,
                isFetching: false,
                isSuccess: true,
                error: null,
            };
        },
        createProductFailed: (state, action) => {
            state.products = {
                ...state.products,
                isFetching: false,
                isSuccess: false,
                error: action.payload,
            };
        },
        createProduct: (state, action) => {
            const newProduct = action.payload; // Assuming payload is an object representing the new product
            return {
                ...state,
                products: {
                    ...state.products,
                    data: [...state.products.data, newProduct]
                }
            };
        },


        updateProductStart: (state) => {
            state.products = {
                ...state.products,
                isFetching: true,
                isSuccess: null,
                error: null,
            };
        },
        updateProductSuccess: (state) => {
            state.products = {
                ...state.products,
                isFetching: false,
                isSuccess: true,
                error: null,
            };
        },
        updateProductFailed: (state, action) => {
            state.products = {
                ...state.products,
                isFetching: false,
                isSuccess: false,
                error: action.payload,
            };
        },
        // Thêm reducers mới cho việc lấy thông tin sản phẩm theo id
        getProductByIdStart: (state) => {
            state.productById = {
                ...state.productById,
                data: null,
                isFetching: true,
                isSuccess: null,
                error: null,
            };
        },
        getProductByIdSuccess: (state, action) => {
            state.productById = {
                ...state.productById,
                data: action.payload,
                isFetching: false,
                isSuccess: true,
                error: null,
            };
        },
        getProductByIdFailed: (state, action) => {
            state.productById = {
                ...state.productById,
                data: null,
                isFetching: false,
                isSuccess: false,
                error: action.payload,
            };
        },


        createRoomStart: (state) => {
            state.productById.createRoom = {
                ...state.productById.createRoom,
                isFetching: true,
                isSuccess: null,
                error: null,
            };
        },
        createRoomSuccess: (state) => {
            state.productById.createRoom = {
                ...state.productById.createRoom,
                isFetching: false,
                isSuccess: true,
                error: null,
            };
        },
        createRoomFailed: (state, action) => {
            state.productById.createRoom = {
                ...state.productById.createRoom,
                isFetching: false,
                isSuccess: false,
                error: action.payload,
            };
        },

        getRoomsStart: (state) => {
            state.productById = {
                ...state.productById,
                rooms: {
                    data: [],
                    isFetching: true,
                    isSuccess: null,
                    error: null,
                }
            };
        },
        getRoomsSuccess: (state, action) => {
            state.productById = {
                ...state.productById,
                rooms: {
                    data: action.payload,
                    isFetching: false,
                    isSuccess: true,
                    error: null,
                }
            };
        },
        getRoomsFailed: (state, action) => {
            state.productById = {
                ...state.productById,
                rooms: {
                    data: [],
                    isFetching: false,
                    isSuccess: false,
                    error: action.payload,
                }
            };
        },

        // Action to indicate the start of the room update process
        updateRoomStart: (state) => {
            state.productById.updateRoom = {
                isFetching: true,
                isSuccess: null,
                error: null,
            };
        },
        updateRoomSuccess: (state) => {
            state.productById.updateRoom = {
                isFetching: false,
                isSuccess: true,
                error: null,
            };
        },
        updateRoomFailed: (state, action) => {
            state.productById.updateRoom = {
                isFetching: false,
                isSuccess: false,
                error: action.payload,
            };
        },

        getRoomByIdStart: (state) => {
            state.productById.rooms.getRoomById = {
                data: null,
                isFetching: true,
                isSuccess: null,
                error: null,
            };
        },

        // Action for successful room fetch by ID
        getRoomByIdSuccess: (state, action) => {
            state.productById.rooms.getRoomById = {
                data: action.payload,
                isFetching: false,
                isSuccess: true,
                error: null,
            };
        },

        // Action for failed room fetch by ID
        getRoomByIdFailed: (state, action) => {
            state.productById.rooms.getRoomById = {
                data: null,
                isFetching: false,
                isSuccess: false,
                error: action.payload,
            };
        },

    }
});

export const {
    categoriesStart,
    categoriesFailed,
    categoriesSuccess,

    createProductStart,
    createProductFailed,
    createProductSuccess,
    createProduct,

    productsStart,
    productsSuccess,
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
    getRoomByIdFailed,

} = productSlice.actions;
export default productSlice.reducer;
