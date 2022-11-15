import axios from "axios";
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