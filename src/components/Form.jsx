// Assuming this is a part of a class or functional component

const response = await fetch('/api/submit', {  // Updated endpoint
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    form_type: formType,  // Replaced from
    fullname: name,       // Replaced from
  }),
});