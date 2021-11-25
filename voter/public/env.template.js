(function (window) {
  window["env"] = window["env"] || {};

  // Environment variables
  var ballotEndpointEnvVar = `$REACT_APP_BALLOT_ENDPOINT`;
  window["env"]["ballotEndpoint"] = ballotEndpointEnvVar.replace(/['"]/gi, "");
})(this);
