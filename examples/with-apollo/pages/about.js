'use strict'

// Packages
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// Layouts
import App from '../layouts/app'

// Components
import Pokemon from '../components/pokemon'

// HOC
import withData from '../hoc/with-data'

class About extends Component {
  render() {
    const { data } = this.props
    const { pokemons } = data

    return (
      <App>
        <h1>About</h1>
        <p>OMG! This is an awesome about page (with fetch)</p>

        {pokemons.map(({ name }) => {
          return (
            <Pokemon
              src={`https://img.pokemondb.net/artwork/${name.toLowerCase()}.jpg`}
              key={name}
            />
          )
        })}

        <style jsx>{`
          h1 {
            font-size: 50px;
            font-weight: 700;
            color: #23183d;
          }

          p {
            font-size: 22px;
            margin-top: 10px;
            font-weight: 500;
            color: #b2b6bf;
          }
        `}</style>
      </App>
    )
  }
}

About.propTypes = {
  data: PropTypes.object
}

export const getPokemons = gql`
  query {
    pokemons(first: 4) {
      name
    }
  }
`

export default withData(
  graphql(getPokemons, {
    props: ({ data }) => ({
      data
    })
  })(About)
)
