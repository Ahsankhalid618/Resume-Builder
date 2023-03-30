import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";

const Home = ({ setResult }) => {
  const [fullName, setFullName] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [currentLength, setCurrentLength] = useState(1);
  const [currentTechnologies, setCurrentTechnologies] = useState("");
  const [headshot, setHeadshot] = useState(null);
  const [companyInfo, setCompanyInfo] = useState([{ name: "", position: "" }]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddCompany = () =>
    setCompanyInfo([...companyInfo, { name: "", position: "" }]);

  const handleRemoveCompany = (index) => {
    const list = [...companyInfo];
    list.splice(index, 1);
    setCompanyInfo(list);
  };
  const handleUpdateCompany = (e, index) => {
    const { name, value } = e.target;
    const list = [...companyInfo];
    list[index][name] = value;
    setCompanyInfo(list);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("headshotImage", headshot, headshot.name);
    formData.append("fullName", fullName);
    formData.append("currentPosition", currentPosition);
    formData.append("currentLength", currentLength);
    formData.append("currentTechnologies", currentTechnologies);
    formData.append("workHistory", JSON.stringify(companyInfo));
    axios
      .post("http://localhost:4000/resume/create", formData, {})
      .then((res) => {
        if (res.data.message) {
          setResult(res.data.data);
          navigate("/resume");
        }
      })
      .catch((err) => console.error(err));
  };
  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="app">
        <div className="main">
          <h1>Resume Builder</h1>
          <h4>Emdedded with ChatGpt3 </h4>

          <form
            onSubmit={handleFormSubmit}
            method="POST"
            encType="multipart/form-data"
          >
            <fieldset className="field">
              <legend className="legend">Personal Information </legend>

              <label htmlFor="fullName">Full Name :</label>
              <input
                type="text"
                required
                name="fullName"
                id="fullName"
                value={fullName}
				placeholder="Enter your Full Name"
                onChange={(e) => setFullName(e.target.value)}
              />
              <div className="nestedContainer">
                <div>
                  <label htmlFor="currentPosition">Profession :</label>
                  <input
                    type="text"
                    required
                    name="currentPosition"
                    className="currentInput"
                    value={currentPosition}
					placeholder="e.g; Software Engineering"
                    onChange={(e) => setCurrentPosition(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="currentLength">Experience (In Years) :</label>
                  <input
                    type="number"
                    required
                    name="currentLength"
                    className="currentInput"
                    value={currentLength}
                    onChange={(e) => setCurrentLength(e.target.value)}
                  />
                </div>
                
              </div>
			  <label htmlFor="currentTechnologies">Technologies :</label>
                  <input
                    type="text"
                    required
                    name="currentTechnologies"
                    className="currentInput"
                    value={currentTechnologies}
					placeholder="React, Angular, Flutter etc;"
                    onChange={(e) => setCurrentTechnologies(e.target.value)}
                  />
              <label htmlFor="photo">Upload Your Image</label>
              <input
                type="file"
                name="photo"
                required
                id="photo"
                accept="image/x-png,image/jpeg"
                onChange={(e) => setHeadshot(e.target.files[0])}
              />
            </fieldset>
			<fieldset className="field1">
				<legend className="legend1">
				Work Experience
				</legend>
			
            

            {companyInfo.map((company, index) => (
              <div className="nestedContainer" key={index}>
                <div className="companies">
                  <label htmlFor="name">Company :</label>
                  <input
                    type="text"
                    name="name"
                    required
					placeholder="Sync Intern's"
                    onChange={(e) => handleUpdateCompany(e, index)}
                  />
                </div>
                <div className="companies">
                  <label htmlFor="position">Designation :</label>
                  <input
                    type="text"
                    name="position"
                    required
					placeholder="e.g; App Developer"
                    onChange={(e) => handleUpdateCompany(e, index)}
                  />
                </div>

                <div className="btn__group">
                  {companyInfo.length - 1 === index &&
                    companyInfo.length < 4 && (
                      <button id="addBtn" onClick={handleAddCompany}>
                        +
                      </button>
                    )}
                  {companyInfo.length > 1 && (
                    <button
                      id="deleteBtn"
                      onClick={() => handleRemoveCompany(index)}
                    >
                      Del
                    </button>
                  )}
                </div>
              </div>
            ))}
			</fieldset>

            <button>CREATE RESUME</button>
          </form>
        </div>
      </div>
    );
  }
};

export default Home;
