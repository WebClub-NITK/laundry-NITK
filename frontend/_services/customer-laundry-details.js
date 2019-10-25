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

        getCustomerLaundry(userKey){
            var path = apiUrl+"/customerDetails/";
            data = {
                key:userKey
            }

            const res = fetch(path, {
                method: "POST",//Request Type 
                // body: data,//post body 
                // headers: {//Header Defination 
                //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                // },
            })
            return res;

            let response = fetch(path);
            // console.log(response);
            // let data = response.json();
            // console.log("manan");
            // console.log(data);
            // return data;
            return response

            // return await res.json();

            

        }
}
const b = new customerLaundryDetails();
export default b;
