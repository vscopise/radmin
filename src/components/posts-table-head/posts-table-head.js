import React from 'react';
import classes from './posts-table-head.module.css';

const postsTableHead = (props) => (
    <div className={classes.table100head}>
        <table>
            <thead>
                <tr className={[classes.row100, classes.head].join(' ')}>
                    <th className={[classes.cell100, classes.column1].join(' ')}>
                        <input type='checkbox' />
                    </th>
                    {
                        props.postsTableHeadFields.map(field => (
                            <th key={field.id}>{field.name}</th>
                        ))
                    }
                </tr>
            </thead>
        </table>
    </div>
);

export default postsTableHead;
