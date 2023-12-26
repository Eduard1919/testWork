const addNew = async function () {
    const openAddClientForm = document.querySelector('.get-form-btn');
    const escapeAddClientForm = document.querySelector('.add-escape-btn');
    const form = document.querySelector('.form-add');
    const background = document.querySelector('.popup-bg');
    const cancelAddForm = document.querySelector('.cancel-add-form');
    openAddClientForm.addEventListener('click', async function () {
        background.classList.remove('visually-hidden');
    });
    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        const id = document.querySelector('#id').value;
        const first = document.querySelector('#first').value;
        const second = document.querySelector('#second').value;
        const note = document.querySelector('#note').value;
        await fetch(`http://localhost:3000/api/users/`, {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                first: first,
                second: second,
                note: note,
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
    })
    cancelAddForm.addEventListener('click', async function (event) {
        event.preventDefault();
        background.classList.toggle('visually-hidden');
    });
    escapeAddClientForm.addEventListener('click', async function (event) {
        event.preventDefault();
        background.classList.toggle('visually-hidden');
    })
}