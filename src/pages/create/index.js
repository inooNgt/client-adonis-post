import React from 'react';
import marked from 'marked';
import highlight from 'highlight.js';
import { connect } from 'react-redux';
import Qs from 'qs';
import API from 'utils/api';
import Editor from 'components/editor';
import Viewer from './viewer';
import Panel from './panel/panel';

import './index.scss';

class CreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      mdContent: '',
      post: '',
      isEidt: false,
      postId: ''
    };
  }

  componentDidMount() {
    let query = Qs.parse(this.props.location.search.slice(1));
    console.log('query', query);
    if (query.type == 'edit' && query.id) {
      this.loadData(query.id);
      this.setState({
        isEidt: true,
        postId: query.id
      });
    }
  }
  loadData(id) {
    API.postdetail({ params: { id } }).then(res => {
      if (res.status === 200) {
        let { data } = res;
        this.setState({
          post: data
        });
        this.onEditorChange(data.post_body_md);
      }
    });
  }
  onEditorChange = data => {
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
  };
  onPostSubmit = ({ title }) => {
    let { content, mdContent } = this.state;

    if (!title || !content || !mdContent) {
      console.log('缺少参数!');
      return;
    }

    let params = {
      id: this.state.postId,
      post_title: title,
      post_body: content,
      post_body_md: mdContent
    };

    let submitAPI = this.state.isEidt ? API.updatePost : API.create;

    submitAPI(params)
      .then(res => {
        if (res.status == 200) {
          let { data } = res;
          console.log('发布成功!');
          if (data.id) {
            this.props.history.replace({
              pathname: '/postdetail',
              search: `?id=${data.id}`
            });
          }
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
  render() {
    let { content, post } = this.state;
    return (
      <div className='create-container'>
        <Panel onSubmit={this.onPostSubmit} title={post && post.post_title} />
        <Editor
          onChange={this.onEditorChange}
          content={post && post.post_body_md}
          className='post-editor'
        />
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
