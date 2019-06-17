import axios from 'axios'

export default class services {

  constructor() {

    this.service = axios.create({
      baseURL: 'http://localhost:3000/api/'
    })
  }


  // Files

  handleUpload = theFile => {
    return this.service.post('/upload', theFile, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err));
  }



  // Restaurant

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



  // Menu

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

  getMenu = (restaurant_id) => {
    return this.service.get(`getRestaurantMenu/${restaurant_id}`, { restaurant_id }, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err.response.data.msg))
  }



  // Order

  postOrder = (order) => {
    return this.service.post('newOrder', { order }, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err))
  }

  updateOrder = (order) => {
    return this.service.post('updateOrder', { order }, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err))
  }


  getOrder = () => {
    return this.service.get('getOrder', { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err.response.data.msg))
  }


}