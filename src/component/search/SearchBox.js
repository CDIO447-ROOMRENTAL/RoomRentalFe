import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './SearchBox.css';
import { categoriesRequest } from '../../store/redux/product/ProductRequest';

function SearchBox({ onSearch }) {
    const [searchForm, setSearchForm] = useState({
        search: '',
        searchAddress: '',
        category: '',
        price: '',
        sortPrice: '',
        sortDate: ''
    });
    const dispatch = useDispatch();
    const categories = useSelector((state) => state?.products?.categories?.data);

    useEffect(() => {
        categoriesRequestMethod();
    }, [dispatch]);

    const categoriesRequestMethod = async () => {
        categoriesRequest(dispatch)
    };

    const handleSubmit = () => {
        onSearch(searchForm);
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className='search-container'>
            <div className='search-box-container'>
                <div className='search-box'>
                    <input
                        type="text"
                        id="search"
                        name='search'
                        className='search'
                        placeholder="Enter search..."
                        value={searchForm.search}
                        onChange={handleSearchChange}
                    />
                    <input
                        type="text"
                        id="searchAddress"
                        name='searchAddress'
                        placeholder="Enter address..."
                        value={searchForm.searchAddress}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className='filter-container' >
                    <select name='category' value={searchForm.category} onChange={handleSearchChange}>
                        <option value="">--Categories--</option>
                        {categories && categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    <select name='price' value={searchForm.price} onChange={handleSearchChange}>
                        <option value="">Price</option>
                        <option value="1tr">1tr</option>
                        <option value="2tr">2tr</option>
                    </select>
                    <select name='sortPrice' value={searchForm.sortPrice} onChange={handleSearchChange}>
                        <option value="">Sort price</option>
                        <option value="ASC">ASC</option>
                        <option value="DESC">DESC</option>
                    </select>
                    <select name='sortDate' value={searchForm.sortDate} onChange={handleSearchChange}>
                        <option value="">Sort date</option>
                        <option value="ASC">ASC</option>
                        <option value="DESC">DESC</option>
                    </select>
                </div>
            </div>
            <div className='button-container'>
                <button type="button" onClick={handleSubmit}>Search</button>
            </div>
        </div>
    );
}

export default SearchBox;
