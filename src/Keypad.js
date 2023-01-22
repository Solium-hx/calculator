import React from 'react'
import Key from './Key'

const Keypad = ({ changeExpression }) => {

    const handleClick = ({type , value}) => {
      changeExpression({type: type, payload: {value: value}})
    }

    return (
    <div className='keypad'>
      <Key className={'keys'} value={1} onClick={() => {handleClick({type: 'add-digit', value: '1'})}} />
      <Key className={'keys'} value={2} onClick={() => {handleClick({type: 'add-digit', value: '2'})}} />
      <Key className={'keys'} value={3} onClick={() => {handleClick({type: 'add-digit', value: '3'})}} />
      <Key className={'span-2'} value={'Clear'} onClick={() => {handleClick({type: 'clear', value: 'AC'})}} />
      <Key className={'keys'} value={4} onClick={() => {handleClick({type: 'add-digit', value: '4'})}} />
      <Key className={'keys'} value={5} onClick={() => {handleClick({type: 'add-digit', value: '5'})}} />
      <Key className={'keys'} value={6} onClick={() => {handleClick({type: 'add-digit', value: '6'})}} />
      <Key className={'span-2'} value={'←'} onClick={() => {handleClick({type: 'remove', value: '←'})}} />
      <Key className={'keys'} value={7} onClick={() => {handleClick({type: 'add-digit', value: '7'})}} />
      <Key className={'keys'} value={8} onClick={() => {handleClick({type: 'add-digit', value: '8'})}} />
      <Key className={'keys'} value={9} onClick={() => {handleClick({type: 'add-digit', value: '9'})}} />
      <Key className={'keys'} value={'/'} onClick={() => {handleClick({type: 'add-operation', value: '/'})}} />
      <Key className={'keys'} value={'*'} onClick={() => {handleClick({type: 'add-operation', value: '*'})}} />
      <Key className={'keys'} value={'^'} onClick={() => {handleClick({type: 'add-operation', value: '^'})}} />
      <Key className={'keys'} value={0} onClick={() => {handleClick({type: 'add-digit', value: '0'})}} />
      <Key className={'keys'} value={'.'} onClick={() => {handleClick({type: 'add-digit', value: '.'})}} />
      <Key className={'keys'} value={'+'} onClick={() => {handleClick({type: 'add-operation', value: '+'})}} />
      <Key className={'keys'} value={'-'} onClick={() => {handleClick({type: 'add-operation', value: '-'})}} />
      <Key className={'span-5'} value={'='} onClick={() => {handleClick({type: 'evaluate', value: '='})}} />
    </div>
  )
}

export default Keypad
