'use strict'

// Packages
import React from 'react'
import PropTypes from 'prop-types'

const Pokemon = ({ src }) => {
  return (
    <div style={{ backgroundImage: `url(${src})` }}>
      <style jsx>{`
        div {
          margin: 50px 20px;
          border-radius: 4px;
          display: inline-block;
          width: 200px;
          height: 200px;
          background-size: cover;
        }
      `}</style>
    </div>
  )
}

Pokemon.propTypes = {
  src: PropTypes.string.isRequired
}

export default Pokemon
