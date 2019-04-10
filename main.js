const API = 'https://test-users-api.herokuapp.com/';

const getUsers = () => {
    return fetch(API + 'users').then(res => {
        return res.json();
    }).catch(err => {
        console.log('couldnt find users', err);
        return [];
    })
};



const renderUsers = (users) => {
    const container = document.querySelector('.users');

    users.data.forEach(item => {
        const userElement = document.createElement('div');
        userElement.classList.add('user');
        userElement.innerHTML = `
        <h4>Name: ${item.name}</h4>
        <h4> age: ${item.age}</h4>
        `;
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('user__remove');
        removeBtn.textContent = 'X';
        userElement.append(removeBtn);

        container.append(userElement);
    });
}

const init = async () => {
    const users = await getUsers();
    renderUsers(users);
}

init();