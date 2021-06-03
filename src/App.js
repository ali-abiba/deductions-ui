import './App.css';
import Login from "./components/login/login";
import 'bootstrap/dist/css/bootstrap.min.css';

import {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import {getEmployer} from "./services/employer.service";
import Home from "./components/home/home";
import Button from "react-bootstrap/Button";

const cookies = new Cookies();

function App(props) {
    const [employer, setEmployer] = useState(null);
    const [employerId, setEmployerId] = useState(null);

    const handleLogIn = (employerData) => {
        setEmployer(employerData);
        cookies.set('employerId', employerData.id);
    };

    const logout = () => {
        cookies.remove('employerId');
        setEmployer(null);
        setEmployerId(null);
    }

    useEffect(() => {
        setEmployerId(cookies.get('employerId'));
        if (employerId) {
            getEmployer(employerId).then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then(data => {
                setEmployer(data)
            });
        }

    }, [employerId]);

    return (
        <div className="App">
            {employer &&
            <div>
                <Button className="float-right m-1" onClick={logout}>Logout</Button>
                <Home employer={employer}/>
            </div>
            }
            {!employer &&
            <Login loginCallback={handleLogIn}/>
            }
        </div>
    );
}

export default App;
