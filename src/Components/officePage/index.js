import React, { Component } from 'react';
import { onCreateCompany, onCreateOffice, companyDetail, officeDetail } from '../../Actions/CreateButtonAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_URL_1 } from '../../Support/api_url';
import axios from 'axios';
import '../mainPage/company.css';
import '../mainPage/mainPage.css';
import './officePage.css';


class RenderOffice extends Component {

    componentWillMount() {
        this.props.officeDetail();
        this.props.companyDetail();
    }

    // componentWillReceiveProps(newProps) {
    //     console.log(newProps)
    // }

    //RENDER COMPANY LIST
    renderCompanyList = () => {
        return (this.props.companies.map((companyData) => {
            if(companyData.id == this.props.match.params.id) {
                return (
                <div>
                    <div className="dataCardOffice-header">
                        <p className='companyName'>{companyData.name}</p>
                    </div>

                    <div className="dataCardOffice-data company">
                        <h4>Address:</h4>
                        <p>{companyData.address}</p>
                        <h4>Revenue:</h4>
                        <p>{companyData.revenue}</p>
                        <div className='home-btn'>
                            <div>
                                <h4>Phone Number:</h4>
                                <p>+{companyData.countryCode} {companyData.telephone}</p>
                            </div>
                            <Link className='logoLink' to='/'>
                                < button type='button' className='btn office' ref='buttonType' value='office'> Back To Overview </button>
                            </Link>
                        </div>
                    </div>
             </div>
            )} 
        }))
    }

    //RENDER OFFICE LIST
    renderOfficeList = () => {
        console.log(this.props.office);
        return (this.props.office.map((officeData) => {
            if (officeData.company == this.props.match.params.id) {
            return (
                <div className="dataCardOffice">
                    <div className="dataCard-header office">
                        <p className='officeName'>{officeData.officeName}</p>
                        <p className='deleteBtn' onClick={() => this.onBtnOfficeDeleteClick(officeData.id)}>X</p>
                    </div>

                    <div className="dataCard-data">
                        <h4>Location:</h4>
                        <p>Lat - {officeData.latitude}</p>
                        <p>Log - {officeData.longitude}</p>
                        <h4>Start Date:</h4>
                        <p>{officeData.startDate}</p>
                       
                    </div>
                </div>
            )}
        }
    ))
    }

    onBtnOfficeDeleteClick = (officeId) => {
        if (window.confirm('Are you sure?')) {
        axios.delete(`${API_URL_1}/deleteOffice/${officeId}`)
            .then((res) => {
                alert('Delete successful.')
                this.setState({ office: res.data });
                this.props.officeDetail();
            })
            .catch((err) => {
                alert("Error");
            })
        }
    }

    render() {
        return(
            <div className='officePage'>

                <div className='companyDetail'>
                    {this.renderCompanyList()}
                </div>

                
                <div className="officeListPage">
                    <h1>Offices</h1>
                    <div className='officeList'>
                    {this.renderOfficeList()}
                    </div>
                </div>
                <div>
                    
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    //state menampung semua yg ada di index.js reducer
    var companies = state.companyData;
    const office = state.officeData;

    return {companies, office};
}


export default connect(mapStateToProps, { onCreateCompany, onCreateOffice, companyDetail, officeDetail })(RenderOffice);