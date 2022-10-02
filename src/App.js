import React, {Fragment, Component} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios'
import Search from './components/users/Search';

class App extends Component {
  state = {
    users:[],
    loading: false
  }
  async componentDidMount() {
    this.setState({loading: true});
    const res = await axios.get('https://api.github.com/users');
    this.setState({users: res.data, loading: false});
  }

  render(){
    return (
      <Fragment>
        <Navbar title='Github Finder' icon='fab fa-github'></Navbar>
        <div className='container'>
          <Search></Search>
        <Users loading={this.state.loading} users={this.state.users}></Users>
        </div>
      </Fragment>
    );
  }
}

export default App;