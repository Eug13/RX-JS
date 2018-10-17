import React from 'react';
import { Observable } from 'rxjs'

class App extends React.Component {

    constructor() {
        super();
        // this.handleAddProject = this.handleAddProject.bind(this);
        this.state = {
            todos: [],
            posts:[],
            users:[]
        }
    }

    componentDidMount() {
        this.getTodos();
    }


    getTodos = () => {
        const that = this;
      
        const obs = Observable.create(function (observer) {
            observer.next(
                fetch('https://jsonplaceholder.typicode.com/todos')
                    .then(res => res.json())
                    // .then(res => console.log(res))
                    .then(res => that.setState({
                        todos: res
                    }))
                    .catch(err => console.log(err))

            );
            observer.next(
                fetch('https://jsonplaceholder.typicode.com/posts')
                    .then(res => res.json())
                    // .then(res => console.log(res))
                    .then(res => that.setState({
                        posts: res
                    }))
                    .catch(err => console.log(err))
            );
            setTimeout(() => {
                observer.next(
                    fetch('https://jsonplaceholder.typicode.com/users')
                    .then(res => res.json())
                    // .then(res => console.log(res))
                    .then(res => that.setState({
                        users: res
                    }))
                    .catch(err => console.log(err))
                );
                observer.complete();
              }, 1000);
        })
    
        obs.subscribe({
            next: x => x,
            error: err => console.error(err),
            complete: () => console.log('done')
        })
    }

    getData = () => {
        let data = this.state.todos;
        return data.map((item, index) => {
            return <div key={index}>
                <h1>List ID: {item.id}</h1>
                <h2>Title: {item.title}</h2>
                <hr />
            </div>
        })
    }

    render() {
       if(this.state.todos){
        console.log(this.state.todos)
        console.log(this.state.posts)
        console.log(this.state.users)
       }
        return (
            <div className='App'>
                {/* {data} */}
            </div>
        );
    }
}


export default App;
