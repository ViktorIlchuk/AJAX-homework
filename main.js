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

    users.forEach(item => {
        container.append(item.name + ' ' + item.age);
    });
}

const init = async () => {
    const users = await getUsers();
    renderUsers(users);
}

init();
getUsers();