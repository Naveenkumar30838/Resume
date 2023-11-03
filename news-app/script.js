const api_Key="65aa624e05334a30a770e983747582cc";
const url ="https://newsapi.org/v2/everything?q="

window.addEventListener('load' ,fetchNews("India"));
async function fetchNews(query){
    console.log("hi");
    const res=await fetch(`${url}${query}&apiKey=${api_Key}`)
    const data=await res.json();
    console.log(data)
    bindData(data.articles);
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
    news_brief.innerHTML=article.description ;

}

const searchBox=document.getElementById('searchBox');
const searchButton=document.getElementById('searchButton');

searchButton.addEventListener('click',()=>{
    fetchNews(searchBox.value);
})

const navCenter=document.querySelectorAll('#nav-center p');
navCenter.forEach(e =>{
    e.addEventListener('click',()=>{

        navCenter.forEach(e =>{
            if(e.classList.contains('clicked')){
                e.classList.remove('clicked')
        }})

        const query=e.innerHTML;
        fetchNews(query);
        e.classList.add('clicked')
    })
})