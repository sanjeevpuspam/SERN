import React, { Component } from 'react';
import { connect } from "react-redux";
import { addShop }  from '../actions/index';
import { NotificationManager } from 'react-notifications';

class AddShop extends Component {
    constructor(){
        super();
        this.state = {
            fields: { id:0, name: '', shop_name: '', status: '' },
            errors: { }
        }

        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    
    componentDidMount(){
        const data = new Date();
        this.setState({
            fields: {
                'updated_at' : data.toISOString(),
                'created_at' : data.toISOString(),
            }
        });
    }

    handleChange(e){
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });
    }

    submitForm(e){
        e.preventDefault();
        if (this.validateForm()) {
            let fields = this.state.fields;
            this.setState({fields:fields});
            const isAdded = this.props.addShop(fields);
            isAdded.then( res =>{
                if(res.status){
                    NotificationManager.success(res.data.message,'Success !',5000);
                    this.setState({
                        fields: { id:0, name: '', shop_name: '', status: '' }
                    });
                } else {
                    NotificationManager.error(res.data.message,'Error !',5000);
                }
            })
        }
    }

    validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "*Please enter your name.";
        }

        if (!fields["shop_name"]) {
            formIsValid = false;
            errors["shop_name"] = "*Please enter your shop name.";
        }

        if (!fields["status"]) {
            formIsValid = false;
            errors["status"] = "*Please enter your status.";
        } 

        this.setState({
            errors: errors
        });
        return formIsValid;
    }

    render() {
        return (
            <form action="" method="post" name="submitForm"  onSubmit= {this.submitForm}>
                <div className="form-group">
                
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Enter name" required
                        value={this.state.fields.name} onChange={this.handleChange}
                    />
                    </div>
                    <span className="text-danger">{this.state.errors.name}</span>
               
                <div className="form-group">
                        <label htmlFor="shopName">Shop Name:</label>
                        <input type="text" className="form-control" id="shopName" name="shop_name" placeholder="Enter shop name"
                            value={this.state.fields.shop_name} onChange={this.handleChange} required
                        />
                    <span className="text-danger">{this.state.errors.shop_name}</span>
                </div>
                <div className="form-group">
                        <label htmlFor="status">Status:</label>
                        <textarea className="form-control" id="status" name="status" placeholder="Enter status" cols="3" value={ this.state.fields.status } onChange={this.handleChange} required ></textarea>
                    <span className="text-danger">{this.state.errors.status}</span>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        shopPost: state.shops.shopList 
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addShop: (data) => dispatch(addShop(data))
    };
};
  

export default connect(mapStateToProps,mapDispatchToProps)(AddShop);
