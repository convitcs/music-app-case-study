import React, { useCallback } from 'react';
import { searchIconGrey } from '../../../../assets';
import './style.css'

const SearchInput = ({searchParams, setSearchParams}) => {

    const handleChange = useCallback(event => {
        let filter = event.target.value
        if (filter) {
            setSearchParams({filter})
        }else{
            setSearchParams({})
        }
       }, [setSearchParams])
    return (
        <div className='searchInput flex '>
            <input className='input' type="text" placeholder='Find music' value={searchParams}
                   onChange = {handleChange}
            />
            <img src={searchIconGrey} alt="" />
        </div>
    );
};

export default SearchInput;