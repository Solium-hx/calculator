import React from 'react'

const Display = ({terms}) => {
    if(terms.length === 0) {
        return (
            <h1 className='display'>
                0
            </h1>
        )
    }
    return (
        <h1 className='display'>
            {terms.map(e => { return e })}
        </h1>
    )
}

export default Display
