import './App.css';
import { useReducer } from 'react';
import Display from './components/Display';
import Keypad from './components/Keypad';

const OPERATIONS = ['+', '-', '*', '/', '^'];
const mp = new Map([['+', 0], ['-', 0], ['*', 1], ['/', 1], ['^', 2], ['(', -1]]);

const reducer = (terms, action) => {
  var currentTerm;
  switch (action.type) {
    case 'add-digit' :
      if (terms.length === 0){
        return [...terms, action.payload.value];
      }
      currentTerm = terms[terms.length - 1];
      if(currentTerm === '0') {
          return terms.map((v, i) => i === terms.length - 1 ? v = action.payload.value : v)
      }
      if(action.payload.value === '.' && currentTerm.includes(".")){
        return terms;
      }
      if(currentTerm === ')'){
        return terms;
      }
      if (OPERATIONS.includes(currentTerm) || currentTerm === '(') {
        return [...terms, action.payload.value];
      }

      return terms.map((v, i) => i === terms.length - 1 ? v += action.payload.value : v)

    case 'add-operation':
      if (terms.length === 0){
        return terms;
      }
      currentTerm = terms[terms.length - 1];
      if (OPERATIONS.includes(currentTerm)) {
        return terms.map((v, i) => i === terms.length - 1 ? v = action.payload.value : v)
      }
      return [...terms, action.payload.value];

    case 'add-paranthesis':
      if(action.payload.value === ')') {
        if(terms.length === 0) {
          return terms;
        }
        currentTerm = terms[terms.length - 1];
        if(currentTerm === '(') {
          return terms;
        }
      }
      if(action.payload.value === '(') {
        if(terms.length === 0) {
          return [...terms, action.payload.value];
        }
        currentTerm = terms[terms.length - 1];
        if(!OPERATIONS.includes(currentTerm)) {
          return terms;
        }
      }
      return [...terms, action.payload.value];

    case 'remove' :
      if (terms.length === 0){
        return terms;
      }
      currentTerm = terms[terms.length - 1];
      if (OPERATIONS.includes(currentTerm)) {
        return terms.filter((v, i) => i !== terms.length - 1)
      }
      if( currentTerm.length === 1) {
        return terms.filter((v, i) => i !== terms.length - 1)
      }
      return terms.map((v, i) => i === terms.length - 1 ? v = v.slice(0, -1) : v)

    case 'clear' :
      return []

    case 'evaluate' :
      let result = calculateResult(terms);
      return [result];
      
    default :
      return terms
  }
}

const operaterOn = (a, b, t) => {
  switch (t) {
    case '+':
      return a+b;
    case '-':
      return a-b;
    case '*':
      return a*b;
    case '/':
      return a/b;
    case '^':
      return a**b
    default:
      return a;
  }
}
  
const calculateResult = (terms) => {
  
  var exp = [];
  for(let i = 0; i<terms.length; i++) {
    if(OPERATIONS.includes(terms[i]) || terms[i] === '(' || terms[i] === ')') {
      exp.push(terms[i]);
    }
    else{
      exp.push(parseFloat(terms[i]));
    }
  }
  
  var postfix = [];
  var ops = [];
  
  for(let i = 0; i<exp.length; i++) {
    let t = exp[i];
    if (OPERATIONS.includes(t)) {
      while(ops.length > 0 && mp.get(t) <= mp.get(ops[ops.length-1])) {
        postfix.push(ops[ops.length-1]);
        ops.pop();
      }
      ops.push(t);
    }
    else if(t === '(') {
      ops.push(t);
    }
    else if (t === ')') {
      while (ops[ops.length-1] !== '(') {
        postfix.push(ops[ops.length-1]);
        ops.pop();
      }
      ops.pop();
    }
    else {
      postfix.push(t);
    }
  }
  
  while (ops.length > 0) {
    postfix.push(ops[ops.length-1]);
    ops.pop();
  }
  
  for (let i = 0; i<postfix.length; i++) {
    let t = postfix[i];
    if (!OPERATIONS.includes(t)) {
      ops.push(t);
    }
    else {
      let b = ops[ops.length-1];
      ops.pop();
      let a = ops[ops.length-1];
      ops.pop();
      let r = operaterOn(a, b, t);
      ops.push(r);
    }
  }

  return ops[0].toString();
}

const App = () => {

  
  const [terms, dispatch] = useReducer(reducer, []);

  const changeExpression = (props) => {
    dispatch(props)
  }

  return (
    <div className='app'>
      <h1>Calculator App</h1>
      <Display terms={terms}/>
      <Keypad changeExpression={changeExpression}/>
    </div>
  )
}

export default App;
