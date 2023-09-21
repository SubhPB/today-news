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


import React,{useState,useEffect} from "react";
import usFlag from '../images/flags/usFlag.jpg';
import inFlag from '../images/flags/indiaFlag.jpg';
import krFlag from '../images/flags//southkoreaFlag.jpg';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import MenuBar from "./MenuBar";
import AboutMe from './AboutMe';


function Navbar(props){

    const navigate = useNavigate();

    // tis is to change the country flag if user changes the country.
    const country_img = {
        'usFlag' : usFlag,
        'inFlag' : inFlag,
        'krFlag' : krFlag,
    };


    // states

    // state for country
    // however, default country is USA
    const [country,setCountry] = useState(props.country);

    // state to know the news category - example - business, sports, etc.
    const [category,setCategory] = useState(props.category);

    // state specific for current country
    const [current_country,setCurrentCountry] = useState(country_img[`${props.country}Flag`]);

    // this state is made for handling the menu bar for small screens to make the site responsiuve
    const [handleMenu,setHandleMenu] = useState(false);

    // if the user want to know about the user
    const [introduceDevloper,setIntroduceDeveloper] = useState(false);
    
    // this is very important to send the signal to the parent component that user had changed 
    // his country or category. after sending this siganl parent component can know to change 
    // it's state according to the modified category or country.
    function changeCountryOrCategory(curr_cntry,category){

        // this will be set the country according to the arguments passed in the function
        setCountry(String(curr_cntry));

        // this will be used to set the current country
        setCurrentCountry(country_img[curr_cntry + 'Flag']);

        // this will be used to set the category
        setCategory(category);

        // this is prop which linked to the parent component to
        // tell/verify that user had changed the country or category.
        props.verify(curr_cntry,category);

    };

    // this works on the search functionality.
    // suppose if the user search 'Vancouver' then it will
    // show the results related to Vancouver.
    function getSearchData(input){

        // using navigate to change the url without reloading the page.
        // it's paramenter looks like `/everything/:${input}`
        // because during routing that specfic component designed for  
        // handling search data will require the 'input' and 'everything'
        // in order to navigate with the Api from where this 
        navigate(`/everything/:${input}`,{replace:true});

    }

    useEffect(()=>{
        
        // if country or category get changed it informs that
        // this is time to remount the Component according to new props. 
        changeCountryOrCategory(props.country,props.category);
        navigate('/',{replace:true});
    },[props.country,props.category])



    // useEffect(()=>{
    //     getSearchData()
    // })


    // for the mobile screens if the user opened the menu-bar
    // and if he clicks somewhere else not inside the menu-bar.
    // it will disppear the menu box. just to user's good experience.

    const handleFeaturesOfMenu = (event) =>{
        
        // logic...
        var selectMenu = document.querySelector('#menu');
        
        if (!selectMenu.contains(event.target)){
            setHandleMenu(false);
        }
        else{
            if (handleMenu){
                setHandleMenu(false);
            }
            else{
                setHandleMenu(true);
            }
            
        }
         
    }

    // for mobile screens.
    // this do nothing more than to keep track of user's clicks
    // to add the functionalites.
    useEffect(()=>{
        
        // in order to close and display the menu-bar 
        window.addEventListener('click',(event)=>{
            handleFeaturesOfMenu(event);
        });

        
        return ()=>{
            window.removeEventListener('click',handleFeaturesOfMenu);
        }
    
    },[])


    // for user's experience so he can know in which route he is in.
    function highlightText(elem){
       
        var targetElement = document.querySelector(`#bottom-navbar #${elem.target.id}`)

        document.querySelectorAll("#bottom-navbar .category").forEach(neighbor => {
            neighbor.style.color = 'black';
        })

        targetElement.style.color = 'white';
    }

    // this is helping searchEveryThing() to know close and open the 
    // search-input bar for the user.
    var searchBtnActivated = false;

    // after user entered the search data. let's say 'Vancouver'.
    // this function will handle the search functionality.
    function searchEverything(){

    
        var inputbtnForMobiles  = document.querySelector('#bottom-navbar .search-signin .search-input');
        var inputbtnForLaptops  = document.querySelector('.search-signin .search-input');

        const list = [inputbtnForLaptops,inputbtnForMobiles]

        // to close and appear the input bar when the user click on 
        // search button
        if (searchBtnActivated){
            list.forEach(elem => {
                elem.style.display = 'none';
            })
            searchBtnActivated = false; 
        }

        // this will run after opening input and clicking it to be search.
        else{

            // adding some cool features.
            // and to response according to whatever the user is doing.
            list.forEach(elem => {
                elem.style.display = 'block';
                elem.focus();
                searchBtnActivated  = true
                elem.addEventListener('keypress', event => {
                
                if (event.key === 'Enter'){
                    
                    
                    var enteredData = elem.value;
                    // if user leave the input empty.
                    if(enteredData.length < 1){
                        elem.setAttribute('placeholder','what you are looking for?');
                    } 
                    // after a valid input.
                    else {
                        elem.style.display = 'none';
                        searchBtnActivated  = false; 
                        elem.value = '';   
                        // the following function will be responsible to change the route.
                        getSearchData(enteredData);
                    }
                }
             })

          })
            
        } 
    }

    // just a helping boolean value for displayDropDown()
    // to display the dropdown or categories of countries to select.
    var displayCountry = false;

    
    // this will display the dropdown if user want to change country.
    function displayDropDown(){
        var triggerDropContent = document.querySelector('.dropdown-content');
        if (displayCountry){
            triggerDropContent.style.display = 'none';
            
            displayCountry = false;
        }
        else{
            
            triggerDropContent.style.display = 'block';
            displayCountry = true;
        }

    }

    //if the user want to know about the developer(me)
    function aboutMe(){
        if (introduceDevloper){
            setIntroduceDeveloper(false);
        }
        else{
            setIntroduceDeveloper(true);
        }
        
    }

    // if the user click on logo it will take him to the root url.
    function takeToTheRoot(){
        navigate('/',{replace:true});
    }

    // our html content
    return (
        <>
        {/* upper-navbar content */}
        <div id="upper-navbar">
            <div onClick={takeToTheRoot} className="channel-logo">

                <img src="https://th.bing.com/th/id/OIP.1v2nqolZPqL5XEQT6kuExwHaHa?pid=ImgDet&w=179&h=179&c=7" alt="" />

                <h2><span>Ace</span>.news</h2>

                <img src="https://th.bing.com/th/id/OIP.1v2nqolZPqL5XEQT6kuExwHaHa?pid=ImgDet&w=179&h=179&c=7" alt="" />

            </div>

            <div className="search-signin">
                <input className='search-input'></input>
                <h3 className="searchbtn"  onClick={() => searchEverything()}><i class="ri-search-2-line"></i><span> Search</span></h3>
                <h3 id="about-me" onClick={aboutMe}><i class="ri-user-line"></i><span> About Me</span></h3>
            </div> 

            <h3 id='menu' ><i class="ri-menu-line"></i></h3>  
        </div>

        {/* End of upper-navbar content */} 

        {/* =========================== */}

        {/* start of bottom-navbar */}

        <div id="bottom-navbar">

            <h2><i class="ri-newspaper-fill"></i>REPORT</h2>

            {/* Routing Start */}

            <Link to='/business' style={{textDecoration: 'none'}}>< h3 className='category' id='business' onClick={(event) => highlightText(event)}>Business</h3></Link>

            <Link to='/entertainment' style={{textDecoration: 'none'}}><h3 className='category' id='entertainment' onClick={(event) => highlightText(event)}>Entertainment</h3></Link>

            <Link to='/health' style={{textDecoration: 'none'}}><h3 className='category' id='health' onClick={(event) => highlightText(event)}>Health</h3></Link>

            <Link to='/science' style={{textDecoration: 'none'}}><h3 className='category' id='science' onClick={(event) => highlightText(event)}>Science</h3></Link>

            <Link to='/sports' style={{textDecoration: 'none'}}><h3 className='category' id='sports' onClick={(event) => highlightText(event)}>Sports</h3></Link>

            <Link to='/technology' style={{textDecoration: 'none'}}><h3 className='category' id='technology' onClick={(event) => highlightText(event)}>Technology</h3></Link>

            {/* Routing End */}

            {/* thw following div will not be visible for mobile screens.we have different logic for them */}
            <div className="dropdown" onClick={displayDropDown}>
                <h3 className="dropbtn"><i class="ri-global-fill"></i> Country <i class="ri-arrow-drop-down-line"></i></h3>
                <div className="dropdown-content">
                    <h4 onClick={() => changeCountryOrCategory('us',category)}>US</h4>
                    <h4 onClick={() => changeCountryOrCategory('in',category)}>India</h4>
                    <h4 onClick={() => changeCountryOrCategory('kr',category)}>South Korea</h4>
                </div>
            </div>

            <div className="search-signin">
                <input className='search-input'></input>
                <h3 className="searchbtn"  onClick={() => searchEverything()}><i class="ri-search-2-line"></i><span></span></h3>
            </div> 
            
            <img src={current_country} alt="" />
            
        </div>
      
       
        {/* the following is only for mobile screens */}
        {handleMenu && <MenuBar/>}
        {introduceDevloper && <AboutMe/>}
        </>

        
    );

}



export default Navbar;