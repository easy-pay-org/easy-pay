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

  getOneCoaster = (user_id, name_restaurant) => {
    return this.service.get(`getRestaurant/${user_id}/${name_restaurant}`)
      .then(res => res.data)
      .catch(err => console.log('Error', err))
  }



  postMenu = (menu, restaurant) => {

    this.service.post('newMenu', menu, restaurant)
      .then(res => res.data)
      .catch(err => console.log(err))

  }

}