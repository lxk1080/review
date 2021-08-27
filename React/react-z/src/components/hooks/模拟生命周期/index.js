import React, { useState } from 'react'
import FriendStatus from './FriendStatus'

function MoniCycles() {
  const [id, setId] = useState(1);

  return (
    <div>
      <FriendStatus friendId={id} />
      <button onClick={() => setId(id + 1)}>id++</button>
    </div>
  )
}

export default MoniCycles
