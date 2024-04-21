---
to: src/modules/<%= modulePath %>/database/<%= h.changeCase.paramCase(name) %>.orm-entity.ts
---
<%
 EntityName = entityName
 CamelCaseEntityName = h.inflection.camelize(EntityName, false)
 OrmEntityName = `${CamelCaseEntityName}OrmEntity`
%>
import { TypeormEntityBase } from '@libs/ddd/infrastructure/database/base-classes/typeorm.entity.base';
import { Entity } from 'typeorm';

@Entity('<%= EntityName %>')
export class <%= OrmEntityName %> extends TypeormEntityBase {
  constructor(props?: <%= OrmEntityName %>) {
    super(props);
  }
}
