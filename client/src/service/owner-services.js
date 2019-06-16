import axios from 'axios'

export default class services {

  constructor() {

    this.service = axios.create({
      baseURL: 'http://localhost:3000/api/'
    })
  }


  postRestaurant = (restaurant, user) => {

    return this.service.post('newRestaurant', { restaurant, user }, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err.response.data.msg))
  }


  updateRestaurant = (restaurant) => {

    return this.service.post('updateRestaurant', restaurant, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err.response.data.msg))
  }


  getRestaurant = (user_id, name_restaurant) => {

    return this.service.get(`getRestaurant/${user_id}/${name_restaurant}`, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log('Error', err))
  }


  postMenu = (menu, restaurant_id) => {

    return this.service.post('newPlate', { menu, restaurant_id }, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err))
  }

  updateMenu = (menu) => {
    return this.service.post('updateMenu', { menu }, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err.response.data.msg))
  }

  deleteMenu = (menu) => {
    return this.service.post('deleteMenu', { menu }, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err.response.data.msg))
  }



  handleUpload = theFile => {
    return this.service.post('/upload', theFile, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err));
  }

}