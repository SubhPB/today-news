//      ------------------------ Important ----------------------
// --------- default api is limited to only 50 requests per day ---------
// ---- In order to really enjoy this application please use your own Api  ----
// ---- register yourself at https://newsapi.org/ and create your own ----
// ---- if you use the my(developer's) api that is limited for only around 50 api ----
// ---- requests per day. after that this website give the default news will not ----
// ---- work according to the user. only limited features will work ----
// ---- in order to enjoy its feature like search (custom news), changing country, ----
// ---- i higlhly recommend you to try these but with your own api if my api-key get exhausted ----
// ---- Thanks, Subhpreet Singh

//      ------------------------ Important ----------------------




import React from "react";
import {Link} from 'react-router-dom';


// To make our application responsive. this will work for the small screens.
export default function MenuBar(){

    function madeClick(){
        var getElem = document.getElementById('about-me');
        getElem.click();
    }

    return (
    <div id="menubar">
        
        {/* Routing for the Mobiles */}

        <Link to='/business' style={{textDecoration: 'none'}}>< h3 className='category' id='business' >Business</h3></Link>

        <Link to='/entertainment' style={{textDecoration: 'none'}}><h3 className='category' id='entertainment' >Entertainment</h3></Link>

        <Link to='/health' style={{textDecoration: 'none'}}><h3 className='category' id='health' >Health</h3></Link>

        <Link to='/science' style={{textDecoration: 'none'}}><h3 className='category' id='science' >Science</h3></Link>

        <Link to='/sports' style={{textDecoration: 'none'}}><h3 className='category' id='sports' >Sports</h3></Link>

        <Link to='/technology' style={{textDecoration: 'none'}}><h3 className='category' id='technology' >Technology</h3></Link>

        {/* Routing End for the mobiles */}

        <h2 onClick={madeClick}><i class="ri-user-line"></i>About me</h2>
   </div>
    );
}