// import React, { Component } from 'react'


// class Counter extends Component {
//     state = { 
//         id: this.props.counter.id,
//         name: this.props.counter.name,
//         surname: this.props.counter.surname,
//         email: this.props.counter.email,
//         points: this.props.counter.points,
//         wonMatches: this.props.counter.wonMatches,
//         lostMatches: this.props.counter.lostMatches
//      }


//     render() { 
//         const zawodnik = this.state;

//         return ( 
//             <React.Fragment>
//                 <th> {zawodnik.id} </th>
//                 <td> {zawodnik.name} </td>
//                 <td>{zawodnik.surname} </td>
//                 <td> 
//                  <div className="badge badge-light">
//                     <span className="badge m-2 badge-primary">{zawodnik.points}</span>
//                     <span className="badge m-2 badge-success">{zawodnik.wonMatches}</span>
//                     <span className="badge m-2 badge-secondary">{zawodnik.lostMatches}</span>
//                  </div>
//                 </td>
                
//                 <td>
//                     <button onClick={() => this.props.onDelete(this.props.counter.id)} className="btn btn-danger btn-sm m-2">Usuń</button>
//                 </td>
//             </React.Fragment>
//          );
//     }
// }
 
// export default Counter;














// // class Counter extends Component {
// //     state = { 
// //         value: this.props.value,
// //         tags: ['tag1', 'tag2', 'tag3'] 
// //     };


// //     render() { 

// //         let classes = this.changeBadgeClasses();

// //         return ( 
// //             <React.Fragment>
// //                 <span className={ classes }>{this.formatCount()} </span>
// //                 <button onClick={ () => this.handleIncrement({id: 1})} className="btn btn-secondary btn-sm">Dodaj</button>
// //                 <ul>
// //                     {this.state.tags.map(tag => <li key={tag}> {tag} </li>)}
// //                 </ul>
// //             </React.Fragment>
// //          );
// //     }

// //     changeBadgeClasses() {
// //         let classes = "badge m-2 badge-";
// //         classes += (this.state.value === 0) ? "warning" : "primary";
// //         return classes;
// //     }

// //     formatCount(){
// //         const { value: count } = this.state;
// //         return count === 0 ? 'Zero' : count;
// //     }

// //     handleIncrement = (product) => {
// //         console.log(product)
// //         this.setState( { value: this.state.value +1});
// //     }
   
// // }
 

// // export default Counter;
