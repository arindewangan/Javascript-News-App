let Api = "f9dd260a1b4b47f398e962d966ade04e";
let newsSource = "google-news-in";
let filter = "source";
let countryCode = "in";
let categoryCode = "sports";
syncNews();

let gni = document.getElementById("google-news-in");
gni.addEventListener("click", function() {
    filter = "source";
    newsSource = "google-news-in";
    sourceTitle.textContent = "Google News In";
    syncNews();
});
let toi = document.getElementById("the-times-of-india");
toi.addEventListener("click", function() {
    filter = "source";
    newsSource = "the-times-of-india";
    sourceTitle.textContent = "Times of India";
    syncNews();
});
let fortune = document.getElementById("fortune");
fortune.addEventListener("click", function() {
    filter = "source";
    newsSource = "fortune";
    sourceTitle.textContent = "Fortune";
    syncNews();
});
let bbc = document.getElementById("bbc-news");
bbc.addEventListener("click", function() {
    filter = "source";
    newsSource = "bbc-news";
    sourceTitle.textContent = "BBC News";
    syncNews();
});

let india = document.getElementById("india");
india.addEventListener("click", function() {
    filter = "country";
    countryCode = "in";
    sourceTitle.textContent = "India";
    syncNews();
});
let usa = document.getElementById("usa");
usa.addEventListener("click", function() {
    filter = "country";
    countryCode = "us";
    sourceTitle.textContent = "USA";
    syncNews();
});
let russia = document.getElementById("russia");
russia.addEventListener("click", function() {
    filter = "country";
    countryCode = "ru";
    sourceTitle.textContent = "Russia";
    syncNews();
});

let sports = document.getElementById("sports");
sports.addEventListener("click", function() {
    filter = "category";
    categoryCode = "sports";
    sourceTitle.textContent = "Sports";
    syncNews();
});
let business = document.getElementById("business");
business.addEventListener("click", function() {
    filter = "category";
    categoryCode = "business";
    sourceTitle.textContent = "Business";
    syncNews();
});
let tech = document.getElementById("tech");
tech.addEventListener("click", function() {
    filter = "category";
    categoryCode = "technology";
    sourceTitle.textContent = "technology";
    syncNews();
});

function syncNews() {
    let newsAc = document.getElementById("newsAc");
    const xhr = new XMLHttpRequest();
    if (filter == "source") {
        xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${newsSource}&apiKey=${Api}`, true);
    } else if (filter == "category") {
        xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=in&category=${categoryCode}&apiKey=${Api}`, true);
    } else if (filter == "country") {
        xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${Api}`, true);
    }
    xhr.onload = function() {
        if (this.status === 200) {
            json = JSON.parse(this.responseText);
            getNews();
            if (filter == "source") {
                console.log(`News Added from ${newsSource}`);
            } else if (filter == "category") {
                console.log(`News Added from ${categoryCode}`);
            } else if (filter == "country") {
                console.log(`News Added from ${countryCode}`);
            }
        } else {
            console.log("Some Error Occured");
            newsAc.innerHTML = "<b> Unable to get news from server, Please try again Later.<b>";
        }

    }
    xhr.send();
};

function getNews() {
    let articles = json.articles;
    let newsHTML = "";
    articles.forEach(function(element, index) {
        let news = `<div class="accordion-item">
                            <h2 class="accordion-header" id="heading${index}">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                    <h6>${index+1}. ${element["title"]}</h6>
                                </button>
                            </h2>
                            <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="newsAc">
                                <div class="accordion-body">
                                    <p>${element["content"]}. <a href="${element['url']}" target="_blank" >Read Full News</a></p>
                                </div>
                            </div>
                        </div>`
        newsHTML += news;
    });
    newsAc.innerHTML = newsHTML;
    searchNews();
};

function searchNews() {
    let search = document.getElementById("search");
    search.addEventListener("input", function() {
        let inputVal = search.value.toLowerCase();
        let accordionitem = document.getElementsByClassName("accordion-item");
        Array.from(accordionitem).forEach(function(element) {
            let newsTitle = element.getElementsByTagName("h6")[0].innerText;
            let newsContent = element.getElementsByTagName("p")[0].innerText;
            if (newsTitle.toLowerCase().includes(inputVal) || newsContent.toLowerCase().includes(inputVal)) {
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        })
    })
};