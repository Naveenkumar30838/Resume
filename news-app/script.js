const api_Key="65aa624e05334a30a770e983747582cc";
const url ="https://newsapi.org/v2/everything?q="

const localQueries=["world cup " ,"Cricket" ,"India" , "Global" ,"United States" , "Economics" ,"Politics" ,"Geography","Technology","Bollywood","Hollywood",'Israel-Hamas' ,"Russia -Ukraine"]
let index=Math.floor(Math.random() * (localQueries.length - 1) + 1)

window.addEventListener('load' ,fetchNews(localQueries[index]));

async function fetchNews(query,toBeSorted){
    
    const res=await fetch(`${url}${query}&apiKey=${api_Key}`)
    const data=await res.json();
    if(toBeSorted){

        const ret=data.articles.sort((a, b) => {
            return b.publishedAt.localeCompare(a.publishedAt);
        });
        bindData(ret);
    }else{
        bindData(data.articles);
    }
}
function bindData(article){
    const container=document.getElementById('news-container');
    const news_template=document.getElementById('news-template');
    container.innerHTML='';
    article.forEach((element) => {
        if(!element.urlToImage){return ;}
        const cardClone=news_template.content.cloneNode(true);
        addData(cardClone,element)
        container.appendChild(cardClone);
    });
}
function addData(card , article ){
    const image=card.querySelector('#card-Image');
    const title=card.querySelector('#title');
    const news_src  =card.querySelector('#news-src');
    const news_time =card.querySelector('#news-time');
    const news_brief =card.querySelector('#news-brief');

    image.src=article.urlToImage;
    title.innerHTML=article.title;

    news_src.innerHTML=article.source.name ;
    news_time.innerHTML=new Date(article.publishedAt).toLocaleString('en-US',{
        timeZone:'Asia/Jakarta'
    });
    const desc=article.description;
    const curtailedDesc=curtailDesc(desc);
    news_brief.innerHTML=curtailedDesc;
   
    card.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank")
    })
}


const navCenter=document.querySelectorAll('#nav-center p');
let currSelected=""
navCenter.forEach(e =>{
    e.addEventListener('click',()=>{

        navCenter.forEach(e =>{
            if(e.classList.contains('clicked')){
                e.classList.remove('clicked')
            }})
            
        currSelected=e;
        const query=e.innerHTML;
        fetchNews(query);
        e.classList.add('clicked')
    })
})
function curtailDesc(article){
    const end=" more ..."
    if(article.length<120){return article + end;}
    return article.substring(0,101)+end;
}

const searchBox=document.getElementById('searchBox');
const searchButton=document.getElementById('searchButton');

searchButton.addEventListener('click',()=>{
    fetchNews(searchBox.value);
    if(currSelected!=""){currSelected.classList.remove('clicked')}
})

//Handling Some More Styling Here
const logo=document.getElementsByClassName('logo')[0];
logo.addEventListener('click' ,() =>{
        window.location.reload();
})
const recent=document.getElementById('Recent')
recent.addEventListener('click' ,()=>{
    fetchNews('India',true)
})