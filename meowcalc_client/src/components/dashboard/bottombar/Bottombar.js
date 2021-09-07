import React, { useState, useEffect } from 'react';

import Axios from 'axios';

import './bottombar.scss';

export default function Bottombar() {
    // Current session user
    const [userTable, setUserTable] = useState('');

    // Current ans
    const [ans, setAns] = useState('');

    // Calculator input value
    const [prevCalculatorInput, setPrevCalculatorInput] = useState('');
    const [calculatorInput, setCalculatorInput] = useState('');

    // Current operand
    const [currentOperand, setCurrentOperand] = useState('');

    function numberPad(e) { 
        setCalculatorInput(prevInput => { 
            return prevInput + e.target.innerHTML.toString();
        })
    }

    function operatorPad(e) { 
        setPrevCalculatorInput(() => { 
                if (calculatorInput.length > 0) { 
                    setCurrentOperand(e.target.innerHTML.toString().trim());
                    clr();
                    return calculatorInput + e.target.innerHTML.toString();
                }
                else { 
                    console.log('ALREADY EMPTY'); // TEST
                }            
            });
    }

    function decimal() { 
        setCalculatorInput(prevInput => { 
            return (prevInput.indexOf('.') === -1 ? prevInput + '.' : prevInput);
        });
    }

    function del() { 
        if (calculatorInput.length > 0) { 
            setCalculatorInput(prevInput => { 
                return prevInput.substring(0, prevInput.length - 1); 
            });
        }
    }

    function clr() { 
        setCalculatorInput('');
    }

    function equals() { 
        const firstValue = parseFloat(prevCalculatorInput.split()[0].trim());
        const secondValue = parseFloat(calculatorInput.trim());

        setCalculatorInput(() => {
            // TO DO: SEND AN AXIOS POST TO PLACE IN THE HISTORY OF THE USER 
            Axios.post('http://localhost:3001/history-add-calculation', { 
                userTable: userTable,
                calculation: `${ firstValue } ${ currentOperand } ${ secondValue }`,
                currentOperand: currentOperand,
                calculationDate: new Date().toISOString()
            });

            setPrevCalculatorInput('');

            let result = '';
            switch(currentOperand) { 
                case '+':
                    result = (firstValue + secondValue).toString();
                    break;
                case '-':
                    result = (firstValue - secondValue).toString();
                    break;
                case '/':
                    result = (firstValue / secondValue).toString();
                    break;
                case '*':
                    result = (firstValue * secondValue).toString();
                    break;
            }

            if (result.indexOf('.') !== -1 ) { 
                return result.split('.')[1].trim().length > 3 ? (Math.round(parseFloat(result)  * 1000)).toString() / 1000 : result;
            }
            else { 
                return result;
            }
        });
    }

    // UTILITY
    useEffect(() => { 
        getCurrentSessionUser();

        async function getCurrentSessionUser() { 
            await Axios.get('http://localhost:3001/login-check-credentials').then((result) => {
                if (result.data.loggedIn) { 
                    Axios.post('http://localhost:3001/get-user-table', { 
                        id: result.data.user[0].id
                    }).then((result) => { 
                        setUserTable(result.data.userTable[0].historyDest); 
                    });
                }
            });
        }
    });

    return (
        <div className='bottombar-container__calculator-background'>
            <div className='calculator-background__calculator-container'>
                <div className='calculator-container__output-container'>
                    <div className='output-container__prev-operation-container'> { prevCalculatorInput } </div>
                    <div className='output-container__current-operation-container'> { calculatorInput } </div>
                </div>
                <div className='calculator-container__divider'></div>
                <div className='calculator-container__pads-container'>
                    <div className='pads-container__special-operators-container'>
                        <button onClick={ operatorPad } className='special-operators-container__pi'> &#960; </button>
                        <button onClick={ operatorPad } className='special-operators-container__x!'> x! </button>
                        <button onClick={ operatorPad } className='special-operators-container__sin()' id='withParams'> sin </button>
                        <button onClick={ operatorPad } className='special-operators-container__In()' id='withParams'> In </button>
                        <button onClick={ operatorPad } className='special-operators-container__cos()' id='withParams'> cos </button>
                        <button onClick={ operatorPad } className='special-operators-container__log()' id='withParams'> log </button>
                        <button onClick={ operatorPad } className='special-operators-container__tan()' id='withParams'> tan </button>
                        <button onClick={ operatorPad } className='special-operators-container__sqrt()' id='withParams'> &#8730; </button>
                        <button onClick={ operatorPad } className='special-operators-container__ans'> &#x25; </button>
                        <button onClick={ operatorPad } className='special-operators-container__x^y' id='withParams'> x<sup>y</sup> </button>
                    </div>
                    <div className='pads-container__divider'></div>
                    <div className='pads-container__default-operators-container'>
                        <button onClick={ operatorPad } className='default-operators-container__parenthesis-right'> &#40; </button>
                        <button onClick={ operatorPad } className='default-operators-container__parenthesis-left'> &#41; </button>
                        <button onClick={ del } className='default-operators-container__del'>CE</button>
                        <button onClick={ clr } className='default-operators-container__clr'>C</button>
                        <button onClick={ numberPad } className='default-operators-container__7'>7</button>
                        <button onClick={ numberPad } className='default-operators-container__8'>8</button>
                        <button onClick={ numberPad } className='default-operators-container__9'>9</button>
                        <button onClick={ operatorPad } className='default-operators-container__divide'> /</button>
                        <button onClick={ numberPad } className='default-operators-container__4'>4</button>
                        <button onClick={ numberPad } className='default-operators-container__5'>5</button>
                        <button onClick={ numberPad } className='default-operators-container__6'>6</button>
                        <button onClick={ operatorPad } className='default-operators-container__multiply'> *</button>
                        <button onClick={ numberPad } className='default-operators-container__1'>1</button>
                        <button onClick={ numberPad } className='default-operators-container__2'>2</button>
                        <button onClick={ numberPad } className='default-operators-container__3'>3</button>
                        <button onClick={ operatorPad } className='default-operators-container__sub'> -</button>
                        <button onClick={ numberPad } className='default-operators-container__0'>0</button>
                        <button onClick={ decimal } className='default-operators-container__decimal'>.</button>
                        <button onClick={ equals } className='default-operators-container__equal'>=</button>
                        <button onClick={ operatorPad } className='default-operators-container__addition'> +</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
