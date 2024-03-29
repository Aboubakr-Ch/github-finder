import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom'
import Repos from '../repos/Repos';

export class User extends Component {
    componentDidMount() {
        this.props.getUser(this.props.match.params.login);
        this.props.getUserRepos(this.props.match.params.login);
    }

  static  propTypes = {
    loading:PropTypes.bool,
    user:PropTypes.object.isRequired,
    getUser:PropTypes.func.isRequired,
    getUserRepos:PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired
  }

  render() {
    const{
        name,
        avatar_url,
        bio,
        blog,
        login,
        html_url,
        company,
        location,
        followers,
        following,
        public_repos,
        public_gists,
        hireable
    } = this.props.user;

    const {loading, repos} = this.props;

    if(loading) return <Spinner></Spinner>;
    return (
      <Fragment>
        <h1>{login}</h1>
        <Link tp='/' className='btn btn-light'>Back To Search</Link>
        Hireable : {''}
        {hireable ? (
            <i className='fas fa-check text-success'></i>
        ): (
            <i className='fas fa-times-circle text-danger'></i>
        )}

        <div className='card grid-2'>
            <div className='all-center'>
                <img src={avatar_url} className="round-img" alt='' style={{ width:'150px'}}></img>
                <h1>{name}</h1>
                <p>Location: {location}</p>
            </div>
            <div>
                {bio && (
                    <Fragment>
                    <h3>Bio</h3>
                    <p>{bio}</p>
                    </Fragment>
                )}
                <a href={html_url} className='btn btn-dark my-1'>Visit Github Profile</a>
                <ul>
                    <li>
                        {login && <Fragment>
                            <strong>Username:</strong> {login}</Fragment>}
                    </li>

                    <li>
                        {company && <Fragment>
                            <strong>Company:</strong> {company}</Fragment>}
                    </li>

                    <li>
                        {blog && <Fragment>
                            <strong>Website:</strong> {blog}</Fragment>}
                    </li>
                </ul>
            </div>
        </div>

        <div className='card text-ceneter'>
            <div className='badge badge-primary'>Followers: {followers}</div>
            <div className='badge badge-success'>Following: {following}</div>
            <div className='badge badge-light'>Public Repos: {public_repos}</div>
            <div className='badge badge-dark'>Public Gists: {public_gists}</div>
        </div>

        <Repos repos={repos}></Repos>
      </Fragment>
    )
  }
}

export default User