const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

// Get Quote from API
async function getQuote() {
    showLoadingSpinner();

    const apiUrl = 'https://api.api-ninjas.com/v1/quotes';

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-Api-Key': 'M6F3GAPKz+WVgt+TvnYN6Q==SobnPr8vnfqX78MC',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error: ${errorText}`);
        }

        const data = await response.json();
        
        // Check Quote length - apply / remove .long-quote
        if (data[0].quote.length > 120) {
            quoteText.classList.add('long-quote');
            console.log('Long quote');
        } else {
            quoteText.classList.remove('long-quote');
            console.log('Short quote');
        }

        // Assign random quote and author to HTML
        quoteText.textContent = data[0].quote;
        authorText.textContent = data[0].author || 'Unknown';
        
        hideLoadingSpinner();
    } catch (error) {
        getQuote();
        alert('Error: ' + error);
    }
}

// Tweet function
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Button events
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On load
getQuote();