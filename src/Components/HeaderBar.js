import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
export default class HeaderBar extends Component {
  render() {
    return (
      <Container>
        <Header>
         
          <Body>
            <Title>Authentication</Title>
          </Body>
          
        </Header>
      </Container>
    );
  }
}