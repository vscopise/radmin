import React from 'react';
import CheckBox from '../checkbox/checkbox';
import classes from './select-term.module.css';

const selectTerm = (props) => {
    return(
        <div className={classes.selectTerm}>
            <input 
                type='search' 
                name={props.name} 
                value={props.searchTerm}
                onChange={props.handleChange} 
                className={classes.selectTerm}
                placeholder={props.label}
            />
            <div className={classes.listTerms}>
                {props.terms
                    .filter(term => term.name=== '' || term.name.includes(props.searchTerm))
                    .map(term => (
                        <CheckBox 
                            key={term.id}
                            id={term.id}
                            label={term.name}
                            name={props.selectTerms}
                            value={props.postTerms.includes(term.id)}
                            handleSelect={props.handleSelect}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default selectTerm;