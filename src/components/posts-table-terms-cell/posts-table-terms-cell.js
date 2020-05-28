import React, { Component } from 'react';
import * as Constants from '../../assets/constants';
import classes from './posts-table-terms-cell.module.css';

const PostsTableTermCell = (props) => (
    <td>
        {
            props.terms.length > 0 &&
            props.terms.map(term => (
                <span
                    className={classes.Term}
                    key={term.id}
                >{term.name}</span>
            ))
        }
    </td>
)

class PostsTableTermsCell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            terms: []
        };

        this.props.terms.map(term => {
            let url = `${Constants.apiUrl}wp/v2/${this.props.taxonomy}/${term}`;
            fetch(url)
            .then(res => res.json())
            .then((term) => { 
                this.setState(prevState => ({terms: [...prevState.terms, term]}))
            })
        })
    }

    render() {
        return(
            <PostsTableTermCell terms={this.state.terms} />
        )
    }
}

export default PostsTableTermsCell;


