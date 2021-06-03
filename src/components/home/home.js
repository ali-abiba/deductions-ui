import EmployeeTable from "../employeeTable/employeeTable";
import Cookies from "universal-cookie/lib";

import Button from "react-bootstrap/Button";

const Home = (props) => {

    return(
        <div>
            <div className="row m-4">
                <h2>Employee data for {props.employer.employerName}</h2>
            </div>
            <EmployeeTable employer={props.employer}/>
        </div>
    )
}

export default Home;
