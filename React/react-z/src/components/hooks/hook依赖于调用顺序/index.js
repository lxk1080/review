import React, { useState } from 'react'
import Teach from './Teach'

function HookTest() {
  const [couseName, setCouseName] = useState('math');

  return (
    <div>
      <Teach couseName={couseName} />
      <button onClick={() => setCouseName(couseName === 'math' ? 'english' : 'math')}>Change Couse</button>
    </div>
  )
}

export default HookTest
