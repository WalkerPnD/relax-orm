# Change Log


## Semantic Versioning
https://semver.org/

## [v0.6.0] - 2018-06-02
> feat(Entity): added update function
- added Entity [update]: updates the values of persted entity.
- change Entity [create]: refactored create parser to simplify unit tests.
- added UnitTest [createParser]: minimum test to check query generated.
- added UnitTest [updateParser]: minimum test to check query generated.
- added Documentation [API example]: save function example.
- added Documentation [API example]: Query example.

## [v0.5.0] - 2018-06-02
> change(Entity): create now return the inserted Values
- change Entity [create]: now returns the inserted values as entity
- change Entity [create]: simplified the INSERT query. now do not use PROCEDURE anymore.
- fix Entity [mapping]: change storedValue to not enumerable to keep result clean.

## [v0.4.0] - 2018-06-02
> feat(ConnectionManager): added logging option
- added ConnectionManager [logging]: configuration to log the query generated

## [v0.3.0] - 2018-05-31
> feat(Entity): create 'findOne' function with where filter
- added Entity [findOne]: with where filter
- added Documentation [Getting Started]: minimal instalation and usage guid.
- added Documentation [ConnectionManage example]: minimal instruction and the usage of it's config.
- added Documentation [API example]: minimal API usage guid.

## [v0.2.0] - 2018-05-31
> feat(Entity): update 'Create' function with PrimaryKey and Sequence Decorators
- added Decorator[PrimaryKey]: create Function now returns primaryKey value
- added Decorator[Sequence]: 'Create' function uses Squence on Create
- added Entity: findAll unit tests

## [v0.1.3] - 2018-05-27
> feat(Entity): Minimal FindAll and Create function 
- added Decorator[Table]: declare table name at Entity
- added Decorator[Column]: declare column name, and dataTypes
- added Entity: findAll with AND filter
- added Endity: create with value function
- fix Library: Exports

