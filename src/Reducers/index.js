import { combineReducers } from 'redux';
import CreateCompanyReducer from './CreateCompanyReducer';
import CreateOfficeReducer from './CreateOfficeReducer';
import CompanyDataReducer from './CompanyDataReducers';
import OfficeDataReducer from './OfficeDataReducers';


export default combineReducers({
    createCompany: CreateCompanyReducer,
    createOffice: CreateOfficeReducer,
    companyData: CompanyDataReducer,
    officeData: OfficeDataReducer
});