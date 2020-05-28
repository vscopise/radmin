import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import PostZone from '../post-zone/post-zone';
import update from 'immutability-helper'

class ZoneContainer extends Component {
    state = {
        posts: this.props.postsZone
    }

    componentWillReceiveProps(newProps) {
        const oldProps = this.props
        if(oldProps.postsZone !== newProps.postsZone) {
          this.setState({ posts: newProps.postsZone })
        }
    }
    
    movePost = (dragIndex, hoverIndex) => {
        const { posts } = this.state;
        const dragPost = posts[dragIndex];
    
        this.setState(
            update(this.state, { posts: {
                $splice: [[dragIndex, 1], [hoverIndex, 0, dragPost]],
            }})
        );
        this.props.handleUpdateZonePosts( this.state.posts );
    }

    delPost = (event) => {
        let oldPostsZone = this.state.posts;
        let posts = oldPostsZone.filter(post => post.ID !== parseInt(event.target.id));
        this.setState({ posts });
        this.props.handleUpdateZonePosts( posts );
    }

    render() {
        return(
            <DndProvider backend={HTML5Backend}>
                <div className="ZoneContainer">
                    { this.state.posts.map((post, i) => (
                        <PostZone 
                            delPost={this.delPost}
                            index={i}
                            id={post.ID}
                            key={post.ID}
                            movePost={this.movePost}
                            postStatus={post.post_status}
                            title={this.props.replaceAll(post.post_title)}
                        />
                    )) }
                </div>
            </DndProvider>
        )
    }
}

export default ZoneContainer;