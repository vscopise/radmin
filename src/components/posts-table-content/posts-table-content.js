import React from 'react';
import classes from './posts-table-content.module.css';
import * as Constants from '../../assets/constants';
import PostsTableContentRow from '../posts-table-content-row/posts-table-content-row';

const postsTableContent = (props) => {
    let posts = props.posts;
    if ( props.categorySelected !== '0' || props.tagSelected !== '0' ) {
        if ( props.categorySelected !== '0' ) {
            posts = posts.filter(p => p.categories.includes(parseInt(props.categorySelected)));
        }
        if ( props.tagSelected !== '0' ) {
            posts = posts.filter(p => p.tags.includes(parseInt(props.tagSelected)));
        }
    }
    return (
        <div className={[classes.table100body, classes.jsPscroll, classes.ps, classes.psActiveY].join(' ')}>
            <table>
                <tbody>
                    {
                        posts.map(post => (
                            <PostsTableContentRow 
                                categories={props.categories}
                                //fetchPostCats={props.fetchPostCats}
                                //fetchPostTags={props.fetchPostTags}
                                handleSelect={props.handleSelect}
                                handleSelectPost={props.handleSelectPost}
                                key={post.id}
                                link={post.link}
                                postAuthor={post.author}
                                //postCategories={props.fetchPostCats(post.categories)}
                                postCategories={post.categories}
                                //categories={props.fetchCat(post.categories)}
                                postDate={post.date}
                                postId={post.id}
                                postTags={post.tags}
                                selectedPosts={props.selectedPosts}
                                status={post.status}
                                //tags={props.tags}
                                title={props.replaceAll(post.title.rendered, Constants.stringReplacement)}
                                users={props.users}
                                post={post}
                            />        
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
};

export default postsTableContent;