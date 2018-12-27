import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {} from '../../../modules/loader';

class Login extends React.Component {
  handleLogin() {
    var strWindowFeatures =
      'menubar=no,toolbar=no,location=yes,resizable=yes,scrollbars=yes,status=no,width=500,height=50';

    var popup = window.open('', '_blank', strWindowFeatures);

    fetch('/api/auth')
      .then(response => response.json())
      .then(tokens => {
        var url =
          'https://api.twitter.com/oauth/authenticate?oauth_token=' +
          tokens.oauth_token;
        popup.location.href = url;
      });
  }

  render() {
    return (
      <div>
        <button className="btn btn-info" onClick={() => this.handleLogin()}>
          Login with Twitter
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push('/')
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
