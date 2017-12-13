import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import RecipeRow from './RecipeRow';
import Spinner from 'react-spinkit';
import '../styles/App.css';

// TODO: Move the button away
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class RecipeList extends Component {
    static propTypes = {
      isFetching: PropTypes.bool.isRequired,
      recipes: PropTypes.object.isRequired,
      selectedRecipeId: PropTypes.string.isRequired,
      onRecipeRowClick: PropTypes.func.isRequired,
      fetchRecipes: PropTypes.func.isRequired,
      openModalNewRecipe: PropTypes.func.isRequired,
      onSearchInputChange: PropTypes.func.isRequired,
      onClickRecipeDeleteBtn: PropTypes.func.isRequired,
    }

    componentDidMount() {
      this.props.fetchRecipes();
    }

    onSearchInputChange = (searchText) => {
      this.props.onSearchInputChange(searchText);
    };

    render() {
      if (this.props.isFetching) {
        return (
          <div className="Spinner">
            <Spinner name="chasing-dots" color="gray" />
          </div>
        )
      }
      return (
        <div className='Recipe-list'>
          <TextField
            hintText='Search'
            style={{
              paddingLeft: 10,
            }}
            onChange={(e, val) => this.onSearchInputChange(val)}
          />
          <List>
            {Object.keys(this.props.recipes).map(key => (
              <RecipeRow
                key={key}
                id={key}
                title={this.props.recipes[key].title}
                selected={this.props.selectedRecipeId === key}
                onClick={() => this.props.onRecipeRowClick(key)}
                onClickDeleteBtn={(id) => this.props.onClickRecipeDeleteBtn(id)}
              />
            ))}
          </List>
          <FloatingActionButton
            onClick={this.props.openModalNewRecipe}
            style={{position: 'fixed', top: 50, right: 30}}
          >
            <ContentAdd />
          </FloatingActionButton>
        </div>
      );
    }
}

export default RecipeList;
