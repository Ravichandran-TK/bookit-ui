import axios from "axios";
const ApiHost = "http://localhost:3001"

const userStore = JSON.parse(localStorage.getItem('user'));
const token = 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhdmljaGFuZHJhbi50aGl5YWdhcmFqYW5AaW5kaXVtc29mdC5jb20iLCJleHAiOjE2NTgwNjAzMjAsImlkIjoxLCJuYW1lIjoiUmF2aWNoYW5kcmFuIFQifQ.xGz_vUbNLDf5Okm3OCQpIc1UHkQ41pDnyYwf6Z_So0E"
const headerAuthToken = { headers: { Authorization: token } }
debugger
const ApiUtility = {
  async getMyBookingsRecords() {
    const url =  `${ApiHost}/api/my_bookings`;
    try{
      const response = await axios.get(url, token)
      return response.data
    }catch(error){
      if (error.response.status === 401){
        window.location.assign('/sign-in');
      }
    }
  },

  async getWorkSpaceDetails() {
    const url =  `${ApiHost}/api/workspace_details`;
    debugger
    try{
      const response = await axios.get(url, headerAuthToken)
      debugger
      return response.data
    }catch(error){
      if (error.response.status === 401){
        window.location.assign('/sign-in');
      }
    }
  },
}

export default ApiUtility;