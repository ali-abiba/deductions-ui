import './App.css';
import Layout from "./components/layout/layout";
import Login from "./components/login/login";
import 'bootstrap/dist/css/bootstrap.min.css';

import {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import {getEmployer} from "./services/employer.service";
import Home from "./components/home/home";

const cookies = new Cookies();
function App(props) {
    const [employer, setEmployer] = useState(null);
    const [employerId, setEmployerId] = useState(null);

    const handleLogIn = (employerData) => {
        setEmployer(employerData);
        cookies.set('employerId', employerData.id);
    };

    useEffect(() => {
        setEmployerId(cookies.get('employerId'));
        if(employerId) {
            getEmployer(employerId).then(response => {
                if(response.ok) {
                    return response.json();
                }
            }).then(data => {
                setEmployer(data)
            });
        }

    }, [employerId, employer]);

    return (
        <div className="App">
            {employerId && employer &&
            <Layout>
                <Home employer={employer}/>
            </Layout>
            }
            {!employerId &&
                <Login loginCallback={handleLogIn}/>
            }
        </div>
    );
}

export default App;
