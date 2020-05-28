import React from 'react';
import classes from './posts-table-content-row.module.css';
import PostsTableTitleCell from '../posts-table-title-cell/posts-table-title-cell';
import Checkbox from '../checkbox/checkbox';
import PostsTableTermsCell from '../posts-table-terms-cell/posts-table-terms-cell';

const postsTableContentRow = (props) => {
    let futureClass = props.status==='future' ? classes.future: '';
    return (
    <tr key={props.postId} className={futureClass}>
        <td>
            <div className={classes.listTerms}>
                <Checkbox 
                    key={props.postId}
                    id={props.postId}
                    name='selectedPosts'
                    value={props.selectedPosts.includes(props.postId)}
                    handleSelect={props.handleSelect}
                    label={','}
                />
            </div>
        </td>
        <PostsTableTitleCell 
            title={props.title}
            postId={props.postId}
            handleSelectPost={props.handleSelectPost}
        />
        <td>
            {props.users.find(
                user=>user.id===props.postAuthor
            ).name}
        </td>
        <PostsTableTermsCell 
            terms={props.postCategories}
            //postTerms={props.postCategories}
            taxonomy='categories'
        />
        <PostsTableTermsCell 
            terms={props.postTags}
            taxonomy='tags'
            //postTerms={props.postTags}
        />
        <td>
            {
                new Date(props.postDate).toLocaleString(
                    'es-ES',
                    { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    }
                )
            }
        </td>
        <td>
            <a href={props.link} target='_blank' rel='noopener noreferrer'>Ver</a>
        </td>
    </tr>
)};

export default postsTableContentRow;