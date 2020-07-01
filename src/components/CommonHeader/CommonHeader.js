import React, {Component} from 'react';
import {Body, Header, Title, Icon, Button, Left, Right} from 'native-base';
import PropTypes from 'prop-types';
import styles from './styles';
import {StatusBar} from 'react-native';

class CommonHeader extends Component {
  onBackPress = () => {
    const {navigation, backTo} = this.props;
    if (navigation?.navigate) {
      if (typeof backTo === 'string') {
        navigation.navigate(backTo);
      } else {
        navigation.goBack();
      }
    }
  };

  render() {
    const {hideLeftButton, title} = this.props;
    return (
      <Header style={styles.bc}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="orange"
          translucent={false}
        />
        {!hideLeftButton && (
          <Left>
            <Button onPress={this.onBackPress} transparent>
              <Icon name={'ios-arrow-back'} />
            </Button>
          </Left>
        )}
        <Body>
          <Title style={styles.styletitle}>{title}</Title>
        </Body>
      </Header>
    );
  }
}

CommonHeader.propTypes = {
  navigation: PropTypes.object.isRequired,
  hideLeftButton: PropTypes.bool,
  title: PropTypes.string,
};

export default CommonHeader;
