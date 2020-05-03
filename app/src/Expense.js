import React, { Component } from 'react';
import AppNav from './AppNav'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import {Table,Button,Container,Form,Input,FormGroup, Label } from 'reactstrap';



// {
//     "id": 101,
//     "expenseDate": "2017-07-01T14:59:55.711Z",
//     "description": "Accomodation",
//     "category": {
//         "id": 1,
//         "name": "Travel"
//     },
//     "location": "New York"
// }



class Expense extends Component {


    emptyList={
        date:new Date(),
        description:'',
        location:'',
        expenseDate: new Date(),
        category:{
            name:'Travel'
        }

    }


    constructor(props)
    {
        super(props)
        this.state={
            date:new Date(),
            Categories:[],
            Expenses:[],
            isLoading:true,
            expenseData:this.emptyList
            

        }
        this.handleSubmit =  this.handleSubmit.bind(this);
        this.handleChange =  this.handleChange.bind(this);
        this.handleDateChange=this.handleDateChange.bind(this);
  
    }

    async handleChange(event)
    {
     
        let expenseData = {...this.state.expenseData};
        let target = event.target;
        let id = target.id;
        expenseData[id]=target.value;
        this.setState({expenseData:expenseData});
        
    }

    async handleDateChange(date)
    {
        
        let expenseData =  {...this.state.expenseData};
        expenseData.expenseDate = date;
        this.setState({expenseData:expenseData});
    }


    async handleSubmit(event)
    {
    
        const{expenseData} = this.state;
        await fetch('/api/expense',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify(expenseData)

        })
        console.log(this.state);
        event.preventDefault();
        

    }


     async remove(id)
     {
          await fetch(`/api/expense/${id}/`,{
             method:'DELETE',
             headers:{
                 'Accept':'application/json',
                 'Content-type':'application/json'
             }
         }).then(()=>{
             let updatedExpenses = [...this.state.Expenses].filter(i=>i.id!==id)
             this.setState({Expenses : updatedExpenses});
         })
     }

      async componentDidMount()
      {
        const response  = await fetch('/api/categories');
        const body  = await response.json();
        this.setState({
            Categories:body,
            isLoading:true
        })

        const responseExp = await fetch('/api/expenses');
        const bodyExp = await responseExp.json();
        this.setState({
            Expenses:bodyExp,
            isLoading:false
        })
      }



    render() { 
        const {Expenses,isLoading,Categories} = this.state;
        if(isLoading)
            return (<div>Loading...</div>)
        
       
            
        return ( 
        <div>
            <AppNav/>
            <Container style={{margin:"20px",width:"500px"}}>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup style={{margin:"10px"}}>
                        <Label for="title">Title</Label>
                        <Input id="description" type="text" placeholder="Title of Expense" onChange={this.handleChange}></Input>
                    </FormGroup>
                 
                    <FormGroup style={{margin:"10px"}}>
                        <Label for="category">Category</Label>
                        <Input type="select" id="category" onChange={this.handleChange}>
                           {
                               Categories.map(category=>
                               <option key={category.id} id={category.id}>{category.name}</option>
                                )
                           }
                        </Input>
                    </FormGroup>

                    <FormGroup style={{margin:"10px"}}>
                        <Label for="date">Date</Label>
                        <br></br>
                        <DatePicker id="expenseDate" selected={this.state.expenseData.expenseDate} onChange={this.handleDateChange}></DatePicker>
                    </FormGroup>

                    <FormGroup style={{margin:"10px"}}>
                        <Label for="location">Location</Label>
                        <Input id="location" type="text" placeholder="Location" onChange={this.handleChange}></Input>
                    </FormGroup>

                    <Button type="submit" style={{margin:"10px",background:"cyan",color:"black",border:"none"}} >Submit</Button>

                </Form>
            </Container>

            <Container>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th width="30%">Title</th>
                            <th width="10%">Category</th>
                            <th width="10%">Location</th>
                            <th width="10%">Date</th>
                            <th width="10%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Expenses.map(data=>
                                <tr key={data.id}>
                                    <td>{data.description}</td>
                                    <td>{data.category.name}</td>
                                    <td>{data.location}</td>
                                    <td>{data.expenseDate}</td>
                                    <td><Button size="sm" color="danger" onClick={()=>this.remove(data.id)}>Delete</Button> </td>
                                </tr>
                                )
                        }
                    </tbody>
                </Table>
            </Container>

        </div> );
    }
}
 
export default Expense;