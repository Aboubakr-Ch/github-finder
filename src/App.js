import React, {Fragment, Component} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios'
import Search from './components/users/Search';
import Alert  from './components/layout/Alert';

class App extends Component {
  state = {
    users:[],
    loading: false,
    alert: null
  }

  

  // async componentDidMount() {
  //   this.setState({loading: true});
  //   const res = await axios.get('https://api.github.com/users');
  //   this.setState({users: res.data, loading: false});
  // }

  //Search github Users
   searchUsers = async (text) => {
         this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/search/users?q=${text}`);
    this.setState({users: res.data.items, loading: false});
  }

  //Clear Users
  clearUsers = () => this.setState({users:[], loading:false});

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type }});
    setTimeout(() => this.setState({ alert: null}), 5000)
  };

  render(){
    const{users, loading} = this.state
    return (
      <Fragment>
        <Navbar title='Github Finder' icon='fab fa-github'></Navbar>
        <div className='container'>
          <Alert alert={this.state.alert}></Alert>
          <Search searchUsers={this.searchUsers} 
                  clearUsers={this.clearUsers} 
                  setAlert={this.setAlert}
                  showClear={users.length > 0 ? true : false}>
          </Search>

        <Users loading={loading} users={users}></Users>
        </div>
      </Fragment>
    );
  }
}

export default App;