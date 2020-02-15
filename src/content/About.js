import React from 'react';
import { Button } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../App.css';

class About extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>About</h1>

        <h3>What is FoodRig?</h3>
        <p>
          Cleanliness and sanitation in rural areas is a big concern these days
          and people die everyday due to unhygenic and virus infected food. This
          is mainly due to lack of awareness and lack of consciousness of having
          clean kitchens. People do not have a reliable food source that ensures
          quality, taste and measures of cleanliness. And the companies or the
          restaurants that do so, cost a lot of money if we talk about
          day-to-day food routine.
        </p>
        <p>
          <strong>FoodRig</strong> is a kitchen setup for backward areas that is
          guaranteed to be clean and sanitated. There will be only ONE kitchen
          in a community so that certified authorities can do surveillance and
          quality assurance of the environment. The community will control the
          kitchen themselves by making and controlling food delivery. The food
          is ensured to be of high quality and is crowd rated by the daily
          consumers. FoodRig will be started in communities and people in the
          community can come at any desired time to the kitchen and work as a
          chef. People at home can order online from their favorite chefs.
        </p>

        <h3>Who are chefs on FoodRig?</h3>
        <p>
          House-wives or any person who is looking for an extra income can
          register themselves as a Chef on FoodRig and start cooking their
          special dishes at their desired time. They can select a time-slot
          during the day or the night and work in the controlled environment.
          The chefs are required to qualify a quality and taste test.
        </p>

        <h3>How many chefs can work simultaneously in a FoodRig Kitchen?</h3>
        <p>
          Depending on how many stoves are available in the kitchen. An admin or
          the kitchen manager can arrange any number of stoves depending on the
          demand of the area. A typical community can have 4 chefs working at
          once in the kitchen.
        </p>

        <h3>Why would anyone order at FoodRig?</h3>
        <p>
          Home-cooked food is seldom available nowadays. Food from FoodRig will
          be cheap in cost because the chefs will be local people and the
          ingredients for the recipe will be arranged by the kitchen managers.
          Additionally, the prices will be decided by the kitchen managers.
          Hostelized students or office workers who require daily food can order
          from FoodRig and get home-cooked fresh food everyday.
        </p>

        <h3>Which Sustainable Development Goals it targets?</h3>
        <p>
          <div style={{ width: '100px', display: 'inline-block' }}>
            <img
              alt='Zero Hunger Logo'
              src='https://d33wubrfki0l68.cloudfront.net/63f1c58b350bdc834393882f478a42e557a3ba18/96195/img/uploads/2.svg'
            />
          </div>
          &nbsp;
          <div style={{ width: '100px', display: 'inline-block' }}>
            <img
              alt='Good Health and Well-Being Logo'
              src='https://d33wubrfki0l68.cloudfront.net/a6ca22f0c4c5fe70627dd26fe057f84040d16493/01829/img/uploads/3.svg'
            />
          </div>
          &nbsp;
          <div style={{ width: '100px', display: 'inline-block' }}>
            <img
              alt='No Poverty Logo'
              src='https://d33wubrfki0l68.cloudfront.net/2997051f5c8772d5e92f3f25d691c1cb9dacfb7a/4dcb1/img/uploads/1.svg'
            />
          </div>
          &nbsp;
          <div style={{ width: '100px', display: 'inline-block' }}>
            <img
              alt='Gender Equality Logo'
              src='https://d33wubrfki0l68.cloudfront.net/02082799b3b06849f8491f43440448d838091eaf/ce520/img/uploads/5.svg'
            />
          </div>
        </p>
      </React.Fragment>
    );
  }
}

export default About;
