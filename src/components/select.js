import React from 'react';

const Select = (props) => {
    return (
        <select id="selectBreed" className="form-control" onChange={props.changed}>
            <option>Select breed</option>
            {
                props.data.map(x=>{
                    return <option key={x.id} value={x.id}>{x.name}</option>
                })
            }

        </select>
    )
}

export default Select;
