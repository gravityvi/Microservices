import React, { Component } from 'react';
import AppNav from './AppNav'


class Category extends Component {
    state = { 
        isLoading: true,
        Categories: []
     }

     async componentDidMount() {
         
        const response=await fetch('/api/categories');
        const body = await response.json();
        this.setState({Categories : body , isLoading: false});
    }
    render() { 
        console.log("Called")
        const {isLoading,Categories} = this.state;

        if(isLoading)
            return( <div>Loading...</div>)
        else
            return ( 
                <div>
                    <AppNav/>
                    <h2> Categories </h2>
                    {
                        Categories.map(cat=>
                            <div id={cat.id}>
                                {cat.name}
                            </div>
                        )
                    }
                </div> );
    }
}
 
export default Category;