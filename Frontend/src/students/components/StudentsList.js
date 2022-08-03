import React from 'react';
import './StudentsList.css'
import Card from '../../shared/components/UIElements/Card';
import StudentItem from './StudentItem';

const StudentsList = (props) => {
    if (props.items.length === 0){
        return (
            <div className='center'>
                <Card>
                    <h2>No Users found!</h2>
                </Card>
            </div>
        );
    }
    else return(
        <ul className='users-list'>
            {props.items.map((user)=>{
                return(
                    <StudentItem 
                        key={user.id} 
                        id={user.id} 
                        image={user.image} 
                        class={user.class} 
                        name={user.name}
                    />
                );
            })}
        </ul>
    ); 
};

export default StudentsList;