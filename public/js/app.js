console.log("Loaded in client side Browser!")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const m1 = document.querySelector('#message1')
const m2 = document.querySelector('#message2')
const img = document.querySelector('#weather-icon')
m1.textContent = ""
m2.textContent = ""

weatherForm.addEventListener('submit', e => {
    e.preventDefault()
    const location = search.value
    fetch(`/weather?address=${location}`).then(response => {
    response.json().then(data => {
        if (data.Error){
            img.setAttribute('src', 'https://www.freeiconspng.com/uploads/pc-error-icon-8.png')
            img.removeAttribute('hidden')
            m1.textContent = data.Error
            m2.textContent = ""
        }
        else{
            img.removeAttribute('hidden')
            img.setAttribute('src', data.icon)
            m1.textContent = data.location
            m2.textContent = data.forecast
        }
    })
})

})