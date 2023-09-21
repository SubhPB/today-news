
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



import React,{useState,useEffect} from "react";
import LeftContent from './LeftContent';
import RightContent from './RightContent';
import { useParams } from "react-router-dom";

// this is the component will holds the left and right content components.
export default function NewsContent(props){

    // this will pass the state of country and category got through props to it's childs.
    const [country,setCountry] = useState(props.country);
    const [category,setCategory] = useState(props.category);

    // this state is for, if the user search for any news.= around the globe
    // and it will get the searched topic throgh the parameters given to the url.
    const {content} =useParams();

    return (
            <>
            <div id="news-content">
                {/* so left component is designed for advertisements or for main headlines */}
                {/* we will not pass content to it */}
                <LeftContent country={country}/>
                
                {/* remember to change left content */}

                {/* this focus on the user's content*/}
                <RightContent country={country} category={category} content={content}/>
                
            </div>
            
            </>
        );
}


