import PropTypes from 'prop-types';
import React from 'react';
import Head from 'next/head';

/**
 * Base component (wrapper) for the pages
 */
const Layout = ({ children, title }) =>
  <React.Fragment>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>
        {title}
      </title>
      <link rel="stylesheet" href="/_next/static/style.css" />
    </Head>
    {children}
  </React.Fragment>;

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
};

export default Layout;
