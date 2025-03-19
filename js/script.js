document.addEventListener('DOMContentLoaded', () => {
    const idInput = document.getElementById('id');
    const nameInput = document.getElementById('name');
    const extInput = document.getElementById('ext');
    const emailInput = document.getElementById('email');
    const deptInput = document.getElementById('dept');
    const messageDiv = document.getElementById('message');
    const form = document.getElementById('empForm');

    const displayMessage = (msg, isError = true) => {
        messageDiv.textContent = msg;
        messageDiv.classList.toggle('alert-danger', isError);
        messageDiv.classList.toggle('alert-success', !isError);
        if (!messageDiv.classList.contains('alert')) {
            messageDiv.classList.add('alert');
        }
    };

    const clearMessage = () => {
        messageDiv.textContent = '';
        messageDiv.classList.remove('alert', 'alert-danger', 'alert-success');
    };

    const validateID = () => {
        if (idInput.value.length !== 8) {
            displayMessage('Employee ID must be exactly 8 characters.');
        } else {
            clearMessage();
        }
    };

    const validateExt = () => {
        if (extInput.value.length !== 4) {
            displayMessage('Extension must be exactly 4 digits.');
        } else {
            clearMessage();
        }
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        emailRegex.test(emailInput.value)
            ? clearMessage()
            : displayMessage('Invalid email format.');
    };

    const validateName = () => {
        nameInput.value.trim() === ''
            ? displayMessage('Name is required.')
            : clearMessage();
    };

    const validateDept = () => {
        deptInput.value.trim() === ''
            ? displayMessage('Department is required.')
            : clearMessage();
    };

        idInput.addEventListener('input', () => {
        if (idInput.value.length > 8) {
            idInput.value = idInput.value.slice(0, 8);
        }
        validateID();
    });

    extInput.addEventListener('input', () => {
        if (extInput.value.length > 4) {
            extInput.value = extInput.value.slice(0, 4);
        }
        validateExt();
    });

    emailInput.addEventListener('input', validateEmail);
    nameInput.addEventListener('input', validateName);
    deptInput.addEventListener('input', validateDept);

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const id = idInput.value;
        const name = nameInput.value;
        const ext = extInput.value;
        const email = emailInput.value;
        const dept = deptInput.value;

        if (id && name && ext && email && dept) {
            if (id.length !== 8) return displayMessage('Employee ID must be 8 characters.');
            if (ext.length !== 4) return displayMessage('Extension must be 4 characters.');
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return displayMessage('Invalid email format.');
            if (name.trim() === '') return displayMessage('Name is required.');
            if (dept.trim() === '') return displayMessage('Department is required.');

            displayMessage('Employee information has been submitted.', false);

            idInput.value = '';
            nameInput.value = '';
            extInput.value = '';
            emailInput.value = '';
            deptInput.value = ''; // or set to a default value

            console.log(`8-Digit Employee ID: ${id}`);
            console.log(`Name: ${name}`);
            console.log(`4-Digit Extension: ${ext}`);
            console.log(`Email: ${email}`);
            console.log(`Department: ${dept}`);
        } else {
            displayMessage('All fields are required.');
        }
    });
});