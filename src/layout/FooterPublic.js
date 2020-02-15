import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../App.css';
const { Header, Content, Footer } = Layout;

class FooterPublic extends React.Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        FoodRig © 2020 Created on Hackathon (Facebook DevC) by students from
        FAST-NU Lahore
      </Footer>
    );
  }
}

export default FooterPublic;
