// import React, { Component } from 'react';
// import Counter from "./Counter";

// class Counters extends Component {
//     state = { 
//         counters : [
//             {id: 1, name: "Tomasz", surname:"Ostrowski", email: "t.z.ostowski@gmail.com", points: 6, wonMatches: 2, lostMatches: 0},
//             {id: 2, name: "Mateusz", surname:"Waćkowski", email: "wackowski.m@gmail.com", points: 2, wonMatches: 1, lostMatches: 0},
//             {id: 3, name: "Piotr", surname:"Żołądziejewski", email: "zolad@gmail.com", points: 3, wonMatches: 0, lostMatches: 5},
//             {id: 4, name: "Marcin", surname:"Woźniak", email: "zolad@gmail.com", points: 2, wonMatches: 1, lostMatches: 0}
//         ]
//      }

//     handleDelete = (zawodnikId) => {
//         // console.log("Event Handler Called", zawodnikId)
//         const zawodnicy = this.state.counters.filter(c => c.id !== zawodnikId);
//         this.setState( { counters: zawodnicy});

//     }

//      render() { 
//         return ( 
//             <React.Fragment>
//                 <h2>Lista zawodników</h2>
//                 <table className="table table-hover">
//                     <thead>
//                         <tr> 
//                             <th scope="col">#</th>
//                             <th scope="col">Imię</th>
//                             <th scope="col">Nazwisko</th>
//                             <th scope="col">Statystyki</th>
//                             <th></th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                      { this.state.counters.map(counter => 
//                         <tr key={counter.id} >
//                             <Counter key={counter.id} onDelete={this.handleDelete} counter={counter} />
//                         </tr>
//                       )}
//                     </tbody>
//                 </table>
                    
                    
//             </React.Fragment>
//          );
//     }
// }
 
// export default Counters;