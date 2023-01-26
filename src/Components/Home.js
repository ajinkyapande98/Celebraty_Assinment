import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CelebritiesJson from "./celebrities.json";
import DeleteButton from "./DeleteConf";
import EditContent from "./EditContent";

const Home = () => {
  // Hooks
  const [data, setData] = useState(CelebritiesJson);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [editContent, setEditContent] = useState([]);
  const [isEditContent, setIsEditContent] = useState(false);
  const [accordion, setAccordion] = useState(-1);

  //   For Search
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    if (searchTerm === "") {
      setData(CelebritiesJson);
    }
  }, [searchTerm]);
  const handleDeleteYes = (id) => {
    setIsDelete(true);
    setDeleteId(id);
  };
  const handleDelete = (id) => {
    const afterDetele = data.filter((item) => {
      return item.id !== id;
    });
    setData(afterDetele);
    toast("Successfully Deleted");
    setIsDelete(false);
  };
  const calculateAge = (dob) => {
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const editCelebData = (id, age) => {
    if (age < 18) {
      toast("Selected Person is Not Adult");
      return;
    }
    setIsEditContent(true);
    data.map((item) => {
      if (item.id === id) {
        setEditContent(item);
        return item;
      }
      return item;
    });
    // console.log(id, age);
  };

  //   Search Function

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setData(
      data.filter((item) =>
        item.first.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };
  //   console.log(accordion);

  return (
    <div className="list-container">
      <div className="search-container">
        <input
          className="searching-input"
          type="text"
          placeholder="Search by Name..."
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      {data.map((item, ind) => {
        return (
          <div className="inner-list-container" key={item.id}>
            <ul
              className={
                accordion === item.id
                  ? "inner-unorder-list-accordion"
                  : "inner-unorder-list"
              }
            >
              <div className="inner-upper-container">
                <img className="profile-img" src={item.picture} alt="" />
                <h2>
                  Name:- {item.first} {item.last}
                </h2>
              </div>
              <div
                className={
                  accordion === item.id
                    ? "inner-middle-container-accordion"
                    : "inner-middle-container"
                }
              >
                <li>
                  <b>Age</b>
                  <br />
                  {calculateAge(item.dob)}
                </li>
                <li>
                  <b>Gender</b>
                  <br />
                  {item.gender}
                </li>
                <li>
                  <b>Country</b> <br />
                  {item.country}
                </li>
              </div>
              <div
                className={
                  accordion === item.id
                    ? "inner-description-containe-accordion"
                    : "inner-description-container"
                }
              >
                <p>
                  <b>Email: </b>
                  {item.email}
                </p>
                <b>Description</b>
                <p>{item.description}</p>
              </div>
              {isEditContent ? (
                ""
              ) : (
                <div
                  className={
                    accordion === item.id
                      ? "inner-lower-container-accordion"
                      : "inner-lower-container"
                  }
                >
                  <img
                    className="edit-btn"
                    onClick={() =>
                      editCelebData(item.id, calculateAge(item.dob))
                    }
                    src="https://cdn-icons-png.flaticon.com/512/5996/5996831.png"
                    alt=""
                  />
                  <img
                    className="delete-btn-confirmaton"
                    onClick={() => handleDeleteYes(item.id)}
                    src="https://cdn-icons-png.flaticon.com/512/9448/9448340.png"
                    alt=""
                  />
                </div>
              )}
              {isEditContent ? (
                ""
              ) : accordion > 0 ? (
                <img
                  className="colapse-btn"
                  onClick={() => setAccordion(-1)}
                  src={
                    accordion === item.id
                      ? "https://cdn-icons-png.flaticon.com/512/2550/2550327.png"
                      : "https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
                  }
                  alt=""
                />
              ) : (
                <img
                  className="colapse-btn"
                  onClick={() => setAccordion(item.id)}
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
                  alt=""
                />
              )}
            </ul>
          </div>
        );
      })}
      {isDelete ? (
        <DeleteButton
          setIsDelete={setIsDelete}
          deleteId={deleteId}
          handleDelete={handleDelete}
        />
      ) : (
        ""
      )}

      {isEditContent ? (
        <EditContent
          editContent={editContent}
          setEditContent={setEditContent}
          data={data}
          setData={setData}
          setIsEditContent={setIsEditContent}
          toast={toast}
        />
      ) : (
        ""
      )}

      <ToastContainer />
    </div>
  );
};

export default Home;
