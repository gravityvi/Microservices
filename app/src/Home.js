import React, { Component } from 'react';
import AppNav from './AppNav';

class Home extends Component {
    state = {  }
    render() { 
        return (
            <div>
            <AppNav/>
                <h2 style={{display:'flex',justifyContent:'center',color:'black',alignItems:'center'}}>Welcome to Expense Tracker Application</h2>
            
            </div>
        );
    }
}
 
export default Home;