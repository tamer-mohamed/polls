import PropTypes from 'prop-types';
import Router from 'next/router';
import React from 'react';
import NProgress from 'nprogress';
import Head from 'next/head';
import { Row, Col } from 'antd';

const grid = { md: 20 };

Router.onRouteChangeStart = url => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

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
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default Layout;
