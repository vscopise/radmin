import React from 'react';
import classes from './posts-table.module.css';
import PostsTableHead from '../posts-table-head/posts-table-head';
import PostsTableContent from '../posts-table-content/posts-table-content';
import PostTableControls from '../posts-table-controls/posts-table-controls';

const PostTable = (props) => (
    <div className={classes.limiter}>
        <div className={classes.containerTable100}>
            <div className={classes.wrapTable100}>
                <PostTableControls 
                    categories={props.categories}
                    categorySelected={props.categorySelected}
                    dateAfter={props.dateAfter}
                    dateBefore={props.dateBefore}
                    fetchPosts={props.fetchPosts}
                    handleChange={props.handleChange}
                    handleDateBeforeChange={props.handleDateBeforeChange}
                    handleDateAfterChange={props.handleDateAfterChange}
                    handleFilterClear={props.handleFilterClear}
                    handleTrashPosts={props.handleTrashPosts}
                    months={props.months}
                    newPost={props.newPost}
                    selectedPosts={props.selectedPosts}
                    tags={props.tags}
                    tagSelected={props.tagSelected}
                    zonesEdit={props.zonesEdit}
                />
                <div className={[classes.table100, classes.ver1, classes.mb110].join(' ')}>
                    <PostsTableHead
                        postsTableHeadFields = {props.postsTableHeadFields}
                    />
                    {
                        props.posts && props.users &&
                        <PostsTableContent
                            categories={props.categories}
                            categorySelected={props.categorySelected}
                            fetchTerm={props.fetchTerm}
                            fetchPostCats={props.fetchPostCats}
                            //fetchPostTags={props.fetchPostTags}
                            handleSelect={props.handleSelect}
                            handleSelectPost={props.handleSelectPost}
                            posts={props.posts}
                            replaceAll={props.replaceAll}
                            //tags={props.tags}
                            tagSelected={props.tagSelected}
                            selectedPosts={props.selectedPosts}
                            users={props.users}
                        />
                    }
                </div>
            </div>
        </div>
    </div>
);

export default  PostTable;