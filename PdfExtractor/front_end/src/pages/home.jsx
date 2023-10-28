import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import loadPDFAndRenderOnScreen from '../components/loadPDFAndRenderOnScreen';
import downloadPDF from '../components/downloadPDF';
import handleSelectedPages from '../components/handleSelectedPages';
import { Document, Page } from 'react-pdf';
import Button from 'react-bootstrap/Button';
import { CaretRightFill, CaretLeftFill } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import './home.css';
import img1 from '../images/img1.jpg';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [pdfPages, setPdfPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedPages, setSelectedPages] = useState([]);
  const [uri, setUri] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const [selectedSavedPdf, setSelectedSavedPdf] = useState('');
  const [isFromBackend, setIsFromBackend] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        if (selectedFile) {
          setLoading(true);
          setIsFromBackend(false);

          await loadPDFAndRenderOnScreen(
            selectedFile,
            setUri,
            setPdf,
            setTotalPages,
            setPdfPages,
            setLoading,
            showLogin,
            setShowLogin
          );
        }
      } catch (error) {
        setLoading(false);
      }
    };
    load();
  }, [selectedFile]);

  const handleDownload = async () => {
    await downloadPDF(selectedPages, uri);
  };

  const handleFileChange = (e) => {
    setCurrentPage(1);
    setPdf(null);
    setPdfPages([]);
    setSelectedPages([]);
    setTotalPages(0);

    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  function isPageSelected(currentPage, selectedPages) {
    if (!selectedPages) return false;
    for (let x = 0; x < selectedPages.length; x++) {
      if (selectedPages[x] === currentPage) return true;
    }
    return false;
  }

  return (
    <div>
      <Navbar />
      <p className="mainHead">PDF Data Extraction</p>
      <p className="subHead">
      Separate one page or a whole set for easy conversion into Single PDF files
      </p>

      <div className="image-container">
        <img src={img1} alt="img1" className="img1" />
        <label htmlFor="images" className="drop-container" id="dropcontainer">
          <span className="drop-title">Drop files here</span>
          <input
            className="input-file"
            type="file"
            id="images"
            onChange={handleFileChange}
            accept="application/pdf"
            required
          />
        </label>
      </div>

      {loading && <p>Loading...</p>}

      {pdfPages.length > 0 && !loading && (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <div className="pdf-display">
            <p>Select the page you want to download</p>
            <div className="d-flex justify-content-center align-items-center">
              <button onClick={() => goToPage(currentPage - 1)} className="cont-btn"><CaretLeftFill /></button>

              <div className="position-relative">
                <img
                  className="pdf-image"
                  src={pdfPages[currentPage - 1]}
                  alt={`Page ${currentPage}`}
                />
                <Form.Check
                  style={{
                    position: 'absolute',
                    border: '1px solid black',
                    borderColor: 'black',
                    top: '4%',
                    right: '2%',
                    backgroundColor: 'white',
                    color: 'green',
                  }}
                  aria-label="option 1"
                  onChange={(e) => {
                    handleSelectedPages(e.target.checked, selectedPages, currentPage, setSelectedPages);
                  }}
                  checked={isPageSelected(currentPage, selectedPages)}
                />
              </div>
              <button onClick={() => goToPage(currentPage + 1)} className="cont-btn"><CaretRightFill /></button>
            </div>
            <div>
              <label
                htmlFor="pageNumber"
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginLeft: '20px',
                  marginRight: '15px',
                  color: '#fff',
                  marginTop: '20px',
                }}
              >
                {'Page number:    '}
              </label>
              <select
                marginY="8"
                marginX="5"
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  border: '1px solid black',
                  borderColor: 'black',
                  padding: '6px',
                }}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                value={currentPage}
                id="pageNumber"
              >
                {pdfPages.map((page, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="center-container1">
        <button
          style={{
            display: selectedPages.length ? 'block' : 'none',
          }}
          className="dwd-btn"
          onClick={handleDownload}
        >
          <span>Download</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
