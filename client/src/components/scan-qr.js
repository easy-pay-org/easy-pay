import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'
import { Redirect } from 'react-router-dom'


class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
      redirect: false
    }

    this.handleScan = this.handleScan.bind(this)
  }

  handleScan(data) {

    if (data) {
      data = data.slice(7)
      console.log(data)

      const restaurant_id = data.substring(0, data.indexOf('/'))
      const table_id = data.substring(data.indexOf('/') + 1)

      this.props.setTable(restaurant_id, table_id)

      this.setState({
        result: data,
        redirect: true
      })
    }

    // this.setState({
    //   result: data,
    // })

  }

  handleError(err) {
    console.error(err)
  }
  render() {
    const previewStyle = {
      height: 240,
      width: 320,
    }

    if (this.state.redirect) {
      return <Redirect to={`/${this.state.result}`} />

    } else {
      return (
        <div>
          <QrReader
            delay={this.state.delay}
            style={previewStyle}
            onError={this.handleError}
            onScan={this.handleScan}
          />
          <p>{this.state.result}</p>
        </div>
      )
    }
  }
}

export default Test