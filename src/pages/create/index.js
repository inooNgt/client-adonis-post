import React from 'react';
import marked from 'marked';
import highlight from 'highlight.js';
import { connect } from 'react-redux';
import API from 'utils/api';
import Editor from './editor';
import Viewer from './viewer';

import './index.scss';

class CreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
    this.onEditorChange = this.onEditorChange.bind(this);
  }
  componentDidMount() {}
  onEditorChange(data) {
    /**
     *  marked 配置
     */
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
      highlight: function(code) {
        return highlight.highlightAuto(code).value;
      }
    });

    let content = marked(data);
    this.setState({
      content
    });

    console.log(content);
  }
  render() {
    let { content } = this.state;
    return (
      <div className='create-container'>
        <Editor change={this.onEditorChange} />
        <Viewer content={content} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    logined: state.logined
  };
};

export default connect(mapStateToProps)(CreatePage);
