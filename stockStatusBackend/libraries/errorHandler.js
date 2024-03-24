function errorHandler(error, name, from) {
  if(process.env.NODE_ENV === 'production') {
    //[TODO] complete this function
  }
  const logFunction= console.log;
  logFunction(error.message);

  logFunction(`Error Name: ${name}`);

  if(from === 'axios') {
    if(error.response) {
      logFunction(`Status: ${error.response.status}`);
      logFunction(`Data: ${error.response.data}`);
    } else if(error.request) {
      logFunction(`Request: ${error.request}`);
    } else {
      logFunction(`Message: ${error.message}`);
    }
    logFunction(`error: ${error.toJSON()}`);
  } else{
    if(error) {
      logFunction(`Code: ${error}`);
    }
  }
    logFunction(`From: ${from}`);
  }

  module.exports = errorHandler;
  