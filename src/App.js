
//      ------------------------ Important ----------------------

// --------- default api is limited to only 50 requests per day ---------
// ---- In order to really enjoy this application please use your own Api  ----
// ---- register yourself at https://newsapi.org/ and create your own ----
// ---- if you use the my(developer's) api that is limited for only around 50 api ----
// ---- requests per day. after that this website give the default news will not ----
// ---- work according to the user. only limited features will work ----
// ---- in order to enjoy its feature like search (custom news), changing country, ----
// ---- i highly recommend you to try these but with your own api if my api-key get exhausted ----
// ---- Thanks, Subhpreet Singh

//      ------------------------ Important ----------------------




import React, {useState,useEffect} from 'react';
import Navbar from './Components/Navbar';
import NewsContent from './Components/NewsContent';
import DisplayMsg from './Components/DisplayMsg';
import { BrowserRouter as Router, Switch, Routes, Route } from "react-router-dom";
import './App.css';


// parent of all components.
function App() {

  // default states for all components.
  const [country,setCountry] = useState('us');
  const [category,setCategory] = useState('sports');

  // this is the message that will be displayed to the user.
  const [displayDeveloporMessage, setDevMessage] = useState(true);
  
  
  // this function is specially made to naviagte with navbar component beacuse
  // our logic to change the country and category is coded in navbar. So, this will 
  // response if it get any changes from child(navbar) component.
  function changeCountryOrCategory(navCountry,navCategory){
    setCountry(navCountry);
    setCategory(navCategory);
    
  }

  // run the following if state get changed.
  useEffect(()=>{

    changeCountryOrCategory(country,category);
    
  }, [country,category])



  return (
    <>
      {displayDeveloporMessage && <DisplayMsg></DisplayMsg>}
      <Router> 
        <Navbar verify={changeCountryOrCategory} country={country} category={category}/>
        
        <Routes>

          <Route exact path='/' element={<NewsContent key={"general-"+country} country={country} category="general"/>}></Route>

          <Route exact path='/business' element={<NewsContent key={"business-"+country} country={country} category="business"/>}></Route>

          <Route exact path='/entertainment' element={<NewsContent key={"entertainment-"+country} country={country} category="entertainment"/>}></Route>

          <Route exact path='/health' element={<NewsContent key={"health-"+country} country={country} category="health"/>}></Route>

          <Route exact path='/science' element={<NewsContent key={"science-"+country} country={country} category="science"/>}></Route>

          <Route exact path='/sports' element={<NewsContent key={"sports-"+country} country={country} category="sports"/>}></Route>

          <Route exact path='/technology' element={<NewsContent key={"technology-"+country} country={country} category="technology"/>}></Route>

          <Route exact path='/everything/:content' element={<NewsContent key={"everthing-" + country} country={country} category="everything"/>}></Route>
  
        </Routes>

      </Router>
    </>
);
}

export default App;
