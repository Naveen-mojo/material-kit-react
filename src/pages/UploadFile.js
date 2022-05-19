import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CsvToHtmlTable } from 'react-csv-to-table';

function UploadFile() {

  const [file, setFile] = useState(null);
  const [loadingbutton, setLoadingButton] = useState(false)
  const [submitButton, setSubmitButton] = useState(false)
  const [data, setData] = useState(null)

  const FileName = (event) => {
    setFile(event.target.files[0])
    setSubmitButton(false)
  }

  const fileUpload = (e) => {
    e.preventDefault();
    setLoadingButton(true)
    setLoadingButton(true)
    const formdata = new FormData();
    formdata.append("file", file);

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/api/user/products/", requestOptions)
      .then(response => response)
      .then(result => {
        console.log(result)
        if(result.status === 200){
          toast("Successfully upload the data")
        }
        if(result.status === 500){
          toast("Something went wrong please try again later!")
        }
        setLoadingButton(false)
      })
      .catch(error => {
        console.log('error', error)
        setLoadingButton(false)
      });
  }

  const sampleData = `
  Please First Upload The File 
  `;

  // const tableData = () => {
  //   const requestOptions = {
  //     method: 'GET',
  //     redirect: 'follow'
  //   };

  //   fetch("http://127.0.0.1:8000/api/user/tabledata/", requestOptions)
  //     .then(response => response.text())
  //     .then(result => {
  //       setData(result)
  //       console.log(result)
  //     })
  //     .catch(error => console.log('error', error));
  // }

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-5'>
            <div className="mb-3">
              <div className='fw-bold h5 mb-3 mt-2'>Upload File</div>
              <form onSubmit={fileUpload}>
                <div className='d-flex'>
                  <div className='flex-grow-1'>
                    <input className="form-control" onChange={FileName} accept='.csv' type="file" id="formFile" required />
                  </div>
                  <div className=' ms-3'>
                    <button className='btn btn-success' disabled={submitButton}>
                      {loadingbutton ?
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                        : ''}
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className='col-md-7 mt-5'>
            <a href='http://127.0.0.1:8000/api/user/csvfile/' className='btn btn-success ms-5'>Download CSV</a>
          </div>
          <ToastContainer />
        </div>
        <div>
          {/* <CsvToHtmlTable
            data={data || sampleData}
            csvDelimiter=","
            tableClassName="table text-center w-100 mt-3"
          /> */}
        </div>
      </div>
    </>
  )
}

export default UploadFile;