import React from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default class AppClass extends React.Component {
  


  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  // Declear state here step 1:

  state = {
    
    message: '',
    email: '',
    steps: 0,
    index: 4,
    grid: [
          { X:1 ,Y: 1 }, {X:2 ,Y: 1} ,{X:3 ,Y: 1 },
          { X:1 ,Y: 2 }, {X:2 ,Y: 2} ,{X:3 ,Y: 2 },
          { X:1 ,Y: 3 }, {X:2 ,Y: 3} ,{X:3 ,Y: 3 } ]
   

  }
  getXY = (index) => { 
    this.setState({
      index: this.state.grid ,
     })
    //  console.log(getXY)
    
    // square moving
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }
  

  getXYMessage = () => {
    this.setState({

    })

   
    // actual coordinates


    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  reset = () => {
    this.setState({
    
      message: '',
      email: '',
      steps: 0,
      index: 4,
      grid: [
            { X:1 ,Y: 1 }, {X:2 ,Y: 1} ,{X:3 ,Y: 1 },
            { X:1 ,Y: 2 }, {X:2 ,Y: 2} ,{X:3 ,Y: 2 },
            { X:1 ,Y: 3 }, {X:2 ,Y: 3} ,{X:3 ,Y: 3 } ]
     
  
    })

    // default reset
   // Use this helper to reset all states to their initial values.
  }

  getNextIndex = (direction) => {
    if(this.state.grid[this.moveLeft]){
      this.setstate({
        ...this.state,
        message: 'You cant go left'
      })
    }
    
   
  

    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }


  moveDown = () => {
    if(this.state.index === 6 || this.state.index === 7 || this.state.index === 8 ){
      console.log('tada')
      this.setState({
        ...this.state,
        message: " You can't go down"
      })}
      else {
    this.setState({
    ...this.state, 
    index: this.state.index +3,
    steps: this.state.steps +1
    })}
  }
  moveUp = () => {
    if(this.state.index === 1 || this.state.index === 2|| this.state.index === 0 ){
      console.log('tada')
      this.setState({
        ...this.state,
        message: " You can't go up"
      })}
      else{
    this.setState({
    ...this.state, 
    index: this.state.index -3,
    steps: this.state.steps +1
    })}
  }
  moveRight = () => {
    if(this.state.index === 5 || this.state.index === 8 || this.state.index === 2 ){
      console.log('tada')
      this.setState({
        ...this.state,
        message: " You can't go right"
      })}else{
    this.setState({
    ...this.state, 
    index: this.state.index +1,
    steps: this.state.steps +1
    })}
  }
  moveLeft = () => {
    if(this.state.index === 3 || this.state.index === 0 || this.state.index === 6 ){
      console.log('tada')
      this.setState({
        ...this.state,
        message: " You can't go left"
      })}
      else{
    this.setState({
    ...this.state, 
    index: this.state.index -1,
    steps: this.state.steps + 1
    
    })}
  }
  
  
  

  onChange = (evt) => { 
    const email = evt.target.value;
    console.log(email)
    this.setState({ 
    email: email });
   

    console.log(evt.target.email, evt.target.value)
    // const {  email, value } = evt.target
    // this.setState.email
    // setState({...form, [email]: value })

    
    
    // You will need this to update the value of the input.
  }
  

  onSubmit = (evt) => {
    console.log('form was submitted')
   evt.preventDefault();
   const newForm = { x: this.state.grid[this.state.index].X, y: this.state.grid[this.state.index].Y, steps: this.state.steps , email: this.state.email}
   console.log(newForm)
    

  
    axios.post('http://localhost:9000/api/result', newForm)
    .then(res => {
      console.log(res)
      this.setState({
        ...this.state,
      message: `${res.data.message}`
      })
    })
   .catch(err => {
    console.log(err)
    this.setState({
      ...this.state,
      message: `${err.message}`
    })
   })
    // Use a POST request to send a payload to the server.
  }

  render() {
    const { className } = this.props;
    const { index, steps, onChange, onSubmit, grid, move  } = this.state;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${grid[index].X}, ${grid[index].Y})`}</h3>
          <h3 id="steps">{`You moved  ${steps} ${steps <= 1 ? 'time' : 'times'}`}</h3>
        </div>
        <div id="grid">
          {
            grid.map((val, idx) => (     //where ever the idx is the style will go
              <div  key={idx} className={`square${idx === index ? ' active' : ''}`}>
               {/* where ever the idx is the letter will go */}
                {idx === index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3> 
          </div>

        <div id="keypad">
          <button onClick={()=> {
            this.moveLeft();
          }} id="left">LEFT</button>
          
          
          
          
          
          <button onClick={()=>{
            this.moveUp();
          }} id="up">UP</button>
            


          <button onClick={() => {
            this.moveRight();
         }} id="right">RIGHT</button>


          <button onClick={() => {
            this.moveDown();
          }} id="down">DOWN</button>




          <button onClick={() => {
            this.reset();
          }} id="reset">reset</button>
        </div>
       
        
        
        
        <form>
          <input 
          id="email" 
          type="email" 
          value={this.state.email}
          placeholder="type email" 
          onChange={this.onChange}/> 
          
          
          
          
          <input  
          onClick={this.onSubmit}
          id="submit" 
          type="submit"/>
        </form>
      </div>
    )
  }
}
