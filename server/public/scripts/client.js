console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    $('#addJokeButton').on('click', addJoke)
    getJoke()
}



function addJoke(event) {
    event.preventDefault()
    console.log('adding joke');


let whoseJoke = $('#whoseJokeIn').val()
let jokeQuestion = $('#questionIn').val()
let punchLine = $('#punchlineIn').val()

    $.ajax({
        method: 'post',
        url: '/addjoke',
        data: {
            whoseJoke: whoseJoke,
            jokeQuestion: jokeQuestion,
            punchLine: punchLine,
        }
    }).then (function (respond) {
        console.log('list of jokse', respond );
        getJoke()
    }).catch (function (err) {
        alert('Error with sending jokes to server')
        console.log('Request Failed: ', err);
    })
}

// GET
function getJoke( ) {
    $.ajax({
        method: 'get',
        url: '/addjoke'
    }).then (function (respond) {
        $('#whoseJokeIn').val('')
        $('#questionIn').val('')
        $('#punchlineIn').val('')
        console.log(respond);
        $('#outputDiv').empty()
        renderToDOM(respond)
    })
}
function renderToDOM(respond) {
    
    for (const joke of respond) {
        $('#outputDiv').append(`

            <ul>
                <li>
                    ${joke.whoseJoke} said ${joke.jokeQuestion}, ${joke.punchLine}
                </li>
            </ul>
        `)
    }
}