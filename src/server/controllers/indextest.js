import React from 'react';
import { RouterContext, match } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import routes from '../../common/routes';
import configureStore from '../../common/store/configureStore';
import Immutable, { fromJS } from 'immutable';

// basic route handler
const handleRender = (ctx) => {
    // Query our mock API asynchronously
    match({ routes, location: ctx.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        ctx.status(500).send(error.message);
      } else if (redirectLocation) {
        ctx.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps == null) {
        //ctx.status(404).send('Not found');
        if (ctx.status == 404) {
          ctx.throw(404);
        }
      }
    //   fetchComponentData(req.cookies.token).then((response) => {
    //     let isAuthorized = false;
    //     if (response[1].data.success === true) {
    //        isAuthorized = true;
    //     } else {
    //       isAuthorized = false;        
    //     }
    //     const initialState = fromJS({
    //       recipe: {
    //         recipes: response[0].data,
    //         recipe: {
    //           id: '',
    //           name: '', 
    //           description: '', 
    //           imagePath: '',            
    //         }  
    //       },
    //       user: {
    //         isAuthorized: isAuthorized,
    //         isEdit: false,
    //       }
    //     });
        // Create a new Redux store instance
        const initialState = fromJS({
                recipe: {
                  recipes: '',
                  recipe: {
                      id: '',
                      name: '', 
                      description: '', 
                      imagePath: '',            
                  }  
                },
                user: {
                  isAuthorized: ''
                }
        });
        const store = configureStore(initialState);
        const initView = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        let state = store.getState();
        let page = renderFullPage(initView, state);
        return ctx.response.body = page;
    })
  }
  
const renderFullPage = (html, preloadedState) => (`
    <!doctype html>
    <html lang="en">
    
      <head>
    
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">
    
        <title>Freelancer - Start Bootstrap Theme</title>
    
        <!-- Bootstrap core CSS -->
        <link href="static/css/bootstrap/bootstrap.css" rel="stylesheet">
    
        <!-- Custom fonts for this template -->
        <link href="static/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic" rel="stylesheet" type="text/css">
    
        <!-- Custom styles for this template -->
        <link href="static/css/freelancer.css" rel="stylesheet">
    
      </head>
    
    <body id="page-top">
        <div id="app">${html}</div>
        <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="/static/bundle.js"></script>
        <script src="/static/js/jquery/jquery.min.js"></script>
        <script src="/static/js/bootstrap.bundle.min.js"></script>
        <script src="/static/js/jqBootstrapValidation.js"></script>
        <script src="/static/js/jquery-easing/jquery.easing.min.js"></script>
        <script src="/static/js/freelancer.js"></script>
    </body>
    </html>`
);

module.exports = {
    'GET *': async (ctx, next) => {
      // Create a new Redux store instance
      handleRender(ctx);
    }
};
