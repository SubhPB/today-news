
//      ------------------------ Important ----------------------

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
import { useParams } from "react-router-dom";

function DynamicComponent(props) {

    const {content} = useParams(); 
    const [boolean,setBoolean] = useState(false);
    const [articles,setArticles] = useState(['',])
    const [country,setCountry] = useState(props.country);
    const [category,setCategory] = useState(props.category);
    

    const [pagination,setPagination] = useState({
        limitOfPages: 0,
        currentPage: 1,
        currentArticleIndex: 7,
    });

    const getRightContent = async() => {
        let url;
        console.log('here is the c\ontent = ',content)
        if (content == null){
           url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=60c0a1c84d9c4c888ce62add0be0bd30&pageSize=100`;
        }
        else{
           url = `https://newsapi.org/v2/${category}?q=${content}&apiKey=60c0a1c84d9c4c888ce62add0be0bd30&pageSize=100`
        }
        
        let data = await fetch(url);
        let response = await data.json();
        let responseArticles = response.articles.filter(item => item.urlToImage !== null);

        setArticles(responseArticles);

        setPagination({
            limitOfPages : Math.ceil(responseArticles.length / 7),
            currentPage : pagination.currentPage,
            currentArticleIndex: pagination.currentArticleIndex,
        });
        // setCountry(country);
        // setCategory(category);

        setBoolean(true);
    
    };

    function handlePage(val){
        setPagination({
            limitOfPages: pagination.limitOfPages,
            currentPage: pagination.currentPage + val,
            currentArticleIndex: pagination.currentArticleIndex + val*7,
        })
    };

    // useEffect(()=>{
    //     setCountry(props.country);
    //     setCategory(props.category);
    //     // remember to fix it it can misbehave 
    // },[props.country,props.catregory]);

    useEffect(()=>{
        getRightContent();
    },[])

    function navigateToUrl(url){
        window.open(url,'_blank');
    }

    if (boolean){
    return (
        <>
            <div id="right-content">
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
                
                <div id="paginator">
                    {
                    (pagination.currentPage > 1) &&
                    <h3 onClick={() => handlePage(-1)}><i class="ri-arrow-go-back-line"></i>Previous</h3>
                    }
                    <h4><span>Ace</span>.news | page={pagination.currentPage} |</h4>
                    { (pagination.limitOfPages > (pagination.currentPage + 1) ) &&
                    <h3 onClick={() => handlePage(1)}><i class="ri-arrow-go-forward-line"></i>Next</h3>
                    }
                </div>
                
            </div>



        </>
    );
    }

    else{
        return (
        <div id='right-content'>
            <iframe src="https://giphy.com/embed/17mNCcKU1mJlrbXodo" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/perfect-loops-17mNCcKU1mJlrbXodo">via GIPHY</a></p>
        </div>
        );
    }

}

export default DynamicComponent;