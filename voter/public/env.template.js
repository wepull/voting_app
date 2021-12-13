(function (window) {
  window["env"] = window["env"] || {};

  // Environment variables
  var ballotEndpointEnvVar = `$REACT_APP_BALLOT_ENDPOINT`;
  var ec_server_endpoint = `$REACT_APP_EC_SERVER_ENDPOINT`;
  window["env"]["ballotEndpoint"] = ballotEndpointEnvVar.replace(/['"]/gi, "");
  window["env"]["ec_server_endpoint"] = ec_server_endpoint.replace(
    /['"]/gi,
    ""
  );
})(this);
