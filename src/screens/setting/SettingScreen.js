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
import React, {Component} from 'react';
import {CommonHeader} from '../../components/CommonHeader';

function SettingScreen() {
  return (
    <Container>
      <Content>
        <CommonHeader title="Setting" hideLeftButton={true} />
        <Text>Setting</Text>
      </Content>
    </Container>
  );
}

export default SettingScreen;
