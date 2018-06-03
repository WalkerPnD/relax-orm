# ReLaX ORM

[![npm version](https://badge.fury.io/js/relax-orm.svg)](https://badge.fury.io/js/relax-orm)
[![Build Status](https://travis-ci.org/walker-walks/relax-orm.svg?branch=master)](https://travis-ci.org/walker-walks/relax-orm)
[![codecov](https://codecov.io/gh/walker-walks/relax-orm/branch/master/graph/badge.svg)](https://codecov.io/gh/walker-walks/relax-orm)

---

A lite ORM Designed to reduce the stress you feel while leading with OracleDB.  
Inspired by [Sequelize](http://docs.sequelizejs.com) and [SequelizeTypescript](https://github.com/RobinBuschmann/sequelize-typescript)


## Getting started

Relax ORM depens on OracleDB instant client. Please follow the instruction.
[Official: OracleDB Client Install Guid](https://oracle.github.io/node-oracledb/INSTALL.html#quickstart)

After installing the OracleDB client, run the script below on terminal.
```terminal
npm i oracledb relax-orm -S
```

## Creating Connection and Entities

To create an Entity, you just extends Entity class and declare the generics type like example.
Also you need to declare table name with @Table, one @PrimaryKey and Columns.
Optionaly you can declare the use of sequence witch will be used on INSERT.
```typescript
@Table('USER_TABLE')
export class User extends Entity<User>{

  @PrimaryKey() // Each entity requires one PrimaryKey to use 'save' function
  @Sequence('USER_SEQUENCE')
  @Column('USER_ID')
  id?: number;

  @Column()
  name?: string;
}
```

After creating Entities, you need to create and initialize connection and registering Entities.

```typescript
const conn = new ConnectionManager({
  user          : DBCONFIG.user,
  password      : DBCONFIG.password,
  connectString : DBCONFIG.connectString,
});
conn.addEntities([ User ]);
await conn.init();
```

Optionaly you can change oracledb config before creating ConnectionManager

```typescript
ConnectionManager.config.maxRows = 100;
ConnectionManager.config.fetchAsString = [ oracledb.DATE, oracledb.NUMBER ];
const conn = new ConnectionManager({...You Connection Config});

```

## Query Example

After registering you can use the basic queries.

```typescript
User.findAll()
/* Generages: 
SELECT SEQ_NUM_USER, NAME FROM RLXORM.TB_USE
*/

User.findAll( {where: { id: 1, name: 'walker' } });
/* Generages: 
SELECT SEQ_NUM_USER, NAME FROM RLXORM.TB_USER WHERE SEQ_NUM_USER = :id$ AND NAME = :name$
*/

User.create({
  id: 10, // If @Sequence is declared, this value will be ignored
  name: 'walker'
})
/* Generages: 
INSERT INTO RLXORM.TB_USER ( SEQ_NUM_USER, NAME ) VALUES ( RLXORM.SQ_USER.NEXTVAL, :name$ ) RETURNING SEQ_NUM_USER, NAME INTO :out$id, :out$name
*/

// Saving entity
const user = User.findOne({ where: {id: 1} });
/* Generages: 
SELECT SEQ_NUM_USER, NAME FROM RLXORM.TB_USER WHERE SEQ_NUM_USER = :id$
*/

user.name = 'style';
user.save();
/* Generages: 
UPDATE RLXORM.TB_USER SET SEQ_NUM_USER = :id$, NAME = :name$ WHERE SEQ_NUM_USER = :key$id RETURNING SEQ_NUM_USER, NAME INTO :out$id, :out$name
*/

User.destroy({
  name: 'walker'
});
/* Generages: **NOTE** IT WILL DELETE RECORDS USING WHERE FILTER
DELETE FROM RLXORM.TB_USER WHERE NAME = :name$
*/


User.destroyAll();
/* Generages: **NOTE** IT WILL DELETE ALL RECORDS FROM TABLE
DELETE FROM RLXORM.TB_USER
*/
```


## Query FindOptions
In findAll and findOne queries you can use options and combine them like examples below.

```typescript
let res = await User.findAll({
  order: [
    [ 'id',ResultOrder.ASC ],
    [ 'name',ResultOrder.DESC ]
  ]
});
/* Generates:
SELECT SEQ_NUM_USER, NAME FROM RLXORM.TB_USER ORDER BY SEQ_NUM_USER ASC, NAME DESC
*/

res = await User.findAll({
  where: {
    name: 'walker',
  },
  order: [
    [ 'id',ResultOrder.ASC ],
    [ 'name',ResultOrder.DESC ],
  ],
});
/* Generates:
SELECT SEQ_NUM_USER, NAME FROM RLXORM.TB_USER WHERE NAME = :name$ ORDER BY SEQ_NUM_USER ASC, NAME DESC
*/

res = await User.findAll({
  limit: 2,
})
/* Generates:
SELECT SEQ_NUM_USER, NAME FROM ( SELECT SEQ_NUM_USER, NAME, ROWNUM as TMP$ROWNUMBER FROM RLXORM.TB_USER ) WHERE TMP$ROWNUMBER
 <= :TMP$LIMIT
 */

res = await User.findAll({
  limit: 2,
  order: [['name', ResultOrder.ASC]],
})
/* Generates: it uses ROW_NUMBER function with over to use ordered result
SELECT SEQ_NUM_USER, NAME FROM ( SELECT SEQ_NUM_USER, NAME, ROW_NUMBER() OVER( ORDER BY NAME ASC ) as TMP$ROWNUMBER FROM RLXO
RM.TB_USER ORDER BY NAME ASC ) WHERE TMP$ROWNUMBER <= :TMP$LIMIT
*/


```