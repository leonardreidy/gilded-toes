# Gilded Rose

This is the Gilded Rose kata in TypeScript inside a .devcontainer for use with DevPod.

## Getting started

Install dependencies

```sh
yarn 
```

## Run the unit tests from the Command-Line

There are two unit test frameworks to choose from, Jest and Mocha.

```sh
yarn test:jest
```

To run all tests in watch mode

```sh
yarn test:jest:watch
```

Mocha

```sh
yarn run test:mocha
```

## Run the TextTest fixture from the Command-Line

_You may need to install `ts-node`_

```sh
npx ts-node test/golden-master-text-test.ts
```

Or with number of days as args:
```sh
npx ts-node test/golden-master-text-test.ts 10
```

You should make sure the command shown above works when you execute it in a terminal before trying to use TextTest (see below).


## Run the TextTest approval test that comes with this project

There are instructions in the [TextTest Readme](../texttests/README.md) for setting up TextTest. You will need to specify the Python executable and interpreter in [config.gr](../texttests/config.gr). Uncomment these lines:

    executable:${TEXTTEST_HOME}/python/texttest_fixture.py
    interpreter:python

## TODO - add resources and configuration for ancillary resources and tools