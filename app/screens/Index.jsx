import React, { Component } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import Container from '../components/Container';
import CoverImage from '../components/CoverImage';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import Results from '../components/Results';

const currentUser = window.sessionStorage.getItem('currentUser');

class IndexScreen extends Component {
  state = {
    location: 'Idaho Falls',
    results: [],
    userId: currentUser || null,
  };

  onChange = this.onChange.bind(this);
  onClick = this.onClick.bind(this);
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

    const { data } = await axios.get('/yelp', {
      headers: { 'Cache-Control': 'no-cache' },
      params: { term: 'bars', location },
    });
    this.setState({ results: data[1] });
  }

  render() {
    if (window.location.protocol === 'http:' && window.location.hostname !== 'localhost') {
      window.location.href = window.location.href.replace('http', 'https');
    }

    const { location, results, userId } = this.state;
    const now = new Date();

    return (
      <Container backgroundColor="black">
        <header className="mt-4 mb-4">
          <img src="images/logo.svg" alt="Night Life Logo" className="mb-4" />
          <div>
            {userId ? (
              <LogoutButton onLogout={this.onLogout} />
            ) : (
              <LoginButton onLogin={this.onLogin} />
            )}
          </div>
        </header>
        <main>
          <CoverImage url="../images/257.jpg" height="25em" positionY="0" />
          <Container backgroundColor="white" width="100%">
            <h1 className="text-center">Plans tonight?</h1>
            <p className="text-center">
              See which bars are hoppin&apos; tonight and RSVP ahead of time!
              <br />
              Remember: take a cab and drink responsibly.
            </p>
            <div className="dropdown-divider" />
            <form className="form-inline mt-4 ml-3 align-items-end">
              <div>
                <label className="form-label mr-2 justify-content-start" htmlFor="location">
                  Location:
                </label>
                <input
                  id="location"
                  type="text"
                  className="form-control mr-2"
                  onChange={this.onChange}
                  value={location}
                  required
                />
              </div>
              &nbsp;
              <button type="submit" className="btn btn-primary mt-2 mt-sm-0" onClick={this.onClick}>
                Go
              </button>
            </form>
            <section className="mt-5">
              {results.length ? (
                <span>
                  <h2 className="h3 ml-3 mb-2">
                    Results for {`${now.getMonth()}/${now.getDate()}/${now.getFullYear()}`}
                  </h2>
                  <Results results={results} userId={userId} />
                </span>
              ) : null}
            </section>
          </Container>
        </main>
        <footer className="mt-2 mb-2">
          <small>
            <a href="https://www.freepik.com/free-photo/alcohol-conceptual-image_1253907.htm">
              Photo Designed by Freepik
            </a>
          </small>
        </footer>
      </Container>
    );
  }
}

export default IndexScreen;
