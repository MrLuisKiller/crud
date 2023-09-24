const toastBox = document.getElementById('toastBox')
const toastObject = {
    toastStyle: '',
    toastMessage: ''
}
const toastIcon = {
    success: '<i class="bi bi-check-circle"></i>',
    info: '<i class="bi bi-info-circle"></i>',
    danger: '<i class="bi bi-x-circle"></i>'
}

const showToast = () => {
    let toast = document.createElement('div')
    toast.classList.add('toastBox')
    toast.classList.add(toastObject.toastStyle)
    toast.innerHTML = `${toastIcon[toastObject.toastStyle]} ${toastObject.toastMessage}`
    toastBox.appendChild(toast)
    setTimeout(() => toast.remove(), 5000);
}