import React, { useState, useEffect } from 'react';
import { Input } from 'semantic-ui-react'

const Autocomplete = (props) => {

    // utilize useState() to get the input of the search bar to search
    // Curiositans.
    const [searchInput, setSearchInput] = useState({input: "",})
    const handleFieldChange = (evt) => {
        const stateToChange = {...searchInput}
        stateToChange.input = evt.target.value;
        setSearchInput(stateToChange);
    }
    return(
        <>
            <Input type="text" icon="users" iconPosition="left" placeholder="Search Curiositans..." onChange={handleFieldChange} />
        </>
    )
}

export default Autocomplete;