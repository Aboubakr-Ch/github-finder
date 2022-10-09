import React, {Fragment, Component} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import axios from 'axios'
import Search from './components/users/Search';
import Alert  from './components/layout/Alert';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import About from './components/pages/About';

class App extends Component {
  state = {
    users:[],
    user: null,
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

  //Get single Github user
 getUser = async username => {
  this.setState({loading: true});
  const res = await axios.get(`https://api.github.com/users/${username}`);
  this.setState({user: res.data, loading: false});
 }


  render(){
    const{users, loading, user} = this.state
    return (
     <Router>
       <div className='App'>
        <Navbar title='Github Finder' icon='fab fa-github'></Navbar>
        <div className='container'>
          <Alert alert={this.state.alert}></Alert>
          <Routes>
            <Route exact path='/' element={
              <Fragment>
                <Search searchUsers={this.searchUsers} 
                        clearUsers={this.clearUsers} 
                        setAlert={this.setAlert}
                        showClear={users.length > 0 ? true : false}/>
                <Users loading={loading} users={users}/>
              </Fragment>
            }></Route>
            <Route exact path='/about' element={<About/>}/>
            <Route exact path='/user/:login' render={ (props) =>
              <User {...props} getUser={this.getUser} user={user} loading={loading}/>}>
            </Route>
          </Routes>
        </div>
      </div>
     </Router>
    );
  }
}

export default App;