import axios from 'axios'

export default class services {

  constructor() {

    this.service = axios.create({
      baseURL: 'http://localhost:3000/api/'
    })
  }


  postRestaurant = (restaurant) => {

    return this.service.post('newRestaurant', restaurant)
      .then(res => res.data)
      .catch(err => console.log(err))
  }

  // getRestaurant = (user_id, name_restaurant) => {
  //   return this.service.get(`getRestaurant/${user_id}/${name_restaurant}`)
  //     .then(res => res.data)
  //     .catch(err => console.log('Error', err))
  // }



  postMenu = (menu, restaurant_id) => {
    console.log(menu, '---------------------------------------')
    this.service.post('newPlate', { menu, restaurant_id })
      .then(res => res.data)
      .catch(err => console.log(err))
  }

  // postMenu = (menu) => {

  //   this.service.post('newPlate', menu)
  //     .then(res => res.data)
  //     .catch(err => console.log(err))
  // }

  // updateMenu = (menu) => {

  //   this.service.post('newPlate', menu)
  //     .then(res => res.data)
  //     .catch(err => console.log(err))
  // }

}