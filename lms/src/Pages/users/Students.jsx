import Navbar from "./Navbar";
import { Link as RouterLink } from "react-router-dom";
import { Card, Button, Tag } from "antd";
import { Input, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
const { Search } = Input;
const { Option } = Select;
export default function StudentsDashboard() {
  // const user_id = sessionStorage.getItem("lmscurrentstudent");
  // const [userlectures, setUserLectures] = useState([]);
  // const [showDataFilter, setShowDataFilter] = useState([]);
  // const getUsersCourses = () => {
  //   axios
  //     .get(`https://lmshub.vercel.app/api/users/users`)
  //     .then((res) => {
  //       const users = res.data;
  //       const user = users.find((user) => user._id === user_id);
  //       if (user) {
  //         axios
  //           .get(`https://lmshub.vercel.app/api/lectures`)
  //           .then((res) => {
  //             const lectures = res.data;
  //             const matchedLectures = lectures.filter((lecture) =>
  //               user.courses.some((course) => course === lecture.lectureName)
  //             );
  //             // console.log(matchedLectures);
  //             setUserLectures(matchedLectures);
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // Funcationalaties
  // const handleSearch = (value) => {
  //   const searchTerm = value.toLowerCase();
  //   const searchResult = userlectures.filter(
  //     (lecture) =>
  //       lecture.instructorName.toLowerCase().includes(searchTerm) ||
  //       lecture.lectureName.toLowerCase().includes(searchTerm)
  //   );
  //   console.log("Search result:", searchResult);
  //   setShowDataFilter(searchResult);
  // };

  const user_id = sessionStorage.getItem("lmscurrentstudent");
  const [userlectures, setUserLectures] = useState([]);
  const [showDataFilter, setShowDataFilter] = useState([]);
  const [coursesName, setCourseName] = useState([]);
  const [instructorName, setInstructorName] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  useEffect(() => {
    const getUsersCourses = () => {
      axios
        .get(`https://lmshub.vercel.app/api/users/users`)
        .then((res) => {
          const users = res.data;
          const user = users.find((user) => user._id === user_id);
          if (user) {
            axios
              .get(`https://lmshub.vercel.app/api/lectures`)
              .then((res) => {
                const lectures = res.data;
                const matchedLectures = lectures.filter((lecture) =>
                  user.courses.some((course) => course === lecture.lectureName)
                );
                setUserLectures(matchedLectures);
                setShowDataFilter(matchedLectures); // Show all lectures initially
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUsersCourses();
  }, [user_id]);

  useEffect(() => {
    axios
      .get(`https://lmshub.vercel.app/api/courses/courses`)
      .then((res) => {
        setCourseName(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`https://lmshub.vercel.app/api/lectures`)
      .then((res) => {
        setInstructorName(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Search--Filter
  const handleSearchAndFilter = (searchTerm, filterTerm) => {
    const search = searchTerm.toLowerCase();
    const filter = filterTerm.toLowerCase();

    const searchResult = userlectures.filter(
      (lecture) =>
        lecture.instructorName.toLowerCase().includes(search) ||
        lecture.lectureName.toLowerCase().includes(search)
    );

    const combinedResult = searchResult.filter(
      (lecture) =>
        lecture.instructorName.toLowerCase().includes(filter) ||
        lecture.lectureName.toLowerCase().includes(filter)
    );

    setShowDataFilter(combinedResult);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    handleSearchAndFilter(value, filterTerm);
  };

  const handleFilterChange = (value) => {
    setFilterTerm(value);
    handleSearchAndFilter(searchTerm, value);
  };

  return (
    <div>
      <Navbar />

      <div
        style={{
          width: "75%",
          margin: "50px auto",
          borderRadius: "10px",
          backgroundColor: "#fff",
          padding: "10px",
          height: "100%",
        }}
      >
        <div
          className="search_filter"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <Search
            placeholder="Search..."
            style={{
              width: 300,
              marginRight: 20,
              fontSize: 20,
            }}
            onChange={(e) => handleSearch(e.target.value)}
          />

          <Select
            placeholder="Select Course"
            style={{ width: 200, fontSize: 16, marginRight: 20 }}
            onChange={handleFilterChange}
          >
            {coursesName.map((ele, i) => (
              <Option key={i} value={ele.name}>
                {ele.name}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Filter"
            style={{ width: 200, fontSize: 16 }}
            onChange={handleFilterChange}
          >
            {instructorName.map((ele, i) => (
              <Option key={i} value={ele.instructorName}>
                {ele.instructorName}
              </Option>
            ))}
          </Select>
        </div>

        {showDataFilter.length > 0 ? (
          showDataFilter.map((ele, i) => (
            <Card key={i} className="horizontal-card" hoverable>
              <div className="card-content">
                <div className="image-container">
                  <img
                    className="image_container_image"
                    alt="image"
                    src="https://students.masaischool.com/static/media/openBookImage.95b8e8b4378306339c056f175c2f9b66.svg"
                  />
                </div>
                <div className="details">
                  <h3>
                    {ele.lectureTitle}{" "}
                    <Tag color="volcano">{ele.instructorName}</Tag>
                  </h3>
                  <Tag style={{ fontSize: "15px" }} color="cyan">
                    {ele.lectureName}
                  </Tag>
                  <Tag className="timing">
                    {ele.startTime} - {ele.endTime}
                  </Tag>
                </div>
                <div className="join-button">
                  <RouterLink target="_blank" to={ele.classLink}>
                    <Button type="primary">Join</Button>
                  </RouterLink>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "20px", color: "#999" }}>
            <img
              src="https://i.pinimg.com/564x/8b/7e/65/8b7e65332e15477927f2650c480b2e08.jpg"
              alt="No lectures today"
              style={{ maxWidth: "200px", marginBottom: "10px" }}
            />
            <div style={{ fontSize: "30px" }}>No lectures today</div>
          </div>
        )}
      </div>
    </div>
  );
}
