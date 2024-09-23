function submitForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        alert(`Thank you, ${name}! Your message has been sent.`);
    } else {
        alert('Please fill out all fields.');
    }

    // Clear the form after submission
    document.getElementById('contact-form').reset();
}
