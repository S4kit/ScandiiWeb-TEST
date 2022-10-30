import React from "react";
import "../App.css"
import AddP from "./AddP"
import Header from "./Header";


export default class Comp extends React.Component {


  constructor(props) {
    super(props);



    this.state = {
      count: true,
      checkedBoxes: []
    };

    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.DeleteNow = this.DeleteNow.bind(this)
  }


  toggleCheckbox = (e, item) => {

    if (e.target.checked) {
      let arr = this.state.checkedBoxes;
      arr.push(item.id);

      this.setState = { checkedBoxes: arr };
    } else {
      let items = this.state.checkedBoxes.splice(this.state.checkedBoxes.indexOf(item.id), 1);

      this.setState = {
        checkedBoxes: items
      }
    }

    return this.state.checkedBoxes
  }



  async componentDidMount() {
    await fetch('Controller/controller.php').then(response => {
      return response.json();

    }).then(result => {
      // Work with JSON data here
      this.setState({
        products_rs: result
      });
    }).catch(err => {
      // Do something for an error here
      console.log("Error Reading data " + err);
    });

  }

  DeleteNow() {
    if (this.state.count === false) {
      fetch('Controller/controller.php', {
        method: 'DELETE',
        header: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state.checkedBoxes)
      }).catch(err => {
        // Do something for an error here
        console.log("Error Reading data " + err);
      });

      window.location.reload(false);
    }
    this.setState({ count: false })
  }


  render() {
    const employeeFound = this.state.products_rs && this.state.products_rs.length;
    if (employeeFound) {
      return (

        <div>
          <Header title="Product List" />
          <div style={{ position: 'inherit' }}>
            <AddP />
            <button className="btn btn-primary bg-secondary border rounded-0 shadow d-inline float-end" onClick={this.DeleteNow} >MASS DELETE</button>
          </div>
          {
            this.state.products_rs.map(function (item, index) {

              return (
                <div className="note">
                  <input type="checkbox" className="delete-checkbox" value="{item.id}" checked={this.state.checkedBoxes.find((p) => p.id === item.id)} onChange={(e) => this.toggleCheckbox(e, item)} disabled={this.state.count} />
                  <center>
                    <h1 key={index}>{item.sku}</h1>
                    <h1 >{item.name}</h1>
                    <h1 >{item.price} $</h1>
                    <h1 >{item.type}</h1>
                    <span>{item.spec}</span>
                  </center>
                </div>
              )
            }.bind(this))
          }
        </div>
      )
    } else {
      return (
        <div style={{ position: 'inherit' }}>
          <Header title="List Product" />
          <AddP />
        </div>
      )

    }

  }

}