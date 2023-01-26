import { useEffect, useRef, useState } from "react";

const EditContent = (prop) => {
  const {
    editContent,
    setEditContent,
    setIsEditContent,
    data,
    // setData,
    toast,
  } = prop;

  const [editButton, setEditButton] = useState(false);
  const count = useRef(0);
  const prevObj = useRef({});
  useEffect(() => {
    count.current += 1;
    if (count.current > 2) {
      setEditButton(true);
    }
    // console.log(count);
    if (JSON.stringify(prevObj.current) !== JSON.stringify(editContent)) {
      //   console.log("obj changed", editContent);
      prevObj.current = editContent;
    }
  }, [editContent]);

  const upDatedData = () => {
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(editContent.first.split(" ").join(""))) {
      toast("Please Enter First Name");
      return;
    }
    if (!nameRegex.test(editContent.last.split(" ").join(""))) {
      toast("Please Enter Last Name");
      return;
    }
    if (editContent.email === "") {
      toast("Please Enter Email");
      return;
    }
    if (editContent.description === "") {
      toast("Please Enter Description");
      return;
    }
    if (isNaN(editContent.dob.split("-").join(""))) {
      toast("Please Enter Birth Year");
      return;
    }

    if (!nameRegex.test(editContent.country.split(" ").join(""))) {
      toast("Please Enter Country");
      return;
    }
    setIsEditContent(false);
    const index = data.findIndex((item) => {
      return item.id === editContent.id;
    });

    data[index] = editContent;

    toast("Data Successfully Updated");
  };

  return (
    <div>
      <div className="inner-list-container">
        <ul className="Edit-container">
          <div className="inner-upper-container">
            <img
              className="edit-profile-img"
              src={editContent.picture}
              alt=""
            />
            <h2>
              <input
                className="first-name"
                type="text"
                value={editContent.first}
                placeholder="Enter First Name"
                onChange={(e) =>
                  setEditContent({ ...editContent, first: e.target.value })
                }
              />
              <input
                className="last-name"
                type="text"
                value={editContent.last}
                placeholder="Enter Last Name"
                onChange={(e) =>
                  setEditContent({ ...editContent, last: e.target.value })
                }
              />
            </h2>
          </div>
          <div className="inner-middle-container-accordion edit-middle-cont">
            <li>
              <p className="edit-p-tag">DOB</p>
              <input
                type="text"
                value={editContent.dob}
                placeholder="Enter Birth Year"
                onChange={(e) =>
                  setEditContent({ ...editContent, dob: e.target.value })
                }
              />
            </li>
            <li>
              <p className="edit-p-tag">Gender</p>
              <select
                onChange={(e) =>
                  setEditContent({ ...editContent, gender: e.target.value })
                }
                name="gender-names"
                id=""
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="Transgender">Transgender</option>
                <option value="Rather Not Say">Rather Not Say</option>
                <option value="Other">Other</option>
              </select>
            </li>
            <li>
              <p className="edit-p-tag">Country</p>
              <input
                type="text"
                value={editContent.country}
                placeholder="Enter Country"
                onChange={(e) =>
                  setEditContent({ ...editContent, country: e.target.value })
                }
              />
            </li>
          </div>
          <div className="inner-description-container-accordion">
            <input
              className="edit-email-id"
              type="email"
              placeholder="Enter Email id"
              value={editContent.email}
              onChange={(e) =>
                setEditContent({ ...editContent, email: e.target.value })
              }
            />
            <textarea
              rows="3"
              cols="50"
              value={editContent.description}
              onChange={(e) =>
                setEditContent({ ...editContent, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className="Edit-btn-container">
            <img
              onClick={() => setIsEditContent(false)}
              className="Edit-cancel-btn"
              src="https://cdn-icons-png.flaticon.com/512/399/399274.png"
              alt=""
            />
            {editButton ? (
              <img
                onClick={() => upDatedData()}
                className="Edit-done-btn"
                src="https://cdn-icons-png.flaticon.com/512/4436/4436481.png"
                alt=""
              />
            ) : (
              ""
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default EditContent;
