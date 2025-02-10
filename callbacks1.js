function fetchDataCallback(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      if (xhr.status === 200) {
        callback(null, JSON.parse(xhr.responseText));
      } else {
        callback(`Error: ${xhr.status}`, null);
      }
    };
    xhr.onerror = () => callback('Network Error', null);
    xhr.send();
  }
  
  // Usage
  fetchDataCallback('https://jsonplaceholder.typicode.com/posts', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Callback Data:', data.slice(0, 3));
    }
  });
  