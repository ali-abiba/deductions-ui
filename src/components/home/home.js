import EmployeeTable from "../employeeTable/employeeTable";

const Home = (props) => {
    return(
        <div>
            <h2>Employee data for {props.employer.employerName}</h2>
            <EmployeeTable employer={props.employer}/>
        </div>
    )
}

export default Home;
