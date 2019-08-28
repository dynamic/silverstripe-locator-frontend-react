import React from 'react';

const AutoComplete = (TextField) => (props) => {
    return (
        <div>
            <TextField {...props} />
            <small>XXXX</small>
        </div>
    );
}

export default AutoComplete;