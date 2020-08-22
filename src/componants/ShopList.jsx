import React, { Component } from 'react';
import { connect } from "react-redux";
import { NotificationManager } from 'react-notifications';
import { confirmAlert } from "react-confirm-alert";

import { fetchShop, removeShop, updateShop } from '../actions/index';
import { isEmpty } from '../helper';

class ShopList extends Component {
    constructor(props){
        super(props)
        this.state = {
            loader : true,
            shopObj: [],
            fields: { name: '', status: '' },
            id: 0,
            query: '',
            pageNo: 1,
            sizeOfShop: 10,
            size : 0
        }
        this.handleChange       = this.handleChange.bind(this);
        this.searchInputChange  = this.searchInputChange.bind(this);
        this.searchHandleKeyUp  = this.searchHandleKeyUp.bind(this);
       }

    handleChange(e){
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });
    }

    searchInputChange(e){
        this.setState({
            query : e.target.value
          }, () => {
            if (this.state.query && this.state.query.length > 1) {
              if (this.state.query.length % 2 === 0) {
                    this.getInfo();
              }
            } else if (!this.state.query) {
            }
          })
    }
    componentWillMount(){
        this.props.fetchShop();
        setTimeout(()=>{
            this.setState({
                shopObj: this.props.allData,
                loader : false
            });
        },1000);
    }

    componentDidMount() {

    };

    deletShop(shopID){
        confirmAlert({
             message: 'Are you sure you want to delete this Shop?',
             buttons: [
                 {
                     label: 'Yes',
                     onClick: () => this.removeShop(shopID)
                 },
                 {
                     label: 'No'
                 }
             ]
         });
    }
    removeShop(shopID){
        const obj  = this.props.removeShop(shopID);
        obj.then((res)=>{
            const josnObj = res.data;
            if(josnObj.status){
                NotificationManager.success(josnObj.message,'Success !',5000);
            } else {
                NotificationManager.error(josnObj.message,'Error !',5000); 
            }
        });
    }
    editShop(shopId){
        this.setState({id: shopId});
    }

    updateShopData(shopId){
        const obj = this.state.fields;
        obj.id = shopId;
        this.setState({
            fields: obj
        });
        const results = this.props.updateShop(this.state.fields);
        results.then((res)=>{
            const josnObj = res.data;
            if(josnObj.status){
                NotificationManager.success(josnObj.message,'Success !',5000);
                this.setState({id: 0});
            } else {
                NotificationManager.error(josnObj.message,'Error !',5000); 
            }
        });
    }

    cancleShop(){
        this.setState({id: 0});
    }

    displayShop(){
        let loader = this.state.loader;
        if(loader){
            return (
                <tr>
                    <td colSpan="5" style={{ 'position': 'relative', height: '50px' }}>
                        <div className="loader">
                            <div className="dash uno"></div>
                            <div className="dash dos"></div>
                            <div className="dash tres"></div>
                            <div className="dash cuatro"></div>
                        </div>
                    </td>
                </tr>
            )
        } else {
            if(!isEmpty(this.props.allData)){
                let List = this.getFilterResult().map((item,idx) =>{
                    return(
                        <tr key={idx}>
                            <td> {idx + 1}</td>
                            <td><span style={{display: (this.state.id===item.id) ? 'none' : 'block' }}>{item.name}</span> <br />
                                <input type="text" className="form-control" 
                                style={{display: (this.state.id===item.id) ? 'block' : 'none' }} name="name" 
                                onChange={this.handleChange} 
                                value={ (this.state.fields.name==='') ? item.name : this.state.fields.name } />
                            </td>
                            <td><span style={{display: (this.state.id===item.id) ? 'none' : 'block' }}>{item.status} </span> <br />
                                <span><input className="form-control" 
                                    style={{display: (this.state.id===item.id) ? 'block' : 'none' }} type="text" name="status" 
                                    onChange={ this.handleChange } 
                                    value={ (this.state.fields.status==='') ? item.status : this.state.fields.status } /></span>
                            </td>
                            <td>{item.updated_at}</td>
                            <td align="center">
                                <span style={{display: (this.state.id===item.id) ? 'none' : 'block' }}>
                                    <button type="button" onClick={ () => this.editShop(item.id) } className="btn btn-default btn-sm"><span className="glyphicon glyphicon-edit"></span></button> &nbsp;
                                    <button type="button" onClick={ () => this.deletShop(item.id) } className="btn btn-danger btn-sm"><span className="glyphicon glyphicon-remove"></span></button>
                                </span>
                                <span style={{display: (this.state.id===item.id) ? 'block' : 'none' }}>
                                    <button type="button" onClick={ () => this.updateShopData(item.id) } className="btn btn-primary btn-sm"><span className="glyphicon glyphicon-ok"></span></button> &nbsp;
                                    <button type="button" onClick={ () => this.cancleShop() } className="btn btn-default btn-sm"><span className="glyphicon glyphicon-remove"></span></button>
                                </span>
                            </td>
                        </tr>
                    )
                });
                return List;
            } else {
                return (<tr><td colSpan="5">Data is empty</td></tr>)
            }
        }
    }

    searchHandleKeyUp(e){
        this.setState({
            query: e.target.value
        });
    }

    getFilterResult(e){
        if(this.state.query){
            return this.state.shopObj.filter(p =>{
                var findText = this.state.query.toLowerCase();
                if((p.name.indexOf(findText)> -1) || (p.status.indexOf(findText)> -1) || (p.created_at.indexOf(findText)> -1)){
                    return p;
                }
            });
        } else {
            return this.state.shopObj;
        }
    }

    setSizeOfShop(e){
        const shopObj = this.props.allData;
        this.setState({
            sizeOfShop: e.target.value,
            shopObj: shopObj,
            pageNo: Math.ceil(shopObj.length/e.target.value)
        });
        return(this.state.shopObj.length = e.target.value)
    }

    createSelect(){
        let option = []
        for (let i = 1; i < 20; i++) {
             var selected = (this.state.sizeOfShop===i) ? 'selected' : '';
            option.push(
                    <option selected={selected} value={i}>{i}</option>
                )
        }
        return (
            <select className="form-control" onChange={ this.setSizeOfShop.bind(this) }>
                { option }
            </select>
        );
      }

    render() {
        return ( 
            <React.StrictMode>
            <div className="row">
                <div className="col col-md-6">
                    
                </div>
                <div className="col col-md-6">
                    <input type="search" placeholder="Search" autoComplete="off" className="form-control" id="search" onChange={this.searchHandleKeyUp} />
                </div>
            </div>
            <div className="row">
            <div className="col col-md-12">
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr><th>#</th><th>name</th><th>Status</th><th>Date</th><th>Action</th></tr>
                    </thead>
                    <tbody>{ this.displayShop() }</tbody>
                </table>
                </div>
            </div>
            <div className="row">
                <div className="col col-md-2">
                    { this.createSelect() }
                </div>
                <div className="col col-md-8"></div>
                <div className="col col-md-2">
                    <button type="button" className="btn btn-primary">{ this.state.pageNo }</button>
                </div>
            </div>
            </React.StrictMode>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loader  : state.shops.loader,
        allData : state.shops.shopList 
    };
  };
  
const mapDispatchToProps = (dispatch) => {
    return {
        fetchShop: () => dispatch(fetchShop()),
        removeShop: (id) => dispatch(removeShop(id)),
        updateShop : (obj) => dispatch(updateShop(obj))
    };
};
  

export default connect(mapStateToProps,mapDispatchToProps)(ShopList);