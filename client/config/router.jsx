import React from 'react'
import {
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom'
import {
  inject,
  observer,
} from 'mobx-react'
import PropTypes from 'prop-types'

import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import UserInfo from '../views/user/info'
import UserLogin from '../views/user/login'
import TopicCreate from '../views/topic-create/index'

const PrivateRoute = ({ isLogin, component: Component, ...rest }) => {
  // debugger // eslint-disable-line
  return (
    <Route
      {...rest}
      render={
        (props) => (
          isLogin ?
            <Component {...props} /> :
            <Redirect
              to={{
                pathname: '/user/login',
                search: `?from=${rest.path}`, // eslint-disable-line
              }}
            />
        )
      }
    />
  )
}

const InjectedPrivateRoute = withRouter(inject((stores) => {
  return {
    isLogin: stores.appState.user.isLogin,
  }
})(observer(PrivateRoute)))

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  isLogin: PropTypes.bool,
}

PrivateRoute.defaultProps = {
  isLogin: false,
}
/* eslint-enable */

export default () => [
  <Route path="/" render={() => <Redirect to="/index" />} exact key="first" />,
  <Route path="/index" component={TopicList} key="index" />,
  <Route path="/detail/:id" component={TopicDetail} key="detail" />,
  <Route path="/user/login" exact component={UserLogin} key="login" />,
  <InjectedPrivateRoute path="/user/info" exact component={UserInfo} key="user-info" />,
  <InjectedPrivateRoute path="/topic/create" component={TopicCreate} key="create" />,
]
