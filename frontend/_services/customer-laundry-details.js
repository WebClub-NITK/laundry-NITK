import apiUrl from '../environment';
class customerLaundryDetails{

        postCustomerLaundry(customerLaundry) {
            var path = apiUrl+"/enterCustomerLaundry/";
            customerLaundry = JSON.stringify(customerLaundry);
            return fetch(path, {
                method: "POST",//Request Type 
                body: customerLaundry,//post body 
                headers: {//Header Defination 
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            })

        }



}
const b = new customerLaundryDetails();
export default b;
