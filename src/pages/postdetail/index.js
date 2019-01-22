import React from 'react';
import { connect } from 'react-redux';
import API from 'utils/api';
import Page from 'components/page';
import Qs from 'qs';

import 'scss/heighlight.scss';
import './index.scss';

class PostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { post: {} };
  }
  componentDidMount() {
    let query = Qs.parse(this.props.location.search.slice(1));
    if (query && query.id !== undefined) this.loadData(query.id);
  }
  loadData(id) {
    API.postdetail({ params: { id } }).then(res => {
      if (res.status === 200) {
        let { data } = res;
        this.setState({
          post: data
        });
      }
    });
  }
  genarateInnerHtml() {
    return { __html: this.state.post && this.state.post.post_body };
  }
  render() {
    let { post } = this.state;
    return (
      <Page>
        <article
          className='detail-content rich-text'
          dangerouslySetInnerHTML={this.genarateInnerHtml()}
        />
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    logined: state.logined
  };
};

export default connect(mapStateToProps)(PostDetail);
