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

  // getRestaurant = (user_id, name_restaurant, { withCredentials: true }) => {
  //   return this.service.get(`getRestaurant/${user_id}/${name_restaurant}`)
  //     .then(res => res.data)
  //     .catch(err => console.log('Error', err))
  // }



  postMenu = (menu, restaurant_id) => {
    console.log(menu)

    this.service.post('newPlate', { menu, restaurant_id }, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err))
  }

}