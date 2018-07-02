import React, { Component } from 'react';
import axios from 'axios';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import Results from '../components/Results';

const currentUser = window.sessionStorage.getItem('currentUser');

class IndexScreen extends Component {
  state = {
    location: 'Idaho Falls',
    results: [],
    userId: currentUser || null,
  }

  onChange = this.onChange.bind(this)
  onClick = this.onClick.bind(this)
  onLogout = this.onLogout.bind(this);
  onLogin = this.onLogin.bind(this);

  onChange(e) {
    this.setState({ location: e.target.value });
  }

  onLogin(response) {
    const { id: userId } = response;
    window.sessionStorage.setItem('currentUser', userId);
    this.setState({ userId });
  }

  onLogout() {
    window.sessionStorage.clear();
    this.setState({ userId: null });
  }

  async onClick(e) {
    e.preventDefault();

    const { location } = this.state;
    this.setState({ results: [] });

    const { data } = await axios.get(
      '/yelp',
      {
        headers: { 'Cache-Control': 'no-cache' },
        params: { term: 'bars', location },
      },
    );
    this.setState({ results: data[1] });
  }

  render() {
    const { location, results, userId } = this.state;

    return (
      <main className="container-fluid">
        {new Date().toDateString()}
        Plans tonight? See which bars are hoppin tonight and RSVP ahead of time!
        Remember: take a cab and drink responsibily.

        {userId ? <LogoutButton onLogout={this.onLogout} /> :
        <LoginButton onLogin={this.onLogin} />}

        <form className="form-group">
          <label className="form-label" htmlFor="location">Location</label>
          <input id="location" type="text" className="form-control" onChange={this.onChange} value={location} required />
          <button type="submit" className="btn btn-primary" onClick={this.onClick}>Go</button>
        </form>
        <section>
          {results.length ? <Results results={results} userId={userId} /> : null}
        </section>
      </main>);
  }
}

export default IndexScreen;
