import { useState } from 'react';
import './App.css';
import axios from 'axios'
import lo from './logo.png'

function App() {
  const [file, setFile] = useState(null);
  const [resultImage, setResultImage] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDownloadResult = () => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = 'result_image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleRemoveBackground = async () => {
    try {
      const formData = new FormData();
      formData.append('size', 'auto');
      formData.append('image_file', file);

      const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
        responseType: 'arraybuffer',
        headers: {
          'X-Api-Key': 'Bh5UYQpUAVMs6V4sJNrUYs5o',
        },
      });
      if (response.status !== 200) {
        console.error('Error:', response.status, response.statusText);
        return;
      }
      const blob = new Blob([response.data], { type: 'image/png' });
      setResultImage(URL.createObjectURL(blob));
    } catch (error) {
      console.error('Request failed:', error);
    }
  }

  return (
    <div className="container">
      <div className="lo">
        <p>
          <img classNagome='logo' src={lo} alt="" height="150px" />
        </p>
        <h1 className='txt1'>Made by Ansh</h1>
      </div>
      <h1 className="para">Remove your Image Background</h1>
      <div className="content">
        <input
          type="file"
          className='inp'
          id="fileInput"
          placeholder='Select Image'
          onChange={handleFileChange}
        />
        <label htmlFor="fileInput" className="inp-label"></label>

        <br />
        {resultImage && <img src={resultImage} className='result' alt="Result" />}
      </div>
      <div className="bttt">
        <div className="btns">
          <button className="button" onClick={handleRemoveBackground}>Remove</button>
        </div>
        <div className="btn">
          <button className="button" onClick={handleDownloadResult}>Download</button>
        </div>
      </div>
            <amp-auto-ads type="adsense"
        data-ad-client="ca-pub-7404340598249958">
</amp-auto-ads>
    </div>
  );
}

export default App;
