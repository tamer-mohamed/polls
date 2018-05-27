import PropTypes from 'prop-types';
import React from 'react';
import Head from 'next/head';
import { Row, Col } from 'antd';

const grid = { md: 20 };

/**
 * Base component (wrapper) for the pages
 */
const Layout = ({ children, title }) =>
  <div>
    <Head>
      <title>
        {title}
      </title>
    </Head>
    <Row type="flex" align="center">
      <Col {...grid}>
        {children}
      </Col>
    </Row>
  </div>;

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
};

export default Layout;
