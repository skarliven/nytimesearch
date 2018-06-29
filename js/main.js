// Defining a baseURL and key to as part of the request URL
var baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
var key = '1ed26feafefb44c2b917c98e9d60c8b3';
var url;
// Grab references to all the DOM elements you'll need to manipulate
var searchTerm = document.querySelector('.search');
var startDate = document.querySelector('.start-date');
var endDate = document.querySelector('.end-date');
var searchForm = document.querySelector('form');
var submitBtn = document.querySelector('.submit');
var nextBtn = document.querySelector('.next');
var previousBtn = document.querySelector('.prev');
var section = document.querySelector('section');
var nav = document.querySelector('nav');
// Hide the "Previous"/"Next" navigation to begin with, as we don't need it immediately
nav.style.display = 'none';
// define the initial page number and status of the navigation being displayed
var pageNumber = 0;
var displayNav = false;
// Event listeners to control the functionality
searchForm.addEventListener('submit', fetchResults);
nextBtn.addEventListener('click', nextPage);
previousBtn.addEventListener('click', previousPage);


function fetchResults(e) {
    //use preventDefault() to stop the form submitting;
    e.preventDefault();
    //Assembling the full URL
    url = baseURL + '?apikey=' + key + '&page=' + pageNumber + '&q=' + searchTerm.value;

    //Fetch the url value
    fetch(url).then(function (result) {
        return result.json();
    }).then(function (json) {
        displayResults(json);
    });


}

//Displaying the RESULTS
function displayResults(json) {
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }
    var articles = json.response.docs;

    if (articles.length === 10) {
        nav.style.display = 'block';
    } else {
        nav.style.display = 'none';
    }

    if (articles.length === 0) {
        var para = document.createElement('p');
        para.textContent = 'No results returned';
        section.appendChild(para);
    } else {
        for (var i = 0; i < articles.length; i++) {
            var article = document.createElement('article');
            var heading = document.createElement('h4');
            var link = document.createElement('a');
            var img = document.createElement('img');
            var para1 = document.createElement('p');
            var para2 = document.createElement('p');
            var clearfix = document.createElement('div');

            var current = articles[i];
            console.log(current);

            link.href = current.web_url;
            link.textContent = current.headline.main;
            para1.textContent = current.lead_paragraph;
            para2.textContent = 'Keywords: ';
            for (var j = 0; j < current.keywords.length; j++) {
                var span = document.createElement('span');
                span.textContent += current.keywords[j].value + ' ';
                para2.appendChild(span);
            }

            if (current.multimedia.length > 0) {
                img.src = 'http://www.nytimes.com/' + current.multimedia[0].url;
                img.alt = current.headline.main;
            }

            clearfix.setAttribute('class', 'clearfix');

            article.appendChild(heading);
            heading.appendChild(link);
            article.appendChild(img);
            article.appendChild(para1);
            article.appendChild(para2);
            article.appendChild(clearfix);
            section.appendChild(article);

        }
    }
};


function nextPage(e) {
    pageNumber++;
    fetchResults(e);
};

function previousPage(e) {
    if (pageNumber > 0) {
        pageNumber--;
    } else {
        return;
    }
    fetchResults(e);
};

//back to top

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}








// document.getElementById("btn").addEventListener("click", getArticles);
// function getArticles() {

// var userInput = document.getElementById("userInput").value;
// var btn = document.getElementById("btn").value;

// $.ajax({
//   url: "http://api.nytimes.com/svc/search/v2/articlesearch.json?" + userInput + "api-key=ffa150fff0234c57b2d1b1686fb68493" + btn,
//   dataType: "json",
//   success: function(data) {
//     for(var i = 0; i < data.data.length; i++) {
//       document.body.innerHTML += "<div class='gif'><img src='" + data.data[i].images.original.url +"'></div>"
//     }
    
//   },
//   error: function() {
//     console.log("API call failed")
//   },
//   type: 'GET'
// });
// }


// // Built by LucyBot. www.lucybot.com
// var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
// url += '?' + $.param({
//   'api-key': "ffa150fff0234c57b2d1b1686fb68493",
//   'q': "international",
//   'sort': "newest"
// });
// $.ajax({
//   url: url,
//   method: 'GET',
// }).done(function(result) {
//   console.log(result);
// }).fail(function(err) {
//   throw err;
// });