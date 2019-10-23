
// var script = document.createElement('script');
// script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);
var HTTPService = require('react-native-http').HTTPService;

class customerDetails extends HTTPService {

    postCustomerDetails(customerDetail) {
        console.log("service")
        //var path = `localhost:8000/api/customerDetails`;
        const Url = 'http://127.0.0.1:8000/api/customerDetails';
        const data = customerDetail;
        // $.post(Url,data,function(data,status){
        //   console.log('${data} and status is ${status}')
        //   return status;
        // });
        // return this.post(path, customerDetail)
        const othePram={
          headers:{"content-type":"application/json; charset=UTF-8"},
          body:Data,
          method:"POST"
        }
        fetch(Url,othePram).then()
    }
}
const b = new customerDetails();
export default b;
