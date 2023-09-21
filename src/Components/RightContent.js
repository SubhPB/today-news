
//      ------------------------ Important ----------------------
// --------- default api is limited to only 50 requests per day ---------
// ---- In order to really enjoy this application please use your own Api  ----
// ---- register yourself at https://newsapi.org/ and create your own ----
// ---- if you use the my(developer's) api that is limited for only around 50 api ----
// ---- requests per day. after that this website give the default news will not ----
// ---- work according to the user. only limited features will work ----
// ---- in order to enjoy its feature like search (custom news), changing country, ----
// ---- i highly recommend you to try these features but with your own api if my api-key get exhausted ----
// ----                     -Thanks, Subhpreet Singh

//      ------------------------ Important ----------------------



import React,{useState,useEffect} from "react";
import callBackData from '../copied.json';

const API_KEY = process.env.REACT_APP_MY_API_KEY;


// if you understood how the left component is working this component work almost the same but,
// with little difference like type of content, more feartures etc.

// for the mobile screens it will be displayed under the left component rather to be at right side.
function RightContent(props) {

    // this boolean state will help us to know if the api request got a response.
    const [boolean,setBoolean] = useState(false);

    // the articles which will be displayed on UI.
    // initially we have no articles.
    const [articles,setArticles] = useState(['',])

    // state for country and category
    const [country,setCountry] = useState(props.country);
    const [category,setCategory] = useState(props.category);

    // this state handle the pagination.
    const [pagination,setPagination] = useState({
        // initially we have 0 limit of pages because number of articles is zero.
        limitOfPages: 0,
        // default, it will land the user to first page.
        currentPage: 1,
        // which article according to it's index will be at the top.
        currentArticleIndex: 1,
    });


    // function to get the data from api.
    const getRightContent = async() => {

        let response;

        try {

            let url;
            // before making request the knowing what kind of data user wants.

            // props.content will hold some value if user make search.
            if (props.content == null){
               // here we know user did not make any search. so the data according to the country and category will be requested. 
               url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}&pageSize=100`;
            }
            else{
                // if user search about something we need the value of what the user searched and the category.
               url = `https://newsapi.org/v2/${category}?q=${props.content}&apiKey=${API_KEY}&pageSize=100`
            }
            // let's make the request.
            let data = await fetch(url);
            response = await data.json();

            // readyToDisplay will do the rest of our job
            readyToDisplay(response);
        }
        // if the request got cancelled or rejected.
        catch (error){
            // callBackData is default stored json file to give the demo of this site.
            response = callBackData;
            
            readyToDisplay(response);
        }
        
        
        function readyToDisplay(response){
            // filtering data as we did in left Component.
            let responseArticles = response.articles.filter(item => item.urlToImage !== null);

            // update the state of articles.
            setArticles(responseArticles);
    
            // update the state of pagination according to the number of articles we got.
            setPagination({
                // so, per page we will show maximum 8 news on left side
                limitOfPages : Math.ceil(responseArticles.length / 7),
                currentPage : pagination.currentPage,
                currentArticleIndex: pagination.currentArticleIndex,
            });

            setCountry(country);

            setCategory(category);
            
            // so following boolean state means that we got the response from api.
            setBoolean(true);
        }
    
    };

    // if user wants to go next, previous or on any other page.
    // val holds the page number where user wnats to go.
    function handlePage(val){
        
        setPagination({
            limitOfPages: pagination.limitOfPages,
            // so the current page will the page selected by the user.
            currentPage: val,
            // for the next page change the index of articles in order the display latest news of next page.
            currentArticleIndex: 7*(val-1),
        })

        // after changing the page taking the user to the top of page.
        document.documentElement.scrollTop = 0;
    };


    // after rendering this will be mounted.
    useEffect(()=>{

        getRightContent();

    },[,props.content])

    // if user wants top explore the news.
    function navigateToUrl(url){
        window.open(url,'_blank');
    }
   

    // this function will handle the logic of current page number and it's neighbors
    // will be shown to the user.
    function addPageNumbers(currPageNumber) {
        // after filling this list. it will be returned.
        let insertpages = [];

        // this list represents the number of pages. if the page limit is 5 then it will 
        // hold the values from 1 to the 5
        let pageList = [];

       
        for(let i = 1; i <= pagination.limitOfPages;i++){
            pageList.push(i); 
        }
        

        // so we want to display position of maximum 5 page numbers on the screen 
        // which are neighbors to the current page.
        for(let i = 0; i < 5; i++){

            // this will look confusing but 'currPageNumber - (2-i)' works like a formula 
            // to display the position of 5 pages nearby the current page
            if (pageList.includes(currPageNumber - (2-i))){

                // suppose if the user is at 4th page. except position of 4th page other pages will
                // be use the following css properties.
                let divColor = {
                    color : 'black',
                    backgroundColor : 'white',
                };

                // this css property will work for the postion of current page.
                if(currPageNumber == currPageNumber - (2-i)){
                    divColor = {
                        color : 'white',
                        backgroundColor: 'red'
                    }
                }

                // update the list.
                insertpages.push(<div key={i} className="page-address" id={`pg-id-${i}`} style={divColor} onClick={() => handlePage(currPageNumber - (2-i))}><h3>{currPageNumber - (2-i)}</h3></div>)
            }
            // if the number 'currPageNumber - (2-i)' not available in pagelist we will skip it.
            else{
                continue;
            }
            
        }
        
        return insertpages;
    }


    // this will run when the api request has been processed.
    if (boolean){
    return (
        <>

            <div id="right-content">
                {/* ---------------------------- */}

                {/* we are giving two pagination divs, one at the top and another at the bottom just to make it simple for user to change the page */}
                <div id="paginator">
                        {
                        (pagination.currentPage > 1) &&
                        <h2 onClick={() => handlePage(pagination.currentPage-1)}><i class="ri-arrow-go-back-line"></i></h2>
                        }

                        {
                        addPageNumbers(pagination.currentPage)
                        }

                        { (pagination.limitOfPages > (pagination.currentPage) ) &&
                        <h2 onClick={() => handlePage(pagination.currentPage+1)}><i class="ri-arrow-go-forward-line"></i></h2>
                        }

                </div>

                {/* ---------------------------- */}

                {((articles).slice(pagination.currentArticleIndex,pagination.currentArticleIndex + 7)).map((val,index) => {

                        return (

                            <div className="small-card" key={index} onClick={() => navigateToUrl(val.url)}>
                                <img src={val.urlToImage} alt="" />
                                <div className="small-card-headlines">
                                    <div className="creditionals">
                                        <h6>
                                            author - {val?.author ?? 'Anonymous'}
                                        </h6>
                                    </div>
                                    <div className="small-card-title">
                                        <h4>{val.title}</h4>
                                    </div>
                                    <div className="small-card-desc">
                                        <p>{val.description}</p>
                                    </div>
                                    <p>...</p>
                                    
                                </div>
                        
                            </div>

                        );
                        
                })}

                {/* this is last paginator that will be at the bottom. */}
                <div id="paginator">
                        {
                        (pagination.currentPage > 1) &&
                        <h2 onClick={() => handlePage(pagination.currentPage-1)}><i class="ri-arrow-go-back-line"></i></h2>
                        }

                        {
                        addPageNumbers(pagination.currentPage)
                        }

                        {/* <h4><span>Ace</span>.news | page = {pagination.currentPage} | limit = {pagination.limitOfPages}</h4> */}
                        { (pagination.limitOfPages > (pagination.currentPage) ) &&
                        <h2 onClick={() => handlePage(pagination.currentPage+1)}><i class="ri-arrow-go-forward-line"></i></h2>
                        }
                </div>
                
            </div>



        </>
    );
    }

    // if the request is in processing state we will run the loading bar.
    else{
        return (
        <div id='right-content'>
            <iframe key={'iframe-1'} id='loading-bar' src="https://giphy.com/embed/17mNCcKU1mJlrbXodo" width="200" height="200" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
        </div>
        );
    }

}

export default RightContent;