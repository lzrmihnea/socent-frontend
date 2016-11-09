
// Transform to Stateless Functional Components when finished

import React, {Component, PropTypes} from "react";
import {Link} from "react-router";
import {Drawer, Card, CardHeader, Divider} from "material-ui";
import ActionHome from "material-ui/svg-icons/action/home";
import ActionStore from "material-ui/svg-icons/action/store";
import ActionSettings from "material-ui/svg-icons/action/settings";
import ActionHelp from "material-ui/svg-icons/action/help";
import SocialPeople from "material-ui/svg-icons/social/people";
import {List, ListItem, makeSelectable} from "material-ui/List";


export default class Sidebar extends Component {
  state = {
    openNavItem: false,
  };

  handleToggle = () => {
    this.setState({
      openNavItem: !this.state.openNavItem,
    });
  };

  handleNestedListToggle = (item) => {
    this.setState({
      openNavItem: item.state.openNavItem,
    });
  };
  render() {
    return (

        <Drawer
          containerStyle={{height: 'calc(100% - 64px)', top: 64}}
          open={this.props.open}>
            <Card>
              <CardHeader
                title={this.props.profile.name}
                subtitle='Bine ai venit'
                avatar={this.props.profile.picture}
              />
            </Card>
            <SelectableList defaultValue="dashboard">
              <ListItem
                value="dashboard"
                primaryText="Dashboard"
                leftIcon={<ActionHome />}
                containerElement={<Link to="/admin" />} />
              <ListItem
                primaryText="Intreprinderi"
                leftIcon={<ActionStore />}
                initiallyOpen={false}
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem
                    value="intreprinderi.lista"
                    key={1}
                    insetChildren={true}
                    primaryText="Lista"
                    containerElement={<Link to="/admin/intreprinderi" />}/>,
                  <ListItem
                    value="intreprinderi.inregistrare"
                    key={2}
                    insetChildren={true}
                    primaryText="Inregistrare"
                    containerElement={<Link to="/admin/inregistrare" />}/>,
                ]}
              />
              <ListItem
                primaryText="Utilizatori"
                leftIcon={<SocialPeople />}
                initiallyOpen={false}
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem
                    value="utilizatori.lista"
                    key={1}
                    primaryText="Lista"
                    containerElement={<Link to="/admin/utilizatori" />}/>,
                ]}
              />
              <Divider />
              <ListItem
                value="profil"
                primaryText="Profil"
                leftIcon={<ActionSettings />}
                containerElement={<Link to="/admin/profil" />} />
              <ListItem
                value="ajutor"
                primaryText="Ajutor"
                leftIcon={<ActionHelp />}
                containerElement={<Link to="/admin/ajutor" />} />
          </SelectableList>
        </Drawer>

    )
  }
}

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.string.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
          <ComposedComponent
              value={this.state.selectedIndex}
              onChange={this.handleRequestChange}
          >
            {this.props.children}
          </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList)
