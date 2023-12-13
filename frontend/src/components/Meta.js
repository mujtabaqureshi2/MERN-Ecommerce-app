import React from 'react'
import { Helmet } from 'react-helmet'
const Meta = ({title, description, keywords}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description}/>
      <meta name='keword' content={keywords}/>
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome To Fashion Plus',
  description: "We sell the best products",
  keywords: "branded suits, pakistani design, bridal suits"
}

export default Meta
