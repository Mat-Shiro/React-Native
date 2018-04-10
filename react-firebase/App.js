import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as firebase from 'firebase';

//Inicializa o firebase
const firebaseConfig = {
  apiKey: "AIzaSyBAi5GHnuqqlgB21t9f8cZkehYNqllC7QM",
  authDomain: "react-firebase-a11b6.firebaseapp.com",
  databaseURL: "https://react-firebase-a11b6.firebaseio.com",
  projectId: "react-firebase-a11b6",
  storageBucket: ""
};

firebase.initializeApp(firebaseConfig);

import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = ({
      email: '',
      senha: ''
    })
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user != null)
      {
        console.log(user)
      }
    })
  }

  cadastroUser = (email, senha) => {
    try {
      if (this.state.senha < 6) {
        alert("A senha deve conter mais que 6 caracteres!")
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, senha);

    }
    catch (error) {
      console.log(error.toString());
    }
  }

  loginUser = (email, senha) => {

    try {
      firebase.auth().signInWithEmailAndPassword(email, senha).then(function (user) {
        console.log(user);
      });
    }
    catch (error) {
      console.log(error.toString());
    }
  }

  async loginComFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync
    ('116087859243246', { permissions: ['public_profile'] });

    if (type == 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      firebase.auth().signInWithCredential(credential).catch((error) => console.log(error));
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({ email })}
            />

          </Item>

          <Item floatingLabel>
            <Label>Senha</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(senha) => this.setState({ senha })}
            />
          </Item>

          <Button style={{ marginTop: 10 }}
            full
            success
            onPress={() => this.loginUser(this.state.email, this.state.senha)}
          >
            <Text style={{ color: 'white' }}> Login</Text>
          </Button>

          <Button style={{ marginTop: 10 }}
            full
            primary
            onPress={() => this.cadastroUser(this.state.email, this.state.senha)}
          >
            <Text style={{ color: 'white' }}> Cadastre - se</Text>
          </Button>

          <Button style={{ marginTop: 10 }}
            full
            primary
            onPress={() => this.loginComFacebook()}
          >
            <Text style={{ color: 'white' }}> Login com Facebook</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 10
  }
});
