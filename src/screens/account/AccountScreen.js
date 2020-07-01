import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Icon,
  Left,
  Right,
  Text,
  ListItem,
} from 'native-base';
import {View, Image} from 'react-native';
import React, {Component} from 'react';
import {CommonHeader} from '../../components/CommonHeader';

import styles from './style';

function AccountScreen() {
  return (
    <Container>
      <Content>
        <CommonHeader title="Account" hideLeftButton={true} />
        <View style={{alignSelf: 'center'}}>
          <View style={styles.profileImage}>
            <Image
              source={require('../../../assets/andi.png')}
              style={styles.image}
              resizeMode="center"
            />
          </View>
          <View style={styles.dm} />
        </View>
      </Content>
    </Container>
  );
}

export default AccountScreen;
