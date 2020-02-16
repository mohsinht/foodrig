import React from 'react';
import { Input } from 'antd';
const { Search } = Input;

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log();
    const profile = this.props.profileData;
    const dash_content = profile.customer_profile ? (
      <div className='new-container'>
        <div className='new-title'>Add a new Order</div>

        <div className='new-search'>
          <Search
            placeholder='search nearby kitchens'
            onSearch={value => console.log(value)}
            style={{ maxWidth: 400 }}
          />
        </div>
      </div>
    ) : (
      ''
    );

    const user_first_name = this.props.profileData
      ? this.props.profileData.first_name
      : '';
    return (
      <div>
        Welcome <strong>{user_first_name}</strong>
        {dash_content}
      </div>
    );
  }
}

export default HomePage;
