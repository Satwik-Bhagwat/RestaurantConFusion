import React, { Component } from 'react';
import Home from './HomeComponent.js';
import Menu from './MenuComponent.js';
import About from './AboutComponent.js';
import Contact from './ContactComponent.js';
import DishDetail from './DishDetail.js';
import Header from './HeaderComponent.js';
import Footer from './FooterComponent.js';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators.js';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state =>
{
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) =>
({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
    resetFeedbackform: () => { dispatch(actions.reset('feedback'))}
});

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    }

    render(){

        const HomePage = () => {
            return (
                <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading} 
                dishesErrMess={this.props.dishes.errmess}
                promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
                promosLoading={this.props.promotions.isLoading} 
                promosErrMess={this.props.promotions.errmess}
                leader={this.props.leaders.filter((leader) => leader.featured)[0]} />
            );
        }

        const DishWithId = ({match}) =>
        {
            return (
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                    isLoading={this.props.dishes.isLoading} 
                    errMess={this.props.dishes.errmess}
                    comment={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
                    commentsErrMess={this.props.comments.errmess} 
                    postComment={this.props.postComment} />
            );
        }

        return(
        <div className="App">
            <Header />
            <TransitionGroup>
                <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                    <Switch>
                        <Route path="/home" component={HomePage} />
                        <Route path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
                        <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                        <Route path="/menu/:dishId" component={DishWithId} />
                        <Route exact path="/contactus" component={() => <Contact resetFeedbackform={this.props.resetFeedbackform} />} />
                        <Redirect to="/home" />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
            <Footer />
        </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
