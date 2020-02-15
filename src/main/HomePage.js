import React from 'react';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log();
    const user_first_name = this.props.profileData
      ? this.props.profileData.first_name
      : '';
    return (
      <div>
        Welcome <strong>{user_first_name}</strong>
      </div>
    );
  }
}

export default HomePage;
