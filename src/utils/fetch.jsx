export const normaUrl = 'https://norma.nomoreparties.space/api/ingredients '
export const postURL = 'https://norma.nomoreparties.space/api/ingredients'

function fetchData(url, setData) {
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Can't fetch data");
            }
        })
        .then(res => {
            setData(res.data);
        })
        .catch(error => {
            console.log(error);
            alert('Connection error');
        });
  }

  export default fetchData
