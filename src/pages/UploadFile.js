import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UploadFile() {

  const [file, setFile] = useState(null);
  const [tag, setTag] = useState("fashionsootra-21");
  const [loadingbutton, setLoadingButton] = useState(false)
  const [submitButton, setSubmitButton] = useState(false)
  const [data, setData] = useState(null)

  const FileName = (event) => {
    setFile(event.target.files[0])
    setSubmitButton(false)
  }

  const tagName = (event) => {
    setTag(event.target.value)
  }

  const fileUpload = (e) => {
    e.preventDefault();
    setLoadingButton(true)
    setLoadingButton(true)
    const formdata = new FormData();
    formdata.append("file", file)
    formdata.append("tagname", tag)

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/api/user/products/", requestOptions)
      .then(response => response)
      .then(result => {
        console.log(result)
        if (result.status === 200) {
          toast("Successfully upload the data")
        }
        if (result.status === 500) {
          toast("Something went wrong please try again later!")
        }
        setLoadingButton(false)
      })
      .catch(error => {
        console.log('error', error)
        setLoadingButton(false)
      });
  }

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8'>
            <div className="mb-3">
              <div className='fw-bold h5 mb-3 mt-2'>Upload File</div>
              <form onSubmit={fileUpload}>
                <div className='d-flex'>
                  <div className='flex-grow-1'>
                    <input className="form-control" onChange={FileName} accept='.csv' type="file" id="formFile" required />
                  </div>
                  <div className='ms-5'>
                    <input className="form-control" placeholder='Enter Tag' onChange={tagName} value={tag} type="text" id="tagID" />
                  </div>
                  <div className=' ms-5'>
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
          <div className='mt-5'>
            <a href='http://127.0.0.1:8000/api/user/csvfile/' className='btn btn-success ms-1'>Download CSV</a>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  )
}

export default UploadFile;