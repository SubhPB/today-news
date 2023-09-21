
//      ------------------------ Important ----------------------
// --------- default api is limited to only 50 requests per day ---------
// ---- In order to really enjoy this application please use your own Api  ----
// ---- register yourself at https://newsapi.org/ and create your own ----
// ---- if you use the my(developer's) api that is limited for only around 50 api ----
// ---- requests per day. after that this website give the default news will not ----
// ---- work according to the user. only limited features will work ----
// ---- in order to enjoy its feature like search (custom news), changing country, ----
// ---- i highly recommend you to try these features but with your own api if my api-key get exhausted ----
// ---- Thanks, Subhpreet Singh

//      ------------------------ Important ----------------------



import React,{useState,useEffect,Proptypes} from "react";
import callBackData from '../copied.json';


const API_KEY = process.env.REACT_APP_MY_API_KEY;




// So, this will be content that will display on left side for big screens
// can be used to show the main headlines or Advertisements to the user. Also,
// for the small screens this will be at the top of right content rather to be at left.

function LeftContent (props){

    // state for country to know what data of which country will be displayed.
    const [country,setCountry] = useState(props.country);

    // Carefull!. to reduce the number of api requests rather to fetch 8 articles from api
    // we will fetch maximum number of articles which are 100 at one time. after getting 100 
    // articles the following state 'articleSupplier' store these and will supply the 8 articles to our state named 'articles'
    // which will be displayed to the user at one page. this will also help in pagination.
    const [articleSupplier,setArticleSupplier] = useState([''],);

    // it depends on the articleSupplier to display the data.
    const [articles,setArticles] = useState(['',]);

    // handle the page number(pagination state) 
    const [pagination,setPagination] = useState({});

    // work until the data is not fetched
    const [runLoadBar,setRunLoadBar] = useState(true);

    // this state will be used for the pagination to record the maximum pages possible.
    const [recorder,setRecorder] = useState(0);

    // this function will fetch the data from api and manipulate the default states.
    const getLeftContent = async() => {

        let url;

        let response;

        // making request.
        try{
            url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}&pageSize=100`;
            let data = await fetch(url);
            response = await data.json();
            
            // this is function which will change the state according to the response of the request.
            readyToDisplay(response);
        }

        // if request failed or if we exceeds the limit of api requests per day.
        catch(error){
            // 'callBackData' this is stored json file will give the demo of application.
            response = callBackData;

            // this function will handle the states now.
            readyToDisplay(response);
        }

        // after the response of request this will be called.
        function readyToDisplay(response){

            // so parameter have the data of our request.

            // we are filtering the data to avoid the articles without images to enchance user experience.
            let filtered_data = response.articles.filter( elem => elem.urlToImage !== null);
            
            // now filtered data will be passed to the ArticleSupplier. suppose if got 100 articles all will be stored in it.
            setArticleSupplier(filtered_data);

            // according to the number of articles we got we will write our pagination logic.
            // because only 4 articles are allowed at one time.
            setPagination({
                // how many articles we got.
                totalArticles : filtered_data.length,
                // set the maximum limit of pages if one page can hold 4 news in this component.
                limitOfPages: Math.ceil(filtered_data.length / 4),
                // Obviously, we will land the user to the first page.
                currentPage: 1,

                // so the articles with index ranging from the 0 to 4 will be displayed first.
                startingIndex: 0,
                endingIndex: 4,
            });

            // stop the running loading bar.
            setRunLoadBar(false);

            // this will help us pagination's logic.
            setRecorder(Math.ceil(filtered_data.length / 4));
        }
    
    }

    // this is what will mount after the rendering.
    useEffect(()=>{
        
        getLeftContent();

    },[]);

    // in this we are saying if any changes occurs in pagination.
    // then we will change the state of articles. So articles will be different on each page.
    useEffect(() => {
        // so we will display four articles according to their index which depends on the current page.
        setArticles(articleSupplier.slice(pagination.startingIndex,pagination.endingIndex));

    },[pagination]);


    // So the news on this component will be changed automatically after 12 seconds.
    // this will be useful, if we want to display advertisements.
    useEffect(()=>{
        
        const intervalfunc = setInterval(updateNews,12000);

        // to avoid the unexpected behavior caused by setInterval. 
        return () => clearInterval(intervalfunc);
       
        // this will be called every time whenever the articles are changed on the window.
        // when articles get changed it will run again (infinitely) after every 12 seconds.
    },[articles])


    // to update the news on UI.
    function updateNews() {

        // changing pagination state if we want to jump to another state.


        // this will ensures that we never go out of the page limit.
        // is if are going to exceed it will restart the state from begininng.
        if (pagination.currentPage >= recorder){

            setPagination(() => ({
                // restarting everything because limit is over.
                totalArticles: pagination.totalArticles,
                limitOfPages: pagination.limitOfPages,
                currentPage: 1,
                startingIndex: 0,
                endingIndex: 4,
            }))

        }
        // so if we are inside the limit.
        else{

                setPagination(() => ({
                    totalArticles: pagination.totalArticles,
                    limitOfPages: pagination.limitOfPages,
                    // updating the state of current page, starting and ending index of articles.
                    currentPage: pagination.currentPage + 1,
                    startingIndex: pagination.startingIndex + 4,
                    endingIndex: pagination.endingIndex + 4,
                }))
        }
    };

    // if user want to explore the news or user clicked on any news.
    const handlePage = (url) => {
        window.open(url,'_blank')
    }
    
    // when the api request is completed.
    if (!runLoadBar){
        return (
            // this will be displayed in the left comoponent.
            <div id="left-content">
                {articles.map((val,index) => {
                    return (
                    <div className="big-card" key={index} onClick={() => handlePage(val.url)}>
                        <img src={val.urlToImage} alt="" />
                        <div className="big-card-headlines">
                        <h5>{val.title}</h5>
                        </div>
                        <p>...</p>
                    </div>
                    );
                })}
            </div>
        );
    }

    // the time while our request is processing we will display the loading bar.
    else{
        return (
        <div id='left-content'>
            <iframe key={'iframe-2'} id='loading-bar' src="https://giphy.com/embed/17mNCcKU1mJlrbXodo" width="200" height="200" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
        </div>
        );
    }


}


export default LeftContent;

