console.log('Client side javascript file is loaded')

// fetch('http://localhost:3001/weather?address=Fredericksburg').then((response)=>
// {
//     response.json().then((data) => 
//     {
//         if (!data.error)
//         {
//             console.log(data)
//         }
//         else
//         {
//             console.log(`Error: ${data.error}`)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

message1.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e) =>
{
    e.preventDefault()

    const location = search.value    

    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch(`http://localhost:3001/weather?address=${location}`).then((response)=>
    {
        response.json().then((data) => 
        {
            if (!data.error)
            {
                message1.textContent = data.location
                message2.textContent = data.forecast.weather
            }
            else
            {
                message1.textContent = `Error: ${data.error}`
            }
        })
    })
})