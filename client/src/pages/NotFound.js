import React from 'react'
import "./css/NotFound.css"

const NotFound = () => {
    return (

        <>
            <section class="error-container">
                <span class="four">
                    <span class="screen-reader-text">4</span>
                </span>
                <span class="zero">
                    <span class="screen-reader-text">0</span>
                </span>
                <span class="four">
                    <span class="screen-reader-text">4</span>
                </span>
            </section>
            <p class="zoom-area">
                <h1>
                    <b>Page Not Found!</b>
                </h1>
            </p>
            <div class="link-container">
                <a
                    href="/"
                    class="more-link"
                >
                    GO BACK
                </a>
            </div>
        </>

    )
}

export default NotFound;
