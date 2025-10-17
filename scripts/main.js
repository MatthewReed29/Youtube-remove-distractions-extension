console.log(window.location.toString());

console.log(window.location.href);

document.onload = function(){
    window.open("https://www.youtube.com/feed/subscriptions")
};

function isShortURL(url){
    return url.substring(0, 30) === "https://www.youtube.com/shorts";
}

function isHomeURL(url){
    return url === "https://www.youtube.com/" || url === "https://www.youtube.com"
}

function isVideoURL(url){
    return url.substring(0, 29) === "https://www.youtube.com/watch"
}

function isSearchURL(url){
    return url.substring(0, 31) === "https://www.youtube.com/results"
}

async function monitorURL(){
    var url = window.location.href;
    try{
        while(true)
        {
            await new Promise(resolve => setTimeout(resolve, 500));
            if(url !== window.location.href){
                findPageLogic();
                url = window.location.href;
            }
        }
    }catch(e){
        console.log("Something Went wrong while comparing the URL");
    }
}

async function noChangingShorts(){
    var url = window.location.href;
    while(true)
    {
        await new Promise(resolve => setTimeout(resolve, 500));
        if(url !== window.location.href){
            if(isShortURL(window.location.href))
            {
                window.location.replace("https://www.youtube.com/feed/subscriptions");
            }else{
                break;
            }
        }
    }
}

async function clearDistractions() {
    while(true) {
        toDeleteContainer = document.getElementById("secondary");
        if (toDeleteContainer === null) {

        } else {
            while(true){
                try{
                    document.getElementById("secondary").remove();
                }catch (e) {
                    break;
                }
            }
            break;
        }
        await new Promise(resolve => setTimeout(resolve, 10));
    }
    while(true){

        if(isVideoURL(window.location.href)){
            var arr = document.querySelectorAll("div.ytp-ce-element.ytp-ce-video.ytp-ce-element-show")
            arr.forEach(function(element){
                element.remove();
            })

            var arr2 = document.querySelectorAll("div.ytp-fullscreen-grid-main-content")
            arr2.forEach(function(element){
                element.remove();
            })
        }else{
            break;
        }
        await new Promise(resolve => setTimeout(resolve, 10));
    }
}

async function searchMonitoring(){
    while(true)
    {
        await new Promise(resolve => setTimeout(resolve, 500));
        if(isSearchURL(window.location.href)){
            var arr = document.querySelectorAll("ytd-shelf-renderer")
            arr.forEach(function(i){
                i.remove();
            })
        }else{
            break;
        }
    }
}

function findPageLogic(){
    if(isHomeURL(window.location.href)){
        document.querySelector("body").style.display = "none";
        window.location.replace("https://www.youtube.com/feed/subscriptions");
    }else if(isVideoURL(window.location.href)){
        setTimeout(clearDistractions, 1500);
    }else if(isShortURL(window.location.href)){
        noChangingShorts();
    }else if(isSearchURL(window.location.href)){
        searchMonitoring()
    }
}

findPageLogic();
monitorURL();