var HTTPService = require('react-native-http').HTTPService;

class customerDetails extends HTTPService {
  
    postCustomerDetails(customerDetail) {
        console.log("service")    
        var path = `localhost:8000/api/customerDetails`;
        return this.post(path, customerDetail);
    }
}
const b = new customerDetails();
export default b; 