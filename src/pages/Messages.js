import React, {Component, useEffect, useState} from "react";
import axios from "axios"
import {Link, useParams} from "react-router-dom";
import {getMessage} from "@testing-library/jest-dom/dist/utils";

export default function Messages(props) {
    let email = useParams()
    const [emailMessages, setEmailMessages] = useState([]);
    const [emails, setEmails] = useState([]);

    function getEmailMessages () {
        const token = localStorage.getItem("user_token");
        if (token) {
            axios.get(
                process.env.REACT_APP_BACKEND_BASE_URL +
                '/api/emails/' +
                email.id +
                '/messages',
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            ).then(response => {
                setEmailMessages(response.data.messages)
                setEmails(response.data)
            })
        } else {
            window.location = '/'
        }
    }

    useEffect(() => {
        getEmailMessages()
    }, []);


    return (
        <div>
            <h1>Messages</h1>
            <Link to={"/emails"}>Go back</Link>
            <h3>
                Emails Sent to { emails.email }
            </h3>
            <ul className={"list-group"}>
                {
                    emailMessages.map((e) => {
                        return <li className={"list-group-item"} key={e.id}>
                            {e.value}

                        </li>
                    })
                }
            </ul>


        </div>
    )
}