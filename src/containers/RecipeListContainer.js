import { connect } from 'react-redux';
import { selectRecipeOnList, filterRecipeList, fetchRecipesIfNeeded, deleteRecipe } from '../actions/recipe-actions';
import RecipeList from '../components/RecipeList';

import { openModalNewRecipe } from '../actions/modal-actions';

const getVisibleRecipes = (recipes, filterText) => {
  if (filterText.length === 0) {
    return recipes;
  }
  const result = {};
  Object.entries(recipes).forEach(([k, v]) => {
    if (v.title.startsWith(filterText)) {
      result[k] = v;
    }
  });
  return result;
};

const mapStateToProps = state => {
  return {
    isFetching: state.entity.recipes.isFetching,
    recipes: getVisibleRecipes(state.entity.recipes.byId, state.status.recipeList.filterText),
    selectedRecipeId: state.status.recipeList.selectedRecipeId,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onRecipeRowClick: id => {
      dispatch(selectRecipeOnList(id));
    },
    onSearchInputChange: filterText => {
      dispatch(filterRecipeList(filterText));
    },
    fetchRecipesIfNeeded: () => {
      dispatch(fetchRecipesIfNeeded());
    },
    openModalNewRecipe: () => {
      dispatch(openModalNewRecipe());
    },
    onClickRecipeDeleteBtn: id => {
      dispatch(deleteRecipe(id));
    },
  };
}

const RecipeListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeList);

export default RecipeListContainer;
