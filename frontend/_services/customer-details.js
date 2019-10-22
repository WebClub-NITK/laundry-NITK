var HTTPService = require('react-native-http').HTTPService;

class customerDetails extends HTTPService {
  
    postCustomerDetails(customerDetail) {
    var path = `localhost:8000/api/customerDetails`;
    return this.post(path, customerDetail);
  }
}

export default customerDetails; 