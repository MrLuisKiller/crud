let cardList = JSON.parse(localStorage.getItem('cardList')) || []
let index = null

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
})

const tr = (card, index) => `
    <tr>
        <td>${card.headline}</td>
        <td>${card.cardNumber}</td>
        <td>${card.dateExpiry}</td>
        <td>
            <i onclick="editCard(${index})" class="bi bi-pencil-square text-info"></i>
        </td>
        <td>
            <i onclick="deleteCard(${index})" class="bi bi-trash3 text-danger"></i>
        </td>
    </tr>   
`

const infoCard = {
    headline: document.getElementById('headline'),
    cardNumber: document.getElementById('cardNumber'),
    dateExpiry: document.getElementById('dateExpiry'),
    cvv: document.getElementById('cvv')
}

const icons = {
    headline: document.querySelector('.bi-person-fill'),
    cardNumber: document.querySelector('.bi-credit-card-2-front-fill'),
    dateExpiry: document.querySelector('.bi-calendar-date-fill'),
    cvv: document.querySelector('.bi-key-fill')
}

const title = document.getElementById('title')
const form = document.getElementById('form')
const submitbtn = document.getElementById('submitbtn')
const cleanbtn = document.getElementById('cleanbtn')
const cards = document.getElementById('cards')
const erasebtn = document.getElementById('erasebtn')

const showCard = () => {
    cards.innerHTML = cardList.map((card, index) => tr(card, index)).join('')
    erasebtn.disabled = !cardList.length > 0
}
showCard()

const valid = icon => {
    icon.classList.remove('text-danger')
    icon.classList.add('text-success')
}

const invalid = icon => {
    icon.classList.remove('text-success')
    icon.classList.add('text-danger')
}

const validate = id => {
    infoCard[id].validity.valid ? valid(icons[id]) : invalid(icons[id])
    submitbtn.disabled = !(infoCard.headline.validity.valid && infoCard.cardNumber.validity.valid && infoCard.dateExpiry.validity.valid && infoCard.cvv.validity.valid)
    cleanbtn.disabled = false
}

const reset = () => {
    Object.keys(icons).forEach(key => {
        icons[key].classList.remove('text-success')
        icons[key].classList.remove('text-danger')
    })
    form.reset()
    index = null
    title.innerHTML = 'AGREGAR'
    submitbtn.disabled = true
    cleanbtn.disabled = true
}

form.addEventListener('input', e => validate(e.target.id))

form.addEventListener('submit', e => {
    e.preventDefault()
    const card = {
        headline: infoCard.headline.value,
        cardNumber: infoCard.cardNumber.value,
        dateExpiry: infoCard.dateExpiry.value,
        cvv: infoCard.cvv.value
    }
    if (index === null) {
        cardList.push(card)
        Toast.fire({
            icon: 'success',
            title: 'Tarjeta agregada con Exito!!'
        })
    } else {
        cardList[index] = card
        Toast.fire({
            icon: 'success',
            title: 'Tarjeta actualizada con Exito!!'
        })
    }
    localStorage.setItem('cardList', JSON.stringify(cardList))
    reset()
    showCard()
    infoCard.headline.focus()
})

cleanbtn.addEventListener('click', () => reset())

const editCard = i => {
    index = i
    title.innerHTML = 'EDITAR'
    infoCard.headline.value = cardList[i].headline
    infoCard.cardNumber.value = cardList[i].cardNumber
    infoCard.dateExpiry.value = cardList[i].dateExpiry
    infoCard.cvv.value = cardList[i].cvv
    Object.keys(infoCard).forEach(key => validate(key))
}

const deleteCard = i => {
    Swal.fire({
        title: '¿Eliminar Tarjeta?',
        text: `Se eliminara la tarjeta de ${cardList[i].headline}`,
        icon: 'warning',
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#3085d6',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33'
    }).then(res => {
        if (res.isConfirmed) {
            Toast.fire({
                icon: 'success',
                title: 'Tarjeta eliminada con Exito!!'
            })
            cardList.splice(i, 1)
            localStorage.setItem('cardList', JSON.stringify(cardList))
            showCard()
        }
    })
}

erasebtn.addEventListener('click', () => {
    Swal.fire({
        title: '¿Eliminar Tarjetas?',
        text: 'Se eliminaran todas las tarjetas',
        icon: 'warning',
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#3085d6',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33'
    }).then(res => {
        if (res.isConfirmed) {
            Toast.fire({
                icon: 'success',
                title: 'Tarjetas actualizadas con Exito!!'
            })
            cardList = []
            localStorage.clear()
            showCard()
        }
    })
})