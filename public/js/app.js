const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')

message1.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e) =>
{
    e.preventDefault()

    const location = search.value    

    message1.textContent = 'Loading...'
    message2.textContent = ''
    message3.textContent = ''

    fetch(`/weather?address=${location}`).then((response)=>
    {
        response.json().then((data) => 
        {
            if (!data.error)
            {
                message1.textContent = data.location
                message2.textContent = data.forecast.weather
                message2.textContent = data.forecast.wind_speed
            }
            else
            {
                message1.textContent = `Error: ${data.error}`
            }
        })
    })
})