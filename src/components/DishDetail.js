import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './commentFormComponent';
import { Loading } from './loadingComponents';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderDish({dish})
{
    if(dish != null)
    {
        return (
            <div className="col-12 col-md-5 m-1">
                <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%)'}}>
                    <Card>
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>
        );
    }
}

function RenderComments({comments, postComment, dishId})
{
    if(comments != null)
    {
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                        {comments.map((currentComment) => {
                            return (
                                <Fade in>
                                    <li key={currentComment.id}>
                                        <p>{currentComment.comment}</p>
                                        <p>--{currentComment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(currentComment.date)))}</p>
                                    </li>
                                </Fade>
                            );
                        })}
                    </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        );
    }
}

function DishDetail(props)
{
    if(props.isLoading)
    {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if(props.errMess)
    {
        <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
    }
    else if(props.dish != null)
    {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb className="BreadCrumb">
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comment} postComment={props.postComment} dishId={props.dish.id} />
                </div>
            </div>
        );
    }
    else
    {
        return (
            <div></div>
        );
    }
}

export default DishDetail;