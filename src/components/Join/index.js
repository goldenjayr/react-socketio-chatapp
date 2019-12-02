import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { TextField } from 'react-md'
import { Button } from 'react-md'

import './Join.scss'

const Join = (props) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    return (
        <div className="join">
            <div>
                <h1>Join</h1>
                <div className="join-text-fields">
                    <TextField id="name" label="Name" placeholder="jayr gwapo" onChange={e => setName(e)} />
                </div>
                <div className="join-text-fields">
                    <TextField id="room" label="Room" placeholder="room 1" onChange={e => setRoom(e)} />
                </div>
                <Link to={`/chat?name=${name}&room=${room}`} onClick={e => (!name || !room) && e.preventDefault()}>
                    <Button raised secondary iconBefore={false} type="submit">Sign In</Button>
                </Link>
            </div>
        </div>
    )
}

export default Join