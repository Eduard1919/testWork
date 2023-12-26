const removeEdit = async function () {
    const removeClient = document.querySelectorAll('.remove-client-btn');
    const deleteBg = document.querySelector('.delete-popup-bg');
    const editClient = document.querySelectorAll('.edit-client-btn');
    const form = document.querySelector('.form-edit');
    const editBg = document.querySelector('.edit-popup-bg');
    const clientDelete = document.querySelector('.delete-client-btn');
    const cancelDelete = document.querySelectorAll('.delete-cancel-btn');
    for (let i = 0; i < removeClient.length; i++) {
        removeClient[i].addEventListener('click', async function () {
            deleteBg.classList.remove('visually-hidden');
            currentID = removeClient[i].getAttribute('id').substring(1);
        });
    };
    for (let i = 0; i < editClient.length; i++) {
        editClient[i].addEventListener('click', async function (ev) {
            ev.preventDefault();
            editBg.classList.remove('visually-hidden');
            currentID = editClient[i].getAttribute('id').substring(1);
            const response = await fetch(`http://localhost:3000/api/users/${currentID}`, {
                method: 'GET',
            });
            const data = await response.json();
            document.querySelector('#idE').value = data.id
            document.querySelector('#firstE').value = data.first;
            document.querySelector('#secondE').value = data.second;
            document.querySelector('#noteE').value = data.note;
        })
    };
    form.addEventListener('submit', async function (ev) {
        ev.preventDefault();
        editBg.classList.toggle('visually-hidden');
        const id = document.querySelector('#idE').value
        const first = document.querySelector('#firstE').value
        const second = document.querySelector('#secondE').value
        const note = document.querySelector('#noteE').value
        await fetch(`http://localhost:3000/api/users/${currentID}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: id,
                first: first,
                second: second,
                note: note,
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });
    })
    for (let i = 0; i < cancelDelete.length; i++) {
        cancelDelete[i].addEventListener('click', function (ev) {
            ev.preventDefault();
            deleteBg.classList.toggle('visually-hidden');
        })
    };
    clientDelete.addEventListener('click', async function (ev) {
        ev.preventDefault();
        await fetch(`http://localhost:3000/api/users/${currentID}`, {
            method: 'DELETE',
        });
        deleteBg.classList.add('visually-hidden');
        location.reload();
    })
    // editClient.addEventListener('click', async function (ev) {
    //     ev.preventDefault();
    //     const response = await fetch(`http://localhost:3000/api/users/${currentID}`, {
    //         method: 'GET',
    //     });
    //     const data = await response.json();
    //     console.log(data)

    // })
}