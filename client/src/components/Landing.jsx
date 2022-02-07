import React from "react";
import { Link } from "react-router-dom";
import '../styles/Landing.css';

export default function Landing() {
    return (
        <div className="landing">
            <div >
                <h1 className="landing-text" >Welcome to the Recipe App</h1>
                <h3>
                    <Link to="/home">
                        <button className="landing_button">Let's Taste!</button>
                    </Link>

                </h3>
            </div>
        </div>
    );
}