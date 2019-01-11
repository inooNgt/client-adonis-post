import React from 'react';
import marked from 'marked';
import highlight from 'highlight.js';
import { connect } from 'react-redux';
import API from 'utils/api';
import Editor from './editor';
import Viewer from './viewer';
import Panel from './panel/panel';

import './index.scss';

class CreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      mdContent: ''
    };
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onPostSubmit = this.onPostSubmit.bind(this);
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
      content,
      mdContent: data
    });
  }
  onPostSubmit({ title }) {
    let { content, mdContent } = this.state;

    if (!title || !content || !mdContent) {
      console.log('缺少参数!');
      return;
    }

    let params = {
      post_title: title,
      post_body: content,
      post_body_md: mdContent
    };
    API.create(params)
      .then(res => {
        if (res.status == 200) {
          console.log('发布成功');
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    let { content } = this.state;
    return (
      <div className='create-container'>
        <Panel onSubmit={this.onPostSubmit} />
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
