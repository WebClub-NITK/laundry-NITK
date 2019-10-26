import apiUrl from '../environment';
class customerLaundryDetails{
        result=[];
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



        getCustomerLaundry(key) {
            console.log("get Customer laundry")
            console.log(key);
            var path = apiUrl+"/retreiveCustomerLaundry/";
            key = JSON.stringify(key);
            return fetch(path, {
                method: "POST",//Request Type
                body: key,//post body
                headers: {//Header Definition
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            })
        }

        getCustomerLaundryCurrent(){
            return this.result.current;
        }
        getCustomerLaundryHistory(){
            return this.result.history;
        }



}
const b = new customerLaundryDetails();
export default b;