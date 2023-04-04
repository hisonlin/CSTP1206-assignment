const url = 'http://api.carmd.com/v3.0/decode';
const vin = '1GNALDEK9FZ108495';
const partnerToken = 'd10539b417c441ae958a09fe4e22aa08';
const authKey = 'Basic Nzk1NzIwODItMzAwZS00MDQxLTg5MDItMmJjZDQ2NmVmMTli';

const headers = {
  'Content-Type': 'application/json',
  'Partner-Token': partnerToken,
  'Authorization': authKey,
};

const queryParams = {
  vin: vin,
};

const requestOptions = {
  method: 'GET',
  headers: headers,
};

async function fetchData() {
  try {
    const response = await fetch(`${url}?${new URLSearchParams(queryParams)}`, requestOptions);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

fetchData();
