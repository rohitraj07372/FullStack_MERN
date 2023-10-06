// fetching const variables

const search_box_text = document.querySelector('.username');
const profile_image = document.querySelector('.profile');
const full_name  = document.querySelector("#name");
const joined_date = document.querySelector("#joindeDate");
const git_profile_link = document.querySelector('.githubLink');
const description = document.querySelector(".description");
const repos = document.querySelector('#repos');
const followers = document.querySelector('#followers');
const following = document.querySelector('#following');
const location_text = document.querySelector('.location_text');
const company_text = document.querySelector('.company_text');
const link_text = document.querySelector(".link_text");
const twitter_text = document.querySelector('.twitter_text');
const search = document.querySelector('.search');
const information_container = document.querySelector('.information_container')
const loading = document.querySelector(".loading_container");
// fetch api
let username = "";
 
async function fetchInformation(){
    loading.classList.add('active');
    information_container.classList.remove('active');
    try{
        let response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        let data = await response.json();
        loading.classList.remove('active');

        console.log(data);
        renderData(data);
        information_container.classList.add('active');
    }
    catch(error){
        loading.classList.remove('active');
        information_container.classList.remove('active');
        alert("not found");
    }
     
}

 async function search_profile(){
    username =  search_box_text.value;
    if(username==="")
    {
        alert('Enter the username first')
    }
    else{
         await fetchInformation();
    }
}

function renderData(info){
      let image_url = 'url(' +info?.avatar_url + ')' ;
      let j_date = formatDate( info?.created_at);

     
      
      full_name.innerText = info?.name;
      profile_image.style.backgroundImage = image_url;
      joined_date.innerText = `Joined ${j_date}` ;
      followers.innerText = (info?.followers);
      following.innerText = info?.following;
      repos.innerText = info?.public_repos;
      description.innerText = info?.bio;
      twitter_text.innerText = (info?.twitter_username !==null)?info?.twitter_username: "not available";
      company_text.innerText = (info?.company !==null)?info?.company:"not available";
      location_text.innerText = (info?.location!==null)?info?.location:"not available";
      git_profile_link.href = ''+info?.url+'';
      git_profile_link.textContent = `@${info?.name}`;
      link_text.href = ''+info?.repos_url+'';
      link_text.textContent = (link_text.href !==null)? "Repo link" : "Repo link not available";

}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }
  

search.addEventListener('click', ()=>{
    
    search_profile();
    
    search_box_text.value = "";
});

// change style sheet light and dark

const modeToggle = document.querySelector('#darkmode-toggle');
const stylesheet = document.querySelector('#stylesheet');

function toggleStyle()
{
    if(modeToggle.checked)
    {
        stylesheet.href="./dark_mode.css";
    }
    else{
        stylesheet.href = "./style.css";
    }
}
modeToggle.addEventListener('change', toggleStyle);
document.addEventListener('keydown', (e)=>{
    const press =e.key;
    console.log(press)
     if(press === "Enter") 
     {
        search_profile();
    
        search_box_text.value = "";
     }
});