document.addEventListener('DOMContentLoaded', async function () {
  const clientList = document.querySelector('.master'),
    detailList = document.querySelector('.detail'),
    form = document.querySelector('.form-add')
  const formatTime = function (time) {
    let formatedTime = {
      YMD: '',
      MS: '',
    };
    let element = '';
    for (let i = 0; i <= 9; i++) {
      element += time[i];
    };
    formatedTime.YMD = element.replaceAll("-", ".");
    element = '';
    for (let i = 11; i <= 15; i++) {
      element += time[i];
    };
    formatedTime.MS = element
    return formatedTime;
  }
  const addNewClient = function (clientObj) {
    const listItem = document.createElement('tr');
    listItem.className = "table-row";
    clientList.appendChild(listItem);
    const updatedAt = formatTime(clientObj.date);
    const sum = parseInt(clientObj.first) + parseInt(clientObj.second);
    const id = clientObj.id;
    const note = clientObj.note;
    listItem.innerHTML = `
    <td id="${clientObj.id}" class="table-element txt-gray">${id}</td>
    <td class="table-element">${updatedAt.YMD}<span class="txt-gray time">${updatedAt.MS}</span></td>
    <td class="table-element">${sum}</td>
    <td class="table-element">${note}</td>
    <td class="table-element">
      <button id="D${clientObj.id}" class="edit-client-btn btn-reset">Изменить</button>
      <button id="E${clientObj.id}" class="remove-client-btn btn-reset">Удалить</button>
    </td>
    `;
  };
  const addNewClientDetail = function (clientObj) {
    const listItem = document.createElement('tr');
    listItem.className = "table-row";
    detailList.appendChild(listItem);
    const first = clientObj.first;
    const sum = parseInt(clientObj.first) + parseInt(clientObj.second);
    const id = clientObj.id;
    const second = clientObj.second;
    listItem.innerHTML = `
    <td id="${clientObj.id}" class="table-element txt-gray">${id}</td>
    <td class="table-element">${first}</td>
    <td class="table-element">${second}</td>
    <td class="table-element">${sum}</td>
    <td class="table-element">
      <button id="D${clientObj.id}" class="edit-client-btn btn-reset">Изменить</button>
      <button id="E${clientObj.id}" class="remove-client-btn btn-reset">Удалить</button>
    </td>
    `;
  };
  const fillList = async function () {
    const response = await fetch(`http://localhost:3000/api/users`, {
      method: 'GET',
    });
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
      addNewClient(data[i]);
      addNewClientDetail(data[i]);
    };
    addNew()
    removeEdit()
  };
  fillList();
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    location.reload();
    fillList();
  });
})
