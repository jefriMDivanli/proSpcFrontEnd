import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { onCreateCompany, onCreateOffice, companyDetail } from '../../Actions/CreateButtonAction';
import './company.css';
import './mainPage.css';
import axios from 'axios';
import { API_URL_1 } from '../../Support/api_url';


class MainPage extends Component {
    //Kalau data bisa di rubah (tambah ato kurang) taro di state.
    state= { 
        buttonType: '',
        date : new Date(),
        error: 0
    };

    componentWillMount() {
        //companyDetail dari CreateActioncreator 
        this.props.companyDetail();
        console.log(this.props.companies)
    }

    componentWillReceiveProps(x) {
        console.log(x);
    }

    //COMPANY SUBMISSION BUTTON
    onCompanyCreateClick = () => {
        if (this.refs.nameCompany.value === '' ||
            this.refs.companyAddress.value === '' ||
            this.refs.companyRevenue.value === '' ||
            this.refs.countryCode.value === '' ||
            this.refs.telephone.value === ''
        ) {
            alert('All fields must be filled.')
            this.setState({error: 1})
        } else {
            var name = this.refs.nameCompany.value;
            var address = this.refs.companyAddress.value;
            var revenue = this.refs.companyRevenue.value;
            var countryCode = this.refs.countryCode.value;
            var telephone = this.refs.telephone.value;

            
            this.props.onCreateCompany({ name, address, revenue, countryCode, telephone });
            alert('Company added successfully.');
            this.props.companyDetail();
        }
    } 

        
    //OFFICE SUBMISSION FORM
    onOfficeCreateClick = () => {
        if (this.refs.officeName.value === '' ||
            this.refs.officeLat.value === '' ||
            this.refs.officeLong.value === '' ||
            this.refs.officeCompany.value === '' ||
            this.refs.startDate.value === ''
        ) {
            alert('All fields must be filled.')
            this.setState({ error: 2 })
        } else {

        var name = this.refs.officeName.value;
        var latitude = this.refs.officeLat.value;
        var longitude = this.refs.officeLong.value;
        var company = this.refs.officeCompany.value;
        var startDate = this.refs.startDate.value;
        console.log(startDate);
        
        this.props.onCreateOffice({ name, latitude, longitude, startDate, company});
        alert('Office added successfully.');
        this.componentWillMount()
        console.log(startDate);
        }
    }

    //RENDER COMPANY REGISTRATION FORM
    renderCompanyCreateForm = () => {
            if (this.state.error === 1 ) {
                return(
                    <form className='form formCompany'>
                        <h2>Create Company</h2>

                        <p>Name:</p>
                        <input ref='nameCompany' className='createInput' type='text' placeHolder='MUST BE FILLED' />

                        <p>Address:</p>
                        <input ref='companyAddress' className='createInput' type='text' placeHolder='MUST BE FILLED'/>

                        <p>Revenue:</p>
                        <input ref='companyRevenue' className='createInput' type='number' placeHolder='MUST BE FILLED'/>

                        <p>Phone Number:</p>
                        <div className='doubleInput'>
                            <input ref='countryCode' className='createInputA' type='number' placeHolder='MUST BE FILLED'/>
                            <input ref='telephone' className='createInputB' type='number' placeHolder='MUST BE FILLED'/>
                        </div>

                        <div className='button'>
                            <button type='button' className='btn' ref='buttonType' value='company' onClick={this.onCompanyCreateClick}> Submit </button>
                        </div>
                </form> )
            } else {
                return (
                <form className='form formCompany'>
                    <h2>Create Company</h2>

                    <p>Name:</p>
                    <input ref='nameCompany' className='createInput' type='text' />

                    <p>Address:</p>
                    <input ref='companyAddress' className='createInput' type='text' />

                    <p>Revenue:</p>
                    <input ref='companyRevenue' className='createInput' type='number' />

                    <p>Phone Number:</p>
                    <div className='doubleInput'>
                        <input ref='countryCode' placeholder="code" className='createInputA' type='number' />
                        <input ref='telephone' placeholder="Phone number" className='createInputB' type='number' />
                    </div>

                    <div className='button'>
                        <button type='button' className='btn' ref='buttonType' value='company' onClick={this.onCompanyCreateClick}> Submit </button>
                    </div>
                </form>)
            }
        }

    //RENDER OFFICE REGISTRATION FORM
    
    renderOfficeCreateForm = () => {
        if (this.state.error === 2) {
            return (
                <form className='form formOffice'>
                    <h2>Create Office</h2>

                    <p>Name:</p>
                    <input ref='officeName' className='createInput' type='text' placeHolder='MUST BE FILLED'/>


                    <p>Location:</p>
                    <div className='doubleInput'>
                        <input ref='officeLat'  className='createInputC' type='text' placeholder='MUST BE FILLED'/>
                        <input ref='officeLong'  className='createInputD' type='text' placeholder='MUST BE FILLED'/>
                    </div>

                    <p>Office Start Date:</p>
                    <input ref='startDate' className='createInput' type='text' placeolder='MUST BE FILLED'/>

                    <p placeholder='MUST BE FILLED'>Company:</p>
                    <select ref='officeCompany' className='dropdown'>
                        <option value='selected'> Select Company </option>
                        {this.renderCompanyOption()}
                    </select>

                    <div className='button'>
                        <button type='button' className='btn' ref='buttonType' value='office' onClick={this.onOfficeCreateClick}> Submit </button>
                    </div>
                </form>
            )} else {
            return (
            <form className='form formOffice'>
                <h2>Create Office</h2>

                <p>Name:</p>
                <input ref='officeName' className='createInput' type='text' />

                
                <p>Location:</p>
                <div className='doubleInput'>
                    <input ref='officeLat' placeholder="Latitude" className='createInputC' type='text' />
                    <input ref='officeLong' placeholder="Longitude" className='createInputD' type='text' />
                </div>
            
                <p>Office Start Date:</p>
                <input type='date' placeholder="Please Select" className='createInput' ref='startDate' />
                  


                <p>Company:</p>
                <select ref='officeCompany' className='dropdown'>
                    <option value='selected'> Select Company </option>
                    {this.renderCompanyOption()}
                </select>
               
               <div className='button'>
                <button type='button' className='btn' ref='buttonType' value='office' onClick={this.onOfficeCreateClick }> Submit </button>
                </div>
            </form>
        )
    }}

    //RENDER COMPANY NAME TO DROPDOWN LIST
    //ON OFFICE REGISTRATION FORM
    renderCompanyOption = () => {
        console.log(this.props.companies)
        return (this.props.companies.map((companyList) => {
           return <option key={companyList.id} value={companyList.id}>{companyList.name}</option>
        })
    )}


    //RENDER COMPANY DATA
    renderCompanyList = () => {
        return (this.props.companies.map((companyData) => {
            var url = `/office/${companyData.id}`
            return (
                    <div className="dataCard">
                        <div className="dataCard-header">
                            <p className='companyName'>{companyData.name}</p>
                            <p className='deleteBtn' onClick={()=> this.onBtnDeleteClick(companyData.id)}>X</p>
                        </div>
                        <Link className='logoLink' to={url}>
                            <div className="dataCard-data">
                                <h4>Address:</h4>
                                <p>{companyData.address}</p>
                                <h4>Revenue:</h4>
                                <p>{companyData.revenue}</p>
                                <h4>Phone Number:</h4>
                                <p>+{companyData.countryCode} {companyData.telephone}</p>
                            </div>
                        </Link>
                </div>
               
            )
        }
    ))}

    //DELETE COMPANY BUTTON
    onBtnDeleteClick = (companyId) => {
        if (window.confirm('Are you sure you want to delete this company?')){
        axios.delete(`${API_URL_1}/deleteCompany/${companyId}`)
            .then(res => {
                alert('Delete Successful')
                this.props.companyDetail();
                }
            )
            .catch((err) => {
                alert(err);
        })
        }
    }

    render() {
        console.log(this.props.createCompany);
        return (
            <div className='mainPage'>
                
                <div className='createForm' >
                    <div className='companyForm'>
                        {this.renderCompanyCreateForm()}
                    </div>

                    <div className='separator'></div>

                    <div className='officeForm'>
                        {this.renderOfficeCreateForm()}
                    </div>
                </div>

                <div className='renderCompanyList'>
                    <h1>Companies</h1>
                    <div className='dataCardRendering'>
                    {this.renderCompanyList()}
                    </div>
                </div>

            </div>  
            )
        };
    }

const mapStateToProps = (state) => {
    //state menampung semua yg ada di index.js reducer
    const companies = state.companyData;
    return { companies };
}


export default connect(mapStateToProps, { onCreateCompany , onCreateOffice, companyDetail })(MainPage);
