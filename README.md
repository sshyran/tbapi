# TezBoX API
This is the API for the TezBox Browser Extension, which allows app developers to integrate their websites directly with their users.

## Installation

Simply include the tbapi.js file into your website. This will create the window.tbapi object which you can use to access the API.

## Usage

### tbapi.haveAccess and tbapi.requestAccess

Before you can integrate with a users TezBox via the tbAPI, you need to ensure you have access. You can use the following functions to check and request access. Both functions return a promise that will always resolve with the outcome.

```javascript
tbapi.haveAccess().then(function(r){
  if (r == false) {
    console.log("We don't have access");
  } else {
    console.log("We have access");
  }
});

tbapi.requestAccess().then(function(r){
  if (r == false) {
    console.log("Access rejected or blocked");
  } else {
    console.log("Access granted!");
  }
});
```

**Once you have access, you can use the following methods:**

### tbapi.getAllAccounts

Retreive a list of all the users accounts (including titles, addresses and public keys).

```javascript
tbapi.getAllAccounts().then(function(r){
  if (r == false) {
    console.error(r.error);
  } else {
    console.log("Here are the accounts", r.data);
  }
});
```

### tbapi.initiateTransaction

Initiate a transaction to be approved by the user and injected into the blockchain. This function requires 3 mandatory arguments (source, destination, amount) and 4 optional arguments (fee, parameters, gas_limit, storage_limit):

```javascript
tbapi.initiateTransaction(source, destination, amount, fee, parameters, gas_limit, storage_limit).then(function(r){
  if (r == false) {
    console.error(r.error);
  } else {
    console.log("Transaction was set!", r.data);
  }
});
```

### tbapi.signData

**WIP** Sign data with the users private key

## Errors

Coming soon
