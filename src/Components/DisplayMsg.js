import React from "react";


// Nothing special here.
export default function DisplayMsg(){

    const styles = {
        position : 'fixed',
        display: 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'space-between',
        minHeight: '40%',
        maxHeight: 'fit-content',
        width : '75%',
        backgroundColor : 'white',
        zIndex : 10,
        border: "1.5px solid black",
        borderRadius: "10px",
        transform : "translate(16%,40%)",
    }

    const divMessageHead = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'fit-content',
        width: '100%',
        padding: '4px',
        color: 'red',
        cursor: 'pointer',
    }

    const divMessage = {
        minHeight: '75%',
        maxHeight: 'fit-content',
        width: '95%',
        fontSize : 'small',
        fontWeight: '700',
        inLineSize : 'auto',
        textAlign: 'center',
        border: '1px solid black',
        borderRadius: '10px',
        padding: '20px',
    }

    const myh5 = {
        height: 'fit-content',
        width: '100%',
        textAlign: 'right',
        padding: '2px 5px',
        fontWeight: '700',
        opacity: '0.9',
    }

    function removeMsg(){
        var targetDiv = document.querySelector('#div-message');

        targetDiv.style.display = 'none';

        var getElem = document.getElementById('about-me');
        getElem.click();

    }

    return (
        <>
        <div id="div-message" style={styles}>
            <div id="div-message-head" style={divMessageHead}>
               <h3><i class="ri-megaphone-line"></i> Important!</h3>

               <h3 style={{color:'black'}} onClick={removeMsg}><i class="ri-close-line"></i></h3>
            </div>
            
            <div id="div-message" style={divMessage}>
                <p>
                    
                I hope you will really enjoy this news web application. But be advised that
                the default API is limited to only 50 requests per day.
                In order to really enjoy this application, please use your own API.
                Register yourself at <a href='https://newsapi.org/'>https://newsapi.org/</a> and create your own.
                If you use my (developer's) API, it is limited to only around 50 API 
                requests per day. After that, this website will give the default news feed which will not 
                work according to the user. Only limited features will work.
                In order to enjoy its key features like search (custom news), changing country, 
                I highly recommend you to try these key features but with your own API if my API key gets exhausted.
                Please share your experience (feedback) and send it to my email if you liked my hardwork.

                 </p>
            </div>
            <div id="myh5" style={myh5}>
                <h5>- Thanks, subhpreet</h5>
            </div>
           
        </div>
        </>
    );
}