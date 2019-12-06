import React from 'react'
import { css } from 'glamor';
import ScrollToBottom from 'react-scroll-to-bottom'

import Message from '../Message/'

const ROOT_CSS = css({
    height: 400,
    width: '100%'
  });

const Messages = ({messages, name, room}) => {
    return (
     <ScrollToBottom className={ ROOT_CSS }>
         {messages.map((message, idx) => {
             return (
             <div key={idx}>
                 <Message room={room} name={name} message={message} />
             </div>
             )
         })}
     </ScrollToBottom>
    )
}

export default Messages