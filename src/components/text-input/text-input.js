import React, { Component } from 'react';
import classes from './text-input.module.css';

const DEFAULT_HEIGHT = 25;

class TextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: DEFAULT_HEIGHT,
            value: this.props.value
        }
    }

    componentDidMount() {
        this.mounted = true;
    
        this.setFilledTextareaHeight();
    }

    setFilledTextareaHeight = () => {
        if (this.mounted) {
          const element = this.ghost;
    
          this.setState({
            height: element.clientHeight,
          });
        }
    }
    
    setValue = (event) => {
        const { value } = event.target;
    
        this.setState({ value });
        this.props.onChange(event);
    }

    getExpandableField = () => {
      const isOneLine = this.state.height <= DEFAULT_HEIGHT;
      const { height } = this.state;

      const fontSize = this.props.name==='postTitle' ? classes.title : null;
      
    
      return (
        <div>
          <textarea
            className={[
              classes.textarea, 
              fontSize,
            ].join(' ')}
            name={this.props.name}
            autoFocus={true}
            value={this.props.value}
            style={{
              height,
              resize: isOneLine ? "none" : null
            }}
            onChange={this.setValue}
            onKeyUp={this.setFilledTextareaHeight}
            placeholder={this.props.label}
          />
        </div>
      );
    }
    
    getGhostField = () => {
      const fontSize = this.props.name==='postTitle' ? classes.title : null;
    
      return (
        <div
          className={[
            classes.textarea, 
            classes.textareaGhost,
            fontSize
          ].join(' ')}
          ref={(c) => this.ghost = c}
          aria-hidden="true"
        >{this.state.value}</div>
      );
    }

    render() {
      const small = this.props.className==='small' ? classes.small : null;
      return(
        <div className={[small, classes.TextInput].join(' ')}>
            {this.getExpandableField()}
            {this.getGhostField()}
        </div>
      )
    }
}

export default TextInput;