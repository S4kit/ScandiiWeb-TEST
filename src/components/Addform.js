import React from "react";

import "../App.css"
export default class Addform extends React.Component {


    constructor(props) {

        super(props);
        this.state = {
            typespec: "",
            L: "",
            H: "",
            W: "",
            typep: "",
            price: "",
            sku: "",
            name: "",
            Product: []
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit() {
        this.state.Product.push(this.state.sku)
        this.state.Product.push(this.state.name)
        this.state.Product.push(this.state.price)
        this.state.Product.push(this.state.typespec)
        if (this.state.L && this.state.H && this.state.W) {
            const cot = `${this.state.L}x${this.state.H}x${this.state.W}`
            this.state.Product.push(cot)
        } else {
            this.state.Product.push(this.state.typep)
        }

        await fetch('Controller/controller.php', {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.Product)
        }).catch(err => {
            // Do something for an error here
            console.log("Error Reading data " + err);
        });
    }



    render() {

        let TypeLabel
        if (this.state.typespec === "DVD") {
            TypeLabel = <label>
                Size (MB):<input id="size" required min="0" onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                    name="typep" type="number" value={this.state.value} onChange={(e) => this.setState({ typep: e.target.value })} placeholder="1024Mb is 1Gb" />
                <p>*Insert here your DVD size on MB</p>
            </label>
        }
        if (this.state.typespec === "Book") {

            TypeLabel = <label>
                Weight (KG):<input id="weight" required min="0" onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                    name="typep" type="number" value={this.state.value} onChange={(e) => this.setState({ typep: e.target.value })} placeholder="1000g is 1KG" />
                <p>*Insert here your Book Weight</p>
            </label>

        }
        if (this.state.typespec === "Furniture") {

            TypeLabel =
                <div>
                    <label>
                        Height (CM):<input id="height" min="0" onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                            required name="H" type="number" value={this.state.value} onChange={(e) => this.setState({ H: e.target.value })} placeholder="1 Méter equal to 1000 CM" />

                        Width (CM):<input id="width" min="0" onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                            required name="W" type="number" value={this.state.value} onChange={(e) => this.setState({ W: e.target.value })} placeholder="..." />

                        Length (CM):<input id="lenght" min="0" onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                            required name="L" type="number" value={this.state.value} onChange={(e) => this.setState({ L: e.target.value })} placeholder="..." />

                    </label>
                    <p>*Insert here your Furniture deminions size (HxWxL)</p>
                </div>
        }


        return (
            <div>

                <form id="product_form" action="/" onSubmit={this.handleSubmit}>
                    <button className="btn btn-primary bg-secondary border rounded-0 shadow d-inline float-end" type="submit" >Save</button>
                    <br />

                    <div className="formular">
                        <label>
                            SKU:<input id="sku" required name="sku" type="text" value={this.state.value} onChange={(e) => this.setState({ sku: e.target.value })} />
                        </label><br />
                        <label>
                            Name:<input id="name" required name="name" type="text" value={this.state.value} onChange={(e) => this.setState({ name: e.target.value })} />
                        </label><br />
                        Price:
                        <label>
                            <input id="price" required min="0" onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                                name="price" type="number" value={this.state.value} onChange={(e) => this.setState({ price: e.target.value })} />
                        </label><br />
                        Type Switcher:
                        <label>
                            <select id="productType" required type="text" name="type" value={this.state.value} onChange={(e) => this.setState({ typespec: e.target.value })} >
                                <option value="">--What is your product Type--</option>
                                <option id="DVD" value="DVD">DVD</option>
                                <option id="Book" value="Book">Book</option>
                                <option id="Furniture" value="Furniture">Furniture</option>
                            </select>
                        </label>

                        {TypeLabel}


                    </div>
                </form>

            </div>
        )
    }

}

