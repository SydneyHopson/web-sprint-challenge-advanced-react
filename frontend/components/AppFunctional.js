import React, { useState } from 'react'
import axios from 'axios'


// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {

const [form, setForm] = useState({ X:'', Y:'', steps: '', email: ''})
const [state, setState ] = useState({
    
    message: '',
    email: '',
    steps: 0,
    index: 4,
    grid: [
          { X:1 ,Y: 1 }, {X:2 ,Y: 1} ,{X:3 ,Y: 1 },
          { X:1 ,Y: 2 }, {X:2 ,Y: 2} ,{X:3 ,Y: 2 },
          { X:1 ,Y: 3 }, {X:2 ,Y: 3} ,{X:3 ,Y: 3 } ]
  })
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  const getXY = () => { 
    // square moving
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }
  

  const getXYMessage = () => {
    // actual coordinates
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  const reset = () => {
    setState({
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
  // This helper takes a direction ("left", "up", etc) and calculates what the next index
  // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }


 const moveDown = () => {
    if(state.index === 6 || state.index === 7 || state.index === 8 ){
      console.log('tada')
      setState({
        ...state,
        message: "You can't go down"
      })}
      else {
    setState({
    ...state, 
    index: state.index +3,
    steps: state.steps +1
    })}
  }






  
 const moveUp = () => {
    if(state.index === 1 || state.index === 2|| state.index === 0 ){
      console.log('tada')
      setState({
        ...state,
        message: "You can't go up"
      })}
      else{
    setState({
    ...state, 
    index: state.index -3,
    steps: state.steps +1
    })}
  }





  const moveRight = () => {
    if(state.index === 5 || state.index === 8 || state.index === 2 ){
      console.log('tada')
      setState({
        ...state,
        message: "You can't go right"
      })}else{
    setState({
    ...state, 
    index: state.index +1,
    steps: state.steps +1
    })}
  }


  const moveLeft = () => {
    if(state.index === 3 || state.index === 0 || state.index === 6 ){
      console.log('tada')
      setState({
        ...state,
        message: "You can't go left"
      })}
      else{
    setState({
    ...state, 
    index: state.index -1,
    steps: state.steps + 1
    
    })}
  }
   const onChange = (evt) => { 
    const email = evt.target.value;
    console.log(email)
    setState({ 
    ...state,

  
    email: email })
    console.log(evt.target.email, evt.target.value)
    // You will need this to update the value of the input.
  }

 const onSubmit = (evt) => {
  console.log('form was submitted')
 evt.preventDefault();
 const newForm = { x: state.grid[state.index].X, y: state.grid[state.index].Y, steps: state.steps , email: state.email}
 console.log(newForm)
 
   axios.post('http://localhost:9000/api/result', newForm)
    .then(res => {
      console.log(res)
      setState({
        ...state,
        email: "",
        
        
       
        message: `${res.data.message}`,
      })
    })
   .catch(err => {
    console.log(err)
    setState({
      ...state,
      message: `${err.message}`,
      message: `${err.response.data.message}`
      
    })
   })
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
     <div className="info">
          <h3 id="coordinates">{`Coordinates (${state.grid[state.index].X}, ${state.grid[state.index].Y})`}</h3>
          <h3 id="steps">{`You moved ${state.steps} ${state.steps === 1 ? 'time' : 'times'}`}</h3>
        </div>
        <div id="grid">
          {
            state.grid.map((val, idx, index) => (     //where ever the idx is the style will go
              <div  key={idx} className={`square ${state.index === idx ? ' active' : ''}`}>
               {/* where ever the idx is the letter will go */}
                { idx === state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{state.message}</h3> 
          </div>

        <div id="keypad">
          <button onClick={()=> {
            moveLeft();
          }} id="left">LEFT</button>
          
          
          
          
          
          <button onClick={()=>{
            moveUp();
          }} id="up">UP</button>
            


          <button onClick={() => {
            moveRight();
         }} id="right">RIGHT</button>


          <button onClick={() => {
            moveDown();
          }} id="down">DOWN</button>




          <button onClick={() => {
            reset();
          }} id="reset">reset</button>
        </div>
      <form>
        <input id="email" 
         type="email" 
         placeholder="type email" 
         value={state.email}
         onChange={onChange}
         />


        <input id="submit" 
        type="submit"
        onClick={onSubmit}
        ></input>
      </form>
    </div>
  )
}
