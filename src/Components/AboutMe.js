import React from "react";
import sign from '../images/about/sign.jpg';

// if this is all for if user click on about-me.
export default function AboutMe(){

    const checkifMobile = window.innerWidth < 551;

    const mydiv = {
        position: 'fixed',
        display : 'flex',
        flexDirection : 'column',
        height: '90vh',
        width : '85%',
        backgroundColor : 'white',
        zIndex : 9,
        border: "1.5px solid black",
        borderRadius: "10px",
        transform : "translate(8%,-18%)",
    }

    const introduceStyle ={
        display: 'flex',
        flexDirection: 'row',
        alignItems : 'center',
        justifyContent : 'space-evenly',
        height: '50%',
        width: '100%',
        backgroundColor: 'white',
    }        

    const innerIntrodiv = {

        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'left',
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
        height: '90%',
        width: '50%',
        fontWeight: '300',
        paddingLeft : '5%',
        paddingRight : '5%',
        paddingTop : '1%',
        paddingBottom : '1%',
        border: '1px solid black',
        margin: '10%',
        borderRadius : '10px',
    }

    const bottomIntrodiv = {
        fontWeight: '700',
        fontSize: 'small',
        height: '40%',
        width: '90%',
        margin: '5%',
        padding: '2%',
        border : '1px solid black',
        borderRadius : '10px',
        textAlign: 'center'
    }

    const mobileMydiv = {
        position: 'fixed',
        display : 'flex',
        flexDirection : 'column',
        height: '75vh',
        width : '85%',
        backgroundColor : 'white',
        zIndex : 9,
        border: "1.5px solid black",
        borderRadius: "10px",
        transform : "translate(8%,-15%)",
        
    }

    const mobileIntroduceStyle ={
        display: 'flex',
        flexDirection: 'column',
        alignItems : 'center',
        justifyContent : 'flex-start',
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: "10px",
    }        

    const mobileInnerIntrodiv = {

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
        height: '90%',
        width: '90%',
        fontWeight: '300',
        padding: '1%',
        border: '1px solid black',
        margin: '1%',
        borderRadius : '10px',
    }


    function closeProfile(){
        var getElem = document.getElementById('about-me');
        getElem.click();
    }

    return (
        <>
          <div style={ checkifMobile ? mobileMydiv : mydiv}>
             <div style={{height: '10%', textAlign:"right",}}>
                <h2><i class="ri-close-line" style={{color:'red', cursor:'pointer'}} onClick={closeProfile}></i></h2>
             </div>
             <div style={checkifMobile ? mobileIntroduceStyle :introduceStyle} id="introduce">
                <img style={ checkifMobile ? {display:'none'}:{objectFit:'cover',objectPosition:'center', height:'50%', width:'25%', borderRadius: '50%'}} src={sign} alt="" />
                <div style={checkifMobile ? mobileInnerIntrodiv :innerIntrodiv}>
                    
                    <h5><i class="ri-mail-line"></i> Email - harvirbuttar2917@gmail.com</h5>
                    <h5><i class="ri-github-fill"></i> GitHub - <a href="https://github.com/SubhPB">https://github.com/SubhPB</a></h5>
                    <h5><i class="ri-user-line"></i> Name  - Subhpreet Singh</h5>
                    <h5><i class="ri-code-s-slash-line"></i> Programming Languages - Pyhton, Java, JavaScript</h5>
                    <h5><i class="ri-brain-line"></i> Skills - Django, React, Django Rest Framework, Html, Css, Mysql(Relational Databases), OOP, Orm, Mathematical approach to solve problems, Quick learner, Responsive webpages</h5>
                    <h5><i class="ri-school-line"></i> Academic status - Associate of Science in Mathematics</h5>

                </div>
             </div>

             <div style={checkifMobile ? {display : 'none'} : bottomIntrodiv}>
                    <p> Hey <i class="ri-user-smile-line"></i>, i do full stack development. Always ready to collabrate with both frontend and backend team. I use Django as backend framework. I also use react for frontend if needed 
                        My web development skills are mostly self-taught. Along with python i also have a very good hand in Java and can convert any code from python to java. I learned Java during my college days specially for Data 
                        Sturctures and Algorithms. I use Django Rest Framework to build the API's for my applications. Please feel free to explore my github projects - <a href="https://github.com/SubhPB">https://github.com/SubhPB</a>. Thanks! for giving your valuable time to view my profile.
                    </p>
            </div>

          </div>
        </>
    );
}