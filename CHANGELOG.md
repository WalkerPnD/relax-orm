# Change Log


## Semantic Versioning
https://semver.org/


## [v0.1.3] - 2018-05-27
> feat(Entity): Minimal FindAll and Create function 
- added Decorator[Table]: declare table name at Entity
- added Decorator[Column]: declare column name, and dataTypes
- added Entity: findAll with AND filter
- added Endity: create with value function
- fix Library: Exports

## [v0.2.0] - 2018-05-31
> feat(Entity): update 'Create' function with PrimaryKey and Sequence Decorators
- added Decorator[PrimaryKey]: create Function now returns primaryKey value
- added Decorator[Sequence]: 'Create' function uses Squence on Create
- added Entity: findAll unit tests

## [v0.2.0] - 2018-05-31
> feat(Entity): create 'findOne' function with where filter
- added Entity [findOne]: with where filter
- added Documentation [Getting Started]: minimal instalation and usage guid.
- added Documentation [ConnectionManage example]: minimal instruction and the usage of it's config.
- added Documentation [API example]: minimal API usage guid.