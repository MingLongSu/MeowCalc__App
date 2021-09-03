import React from 'react';

import './bottombar.scss';

export default function Bottombar() {
    return (
        <div className='bottombar-container__calculator-background'>
            <div className='calculator-background__calculator-container'>
                <div className='calculator-container__output-container'>
                    <div className='output-container__prev-operation-container'>
                        <span className='prev-operation-container__text'> {  } </span>
                    </div>
                    <input type='input' className='output-container__current-operation-container'></input>
                </div>
                <div className='calculator-container__divider'></div>
                <div className='calculator-container__pads-container'>
                    <div className='pads-container__special-operators-container'>
                        <button className='special-operators-container__pi'> &#960; </button>
                        <button className='special-operators-container__x!'> x! </button>
                        <button className='special-operators-container__sin()'> sin </button>
                        <button className='special-operators-container__In'> In </button>
                        <button className='special-operators-container__cos()'> cos </button>
                        <button className='special-operators-container__log()'> log </button>
                        <button className='special-operators-container__tan()'> tan </button>
                        <button className='special-operators-container__sqrt()'> &#8730; </button>
                        <button className='special-operators-container__ans'> &#x25; </button>
                        <button className='special-operators-container__x^y'> x<sup>y</sup> </button>
                    </div>
                    <div className='pads-container__divider'></div>
                    <div className='pads-container__default-operators-container'>
                        <button className='default-operators-container__'> &#40; </button>
                        <button className='default-operators-container__'> &#41; </button>
                        <button className='default-operators-container__'> CE </button>
                        <button className='default-operators-container__'> C </button>
                        <button className='default-operators-container__'> 7 </button>
                        <button className='default-operators-container__'> 8 </button>
                        <button className='default-operators-container__'> 9 </button>
                        <button className='default-operators-container__'> / </button>
                        <button className='default-operators-container__'> 4 </button>
                        <button className='default-operators-container__'> 5 </button>
                        <button className='default-operators-container__'> 6 </button>
                        <button className='default-operators-container__'> * </button>
                        <button className='default-operators-container__'> 1 </button>
                        <button className='default-operators-container__'> 2 </button>
                        <button className='default-operators-container__'> 3 </button>
                        <button className='default-operators-container__'> - </button>
                        <button className='default-operators-container__'> 0 </button>
                        <button className='default-operators-container__'> . </button>
                        <button className='default-operators-container__'> = </button>
                        <button className='default-operators-container__'> + </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
