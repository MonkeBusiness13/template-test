const quoteContainer =  document.getElementById ('quote-container');
const quoteText =  document.getElementById ('quote');
const authorText =  document.getElementById ('author');
const twitterBtn =  document.getElementById ('twitter');
const newQuoteBtn =  document.getElementById ('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show loader
function loading() {
    
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show new quote
function newQuote() {
    loading();
    //Pick a random quote from API quotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown'
    }   else{
        authorText.textContent = quote.author;
    }
    // Check Quote length to detrmine styling
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    }else {
        quoteText.classList.remove ('long-quote');
    }
    //Set Quote, Hide Loeader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API
async function getQuotes(){
    loading();
    const apiUrl ='https://type.fit/api/quotes';
    try {
        const response = await fetch (apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }   catch(error){
        //Catch error here
    }
}

/* Twitter Quote */
    function shareQuote() {
        const TwitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
        window.open(TwitterUrl, '_blank');
        
    } 

//Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', shareQuote);

// On load
getQuotes();
