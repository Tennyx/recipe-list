
var data = [];

if(JSON.parse(localStorage.getItem('_username_recipes'))){
  var data = JSON.parse(localStorage.getItem('_username_recipes'));
};

const Title = React.createClass({
  render: function(){
    return <h1>RECIPE<span>LIST</span></h1>;
  }   
});

const Modal = React.createClass({
  render: function (){
    return(
    <div id="myModal" className="modal fade" role="dialog">
   <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title">Add Recipe</h4>
      </div>
      
      <div className="modal-body">
       
          <div className="form-group">
            <label  className="col-sm-2 control-label" for="recipeInput">Recipe</label>
             <div className="col-sm-10">
              <input className="form-control" id="recipeInput" placeholder="Name"/>
             </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label" for="ingInput">Ingredients</label>
            <div className="col-sm-10">
              <textarea type="password" className="form-control" id="ingInput" placeholder="Enter Ingredients, seperated by commas."></textarea>
            </div>
          </div>
          
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button id="pushRecipe" type="submit" className="btn btn-success" data-dismiss="modal" onClick={this.props.submit} >SUBMIT</button>
            </div>
          </div>
   
      </div>
     
    </div>

    </div>
</div>
   );
  }  
});

const Cell = React.createClass({
  render: function () {
    return(
      <div>
        <div className="panel-heading" role="tab" id={"heading" + this.props.num}>
            <h4 className="panel-title">
              <a role="button" data-toggle="collapse" data-parent="#accordion" href={"#collapse" + this.props.num} aria-expanded="true" aria-controls={"collapse" + this.props.num}>
                {this.props.meal}
              </a>
            </h4>
        </div>
        <div id={"collapse" + this.props.num} className="panel-collapse collapse" role="tabpanel" aria-labelledby={"heading" + this.props.num}>
            <div className="panel-body">
              <ul>
                {this.props.ingredients.map(function(ingredient, index){
                   return <li>{ingredient}</li>;
                })}
              </ul>
              <button type="button" className="btn btn-success" data-toggle="modal" data-target="#myModal" id={"btnEdit" + this.props.num} onClick={this.props.edit}>EDIT</button>
              <button type="button" className="btn btn-danger" id={"btnDel" + this.props.num} onClick={this.props.delete}>DELETE</button>
            </div>
        </div>
      </div>
   );
  }
});


const Table = React.createClass ({
  getInitialState: function(){
    return {
      recipes: data,
      editing: -1
    }  
  },
  
  addRecipe: function(){
    document.getElementById('recipeInput').value = ''
    document.getElementById('ingInput').value = ''
    this.setState({editing: -1});
    
  },
  
  deleteRecipe: function(){
    const recipeListDel = this.state.recipes.slice();
    
    const e1 = window.event,
    btn1 = e1.target || e1.srcElement;
    const ind1 = (btn1.id).slice(6);
    recipeListDel.splice(ind1,1);
    this.setState({recipes: recipeListDel});
    localStorage.setItem('_username_recipes', JSON.stringify(recipeListDel));
  },
  
  editRecipe: function(){
    
    const e2 = window.event,
    btn2 = e2.target || e2.srcElement;
    const ind2 = (btn2.id).slice(7);
    
    const objToEdit = this.state.recipes[ind2];
    document.getElementById('recipeInput').value = objToEdit.meal;
    document.getElementById('ingInput').value = objToEdit.ingredients;
    
    this.setState({editing: ind2});
    
  },
                                 
  submitRecipe: function(){
    const recipeList = this.state.recipes.slice();
    
    if(this.state.editing >= 0){
      recipeList[this.state.editing].meal = document.getElementById('recipeInput').value;
      recipeList[this.state.editing].ingredients = document.getElementById('ingInput').value.split(',');
      this.setState({recipes: recipeList, editing: -1});
      
    }
    else{
      recipeList.push({meal: document.getElementById('recipeInput').value, 
              ingredients: document.getElementById('ingInput').value.split(',')})

      this.setState({recipes:recipeList});
    }
    localStorage.setItem('_username_recipes', JSON.stringify(recipeList));
  },
  
  render: function(){
   return (
       <div className="container"> 
       <Title />
        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
          <div className="panel panel-default">
            <div className="panel-heading" role="tab" id="headingOne">
              <h4 className="panel-title"><b>RECIPES</b></h4>
            </div>
              
            {this.state.recipes.map(function(recipe,index){
              return <Cell meal={recipe.meal} ingredients={recipe.ingredients} num={index} delete={this.deleteRecipe} edit={this.editRecipe} />;   
            }, this)}
            
            
          </div>
        </div>
       <button type="button" className="btn btn-success" data-toggle="modal" data-target="#myModal" onClick={this.addRecipe}><i className="fa fa-plus"></i></button>
        <Modal submit={this.submitRecipe} />
     </div>
     
    );
  }
});

ReactDOM.render(
  <Table />,
  document.getElementById('app')
);