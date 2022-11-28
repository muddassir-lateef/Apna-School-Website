import axios from "axios";
//let apiURL = "https://orca-app-5kw65.ondigitalocean.app/";
let apiURL = "http://localhost:5000/";

export async function getCert(name) {
    let tempURL = apiURL + `certificate/generate/${name}`;



    axios(tempURL, {
        method: 'GET',
        responseType: 'blob' //Force to receive data in a Blob Format
    })
        .then(response => {
            //Create a Blob from the PDF Stream
            const file = new Blob(
                [response.data],
                { type: 'application/pdf' });
            //Build a URL from the file
            const fileURL = URL.createObjectURL(file);
            //Open the URL on new Window
            window.open(fileURL);
            return response;
        })
        .catch(error => {
            console.log(error);
            return error;
        });


}

export async function getResult(rowData, rollNumber) {
    let tempURL = apiURL + `certificate/getResult/${rollNumber}`;



    axios(tempURL, {
        method: 'PATCH',
        responseType: 'blob', //Force to receive data in a Blob Format
        data: rowData
    })
        .then(response => {
            //Create a Blob from the PDF Stream
            const file = new Blob(
                [response.data],
                { type: 'application/pdf' });
            //Build a URL from the file
            const fileURL = URL.createObjectURL(file);
            //Open the URL on new Window
            window.open(fileURL);
            return response;
        })
        .catch(error => {
            console.log(error);
            return error;
        });

}


export async function printChallanForClass(classYear) {
    let tempURL = apiURL + `certificate/genFeeForClass/${classYear}`;
    console.log(classYear)
    console.log("In pdf service")


    axios(tempURL, {
        method: 'PATCH',
        responseType: 'blob', //Force to receive data in a Blob Format
        data: classYear
    })
        .then(response => {
            //Create a Blob from the PDF Stream
            const file = new Blob(
                [response.data],
                { type: 'application/pdf' });
            //Build a URL from the file
            const fileURL = URL.createObjectURL(file);
            //Open the URL on new Window
            window.open(fileURL);
            return response;
        })
        .catch(error => {
            console.log(error);
            return error;
        });

}


export async function printChallanForSingleStudent(rollNumber, dueDate, feeId, tuitionFee, otherFee, sportsFee, examFee, admissionFee, paidFee, totalFee, OutstandingFees, remainingFee)
{
    console.log("In PDF Service")
    console.log("Roll Number " + rollNumber)
  console.log("Fee Details Most Recent")
  console.log("Due Date " + dueDate)
  console.log("Fee Id " + feeId)
  console.log("Tuition Fee " + tuitionFee)
  console.log("Other Fees " + otherFee)
  console.log("Sports Fee " + sportsFee)
  console.log("Exam Fee " + examFee)
  console.log("Admission " + admissionFee)
  console.log("Tuition Fee " + tuitionFee)
  console.log("Total Fee" + totalFee)
  console.log("Paid Amount " + paidFee)
  console.log("Remaining Fee " + remainingFee)
  let due = OutstandingFees - totalFee
  if(due <= 0) {
    due = 0;
  }
  console.log("Remaining Dues " + due)
  console.log("Grand Total " + OutstandingFees)

  let tempURL = apiURL + `certificate/getFeeChallan/${rollNumber}`;

  axios(tempURL, {
      method: 'PATCH',
      responseType: 'blob', //Force to receive data in a Blob Format
      data:  dueDate, feeId, tuitionFee, otherFee, sportsFee, examFee, admissionFee, paidFee, totalFee, OutstandingFees, remainingFee
  })
      .then(response => {
          //Create a Blob from the PDF Stream
          const file = new Blob(
              [response.data],
              { type: 'application/pdf' });
          //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
          //Open the URL on new Window
          window.open(fileURL);
          return response;
      })
      .catch(error => {
          console.log(error);
          return error;
      });

  return 1
}