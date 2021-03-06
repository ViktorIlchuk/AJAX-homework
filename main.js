const API = 'https://test-users-api.herokuapp.com/';
const button = document.querySelector("#create-user-btn");

const getUsers = () => {
    return fetch(API + 'users').then(res => {
        return res.json();
        console.log(res.json());
    }).catch(err => {
        console.log('couldnt find users', err);
        return [];
    })
}; 

const deleteUser = async (userId, userElement) => {
    try {
        const res = await fetch (API + 'users/' + userId, {
            method: 'DELETE',
            body: JSON.stringify({name, age}),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }        
        });
        userElement.remove();
    } catch(err) {
        console.log('couldnt delete user', err);
    }
}

const renderUsers = (users) => {
    const container = document.querySelector('.users');

    users.forEach(item => {
        const userElement = document.createElement('div');
        userElement.classList.add('user');
        userElement.innerHTML = `
        <h4>Name: ${item.name}</h4>
        <h4> age: ${item.age}</h4>
        `;
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('user__remove');
        removeBtn.textContent = 'X';
        removeBtn.addEventListener('click', () => {
        deleteUser(item.id, userElement);
        })

        userElement.append(removeBtn);
        container.append(userElement);
    });
}

const init = async () => {
    const users = await getUsers();
    renderUsers(users.data);
}

const createUser = () => {
    const name = document.querySelector('#name').value;
    const age = document.querySelector('#age').value;
    fetch(API + 'users', {
        method: 'POST',
        body: JSON.stringify({name, age}),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
      }).then(res => {
        return res.json();
      }).then(({id}) => {
        const user = {
          name,
          age,
          id
        };
        renderUsers([user]);
      })
      .catch(err => {
        console.log('couldnt create a user', err);
      })
};




document.addEventListener('DOMContentLoaded', () => {
    const name = document.querySelector("#name");
    const age = document.querySelector("#age");
    const warning = "Name must consist of English letter, age must consist of numbers.";
    const attention = "Plese enter your name and age.";
    const createUserBtn = document.querySelector('#create-user-btn')
    document.querySelector("#message").innerHTML = attention;
    
    
    if (isNaN(age.value) || age.value < 0 ) {
        document.querySelector("#message").innerHTML = warning;
    } else {
        createUserBtn.addEventListener('click', createUser);
    }
  });

  init();
