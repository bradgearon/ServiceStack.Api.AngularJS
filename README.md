ServiceStack.Api.AngularJS
==========================
Generate api documentation in just a few lines of code.  Just html and javascript.

- Uses ServiceStack, ServiceStack.Api.Swagger but not Swagger itself
- Some assembly required

## Features ##

- Will work with any swagger ui documentation, not just .NET
- Lists available api operations
- Allows you to test api operations from dynamically generated form
- Implements most of [Swagger](https://developers.helloreverb.com/swagger/) specification
- Uses [AngularJS](http://angularjs.org/) and [Bootstrap](http://twitter.github.io/bootstrap/)
- Demo here: [AngularJSDocs](http://angularjsdocs.bagearon.com)

## Usage with WebApi and Swagger.Net (or other documentation providers) ##
See [js/services.js](https://github.com/bradgearon/ServiceStack.Api.AngularJS/blob/master/servicestack-web/js/services.js)


    var url = '/api/:service/:resource';

Update the url template with the correct location of your documentation

## Screenshots ##

### Parameters ###
----------
![](https://raw.github.com/bradgearon/resources/master/angularjsdocs/img/request-parameters.png)


### Model ###
----------
![](https://raw.github.com/bradgearon/resources/master/angularjsdocs/img/response-model.png)

### Successful Response ###
----------
![](https://raw.github.com/bradgearon/resources/master/angularjsdocs/img/response.png)

### Error Response ###
----------
![](https://raw.github.com/bradgearon/resources/master/angularjsdocs/img/error-response.png)


### Extra theme: [Bootplus](http://aozora.github.io/bootplus/) ###
----------
![](https://raw.github.com/bradgearon/resources/master/angularjsdocs/img/bootplus.png)
