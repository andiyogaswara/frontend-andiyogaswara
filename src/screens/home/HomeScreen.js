import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  View,
  Button,
  Icon,
} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {CommonHeader} from '../../components/CommonHeader';
import {showError} from '../../utils/toast';
import {findById, save} from '../../actions/Contacts';
import {RefreshControl, Alert} from 'react-native';
import {findAll, deleteById} from '../../actions/Contacts';
import styles from './styles';

function RowContact({contact, onPress}) {
  return (
    <Content>
      <List>
        <ListItem avatar style={styles.item} onPress={() => onPress(contact)}>
          <Left>
            <Thumbnail source={{uri: contact?.photo}} />
          </Left>
          <Body>
            <Text>
              {contact?.firstName} {contact?.lastName}
            </Text>
          </Body>
        </ListItem>
      </List>
    </Content>
  );
}

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount = () => {
    this.reload();
  };

  componentDidUpdate(prevProps, prevState) {
    const {data, savedata, deletedata} = this.props;

    if (prevProps.data !== data) {
      this.setState({
        data: data?.data,
      });
    } else if (
      prevProps.deletedata !== deletedata ||
      prevProps.savedata !== savedata
    ) {
      this.onRefresh();
    }
  }

  reload() {
    this.props.findAll();
  }

  onRefresh = () => {
    this.setState({data: []}, () => this.reload());
  };

  onChange = (name, value) => {
    this.setState({[name]: value});
  };

  onSubmit = () => {
    this.props.save(this.state);
  };

  onEndReached = () => {
    const {data, total, params} = this.state;
    if (data.length < total) {
      this.reload({
        ...params,
        page: params.page + 1,
      });
    }
  };

  onDelete = contact => {
    Alert.alert('Confirmation', 'delete this unit?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => this.props.deleteUnitById(contact.id),
      },
    ]);
  };

  onAdd = () => {
    this.props.navigation.navigate('Contact');
  };

  onShowForm = contact => {
    this.props.navigation.navigate(
      'Contact',
      contact ? {id: contact.id} : null,
    );
  };

  onSearch = () => {
    const {search, params} = this.state;
    this.setState({data: []}, () => this.reload(this.state.params));
  };

  render() {
    const {navigation, loading} = this.props;
    const {data, search} = this.state;

    return (
      <Container>
        <CommonHeader title="Contact" hideLeftButton={true} />
        <SwipeListView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
          }
          data={data}
          renderItem={({item}) => (
            <RowContact onPress={this.onShowForm} item={item} />
          )}
          renderHiddenItem={data => (
            <View style={styles.hiddenItem}>
              <Button onPress={() => this.onDelete(data.item)}>
                <Icon name="md-trash" />
              </Button>
            </View>
          )}
          rightOpenValue={-60}
          keyExtractor={item => item.id.toString()}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
        />
        <Content>
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require('../../../assets/andi.png')} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>
                  Doing what you like will always keep you happy . .
                </Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  savedata: state.Contacts.data,
  data: state.Contacts.data,
  loading: state.Contacts.loading,
  error: state.Contacts.error,
  deletedata: state.deletedContactById.data,
});

const mapDispatchToProps = {
  findAll,
  deleteById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
