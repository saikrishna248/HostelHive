import React from 'react'
import { useState, useEffect } from 'react'

function GettingData() {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const GetData = async () => {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/posts"
            );
            const result = await response.json();
            setItems(result);
        };
        GetData();
    }, []);
    console.log(items);
    return (
        <>
            <div className="App">
                <h1>Posts Data</h1>

                <table border="1">
                    <thead>
                        <tr>
                            <th>UserId</th>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Body</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.userId}</td>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.body}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>)
    
}

export default GettingData