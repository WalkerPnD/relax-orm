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

