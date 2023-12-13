# Workfully Code Challenge
This is the code challenge developed by Amador to Workfully.

## Considerations:
- As I already mentioned in the interviews I am relatively new to node. Therefore, the aspects of the challenge related to any node specificities I will keep them simple in purpose. For that reason I did not include a DB implementation (I do not know the typeorm component too well), although the code will remain almost the same, as the repository classes are implemented with port and adapters.
- The Challenge is developed following DDD approach.
- Even if the challenge considerations specified that the Account Entity is not the main focus of the exercise, I came to the conclusion that precisely the account entity is the good candidate for the aggregate root of the bank module. It is this aggregate root the one that holds all the "doors" to the inner domain of this application and is capable of maintaining the operations fully transactional and as close to the domain as they can be (ddd principle) making the code clean and robust.
- This project is focused as an architectural developing challenge. In the real world, the account aggregate would surely have some changes regarding memory and performance improvements (as normally loading all the transaction history is not very performant, if not impossible at all). some of those changes would be pre-charged daily deposits or even pre-calculated balance.
- All the amounts handled in this challenge have been reduced to an integer value object. This follows the principle of the "Money Value Object", even though, for time purposes, the money value object itself was not implemented in the project (as it was not the scope of it anyway). https://martinfowler.com/bliki/CurrencyAsValue.html

## The code:
As mentioned before, the code is structured in a DDD approach. We have the *Bank Context* which theoretically would have multiple modules. For the challenge it has only one, the Account Module. This Module has different components in the different layers:

### Domain

The domain is the business core part of the code where all the business logic is implemented. Parts:
- Account aggregate Root
- Transaction Entity in two forms (Deposits and Withdrawals)
- Value Objects such as TransactionAmount, AccountId etc.
- AccountRepository signature (Interface)
- Domain Events such as DepositRegistered, WithdrawalRegistered etc.
- Domain Errors.

We also have a Shared Bounded Context where we keep more general Domain parts such as:
- EventBus signature (Interface)
- DomainEvent
- Generic Value Objects

### Application

The application layer holds the access doors to the domain. Here is where we have the use-cases. In the Account Module of the *Bank Context*. Three use-cases were developed:

- DepositRegisterer
- WithdrawalRegisterer
- TransferExecutor

### Infrastructure

For the moment empty but here the 3rd party implementations would occur. KafkaEventBus, ElasticSearchAccountRepository, MongoAccountRepository, DependencyInjectionModule etc.

## Error Handling

I'd like to point out that none of the application use-cases have exception management. If you check the code, all the exceptions are handled in the domain layer, either in the Account aggregate or in the value objects.

## Tests

The tests are also structured in DDD with jest, a semantic test framework for node.

### Domain

Here we have all the Mothers (Stubs) necessary to conducts the UseCases tests in the cleanest way. The Mother or Stub Pattern reduce all the dependencies to the production code, centralizing all the possible changes that would be needed in a huge refactor, in other words, de-coupling as much as possible the tests from the production code. It also serves the purpose of generating semantic constructors, in a way we can have multiple constructors for the same Domain objects depending on the test necessities.

### Application

The actual use-case tests, where the whole logic is tested.

### __Mocks__

The mocks is where we mock the services dependencies, such as the AccountRepository

## Improvements

This challenge could have some extra improvements:

- Docker-compose with the DB service and probably the message broker.
- Money Value Object
- Infrastructure layer implementations
- Command Bus Implementation

If any of those are a must for the challenge to be properly evaluated, please contact me

## Getting Started
```
make start
```
This will build the docker container and run the application. wich will start listening in http://localhost:3000 

Or if you just want to run the tests:

```
make test
```
