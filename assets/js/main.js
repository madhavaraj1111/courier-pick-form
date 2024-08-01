// justValidate
import JustValidate from 'just-validate';
// dayjs
import dayjs from "dayjs";
// uuid
import { v4 as uuidv4 } from 'uuid';
import { rule } from 'postcss';

const courierFormValue=document.getElementById("courier-form");
const validateForm= new JustValidate(courierFormValue,{
    validateBeforeSubmitting: true,
  });

validateForm.addField("#name-input",[
    {
        rule:"required",
         errorMessage:"Enter your Name",
    },
    {
        rule:"minLength",
        value:3,
    },
    {
        rule:"maxLength",
        value:20,
    }
],
{
    
        errorLabelCssClass:["invalid"],
       
      
},);

validateForm.addField("#number-input",[
    {
    rule:"required",
    errorMessage:"Enter Number",
},
{
    rule:"number",
},

{
    rule:"minLength",
    value:10,
},
{
    rule:"maxLength",
    value:10,
},
]);

validateForm.addField("#datetime-input",[{
    rule:"required",
    errorMessage:"Select date&time",
}]),
validateForm.addField("#address-input",[
    {
        rule:"required",
        errorMessage:"Enter your Address",
    }
]);

validateForm.addField("#agree",[{
    rule:"required",
    
}])

let Array=[];
// onsuccess
validateForm.onSuccess(()=>{ 
// formdata
const formValues=new FormData(courierFormValue);
formValues.append("id",uuidv4())
formValues.append("createdAt",new Date().getTime());
const formObject=Object.fromEntries(formValues.entries());

const newArray=[];

const getItemValue=localStorage.getItem("courierRequest");

const parsedValueArray=JSON.parse(getItemValue);
console.log(parsedValueArray);

if(parsedValueArray){
    // pushing object into array
    parsedValueArray.push(formObject);
    localStorage.setItem("courierRequest",JSON.stringify(parsedValueArray));
    console.log(formObject);
}
else{
newArray.push(formObject);
localStorage.setItem("courierRequest",JSON.stringify(newArray));
}
courierFormValue.reset();
location.replace(true);
})

// getting from local storage
const getLocal=localStorage.getItem("courierRequest");
const parsedLocalStorage=JSON.parse(getLocal);
console.log(parsedLocalStorage);

parsedLocalStorage.map((storedValue,index)=>{
// console.log(storedValue);

if(storedValue){
   const tableDivisonEl=document.getElementById("tableDivision");
 tableDivisonEl.classList.remove("hidden");
}

const tableEl=document.getElementById("tableDataId");
const recordLength=document.getElementById("recordLength");

const tableRow=document.createElement("tr");     
const tableIndex=document.createElement("td");
const tableData=document.createElement("td");   
const tableData2=document.createElement("td");  
const tableData3=document.createElement("td");   
const tableData4=document.createElement("td");  
const tableData5=document.createElement("td");        
const tableButton=document.createElement("button");

tableData.innerText=storedValue.name;
tableData2.innerText=storedValue.number;
tableIndex.innerText=index+1;
const tableValueDate=storedValue.datetime;
tableData4.innerText=storedValue.address;
tableButton.innerText="Delete";
recordLength.innerText=parsedLocalStorage.length;
// courier id get
const courierId=storedValue.id;

tableData.className="px-2 py-2 border max-sm:text-sm";
tableIndex.className="px-1 py-2 border max-sm:text-sm";
tableData2.className="px-2 py-2 border max-sm:text-sm";
tableData3.className="px-2 py-2 border max-sm:text-sm";
tableData4.className="px-2 py-2 border max-sm:text-sm";
tableData5.className="px-2 py-2 border";
tableButton.className="bg-blue-500 text-white  p-1 hover:bg-red-600 rounded font-semibold text-sm max-sm:text-xs";

tableButton.addEventListener("click",()=>{
const confirmBox=confirm("Delete the courier request of "+storedValue.name)
    if(confirmBox==true){ 
   deleteRecord(storedValue["id"]);} 
})


tableData5.append(tableButton);
tableEl.append(tableRow);
tableRow.append(tableIndex,tableData,tableData2,tableData3,tableData4,tableData5);

function dateCall(date_time=storedValue.datetime,format="D,MMM-YYYY hh:mma"){
    return dayjs(date_time).format(format);      
   };
tableData3.innerText=dateCall();
})
// deleting record using button
function deleteRecord(courierID){
const getlocalValue=localStorage.getItem("courierRequest");
const parsedlocalValue=JSON.parse(getlocalValue);
const filtered=parsedlocalValue.filter((e)=>e.id!=courierID);
localStorage.setItem("courierRequest",JSON.stringify(filtered));
location.replace(true);
 }

  





