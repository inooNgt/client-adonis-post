import React from 'react';
import API from 'utils/api';
import Editor from 'components/editor';
import Button from '@material-ui/core/Button';
import Page from 'components/page';
import marked from 'marked';
import highlight from 'highlight.js';
import './index.scss';

export default class NotePage extends React.Component {
  constructor(props) {
    super(props);
  }

  state = { content: '', mdContent: '', title: '', isEidt: false, noteId: '' };

  componentDidMount() {}

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
  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleSubmit = () => {
    let { content, mdContent, title } = this.state;
    console.log(this.state);
    if (!title || !content || !mdContent) {
      console.log('缺少参数!');
      return;
    }

    let params = {
      id: this.state.noteId || '',
      note_title: title,
      note_body: content,
      note_body_md: mdContent
    };

    let submitAPI = this.state.isEidt ? API.updateNote : API.createNote;

    submitAPI(params)
      .then(res => {
        if (res.status == 200) {
          let { data } = res;
          console.log('发布成功!');
          if (data.id) {
            this.props.history.replace({
              pathname: '/note'
            });
          }
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
  handleCancel = () => {};
  render() {
    return (
      <Page>
        <div className='my-note-editor'>
          <input
            type='text'
            className='note-input-title'
            placeholder='Enter title here...'
            maxLength='80'
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
          <Editor onChange={this.onEditorChange} className='note-editor' />
          <div className='note-row-btn'>
            <Button
              variant='contained'
              color='secondary'
              size='large'
              type='submit'
              onClick={this.handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              color='primary'
              size='large'
              type='submit'
              onClick={this.handleSubmit}
            >
              Publish
            </Button>
          </div>
        </div>
      </Page>
    );
  }
}
