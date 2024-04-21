---
to: src/modules/<%= modulePath %>/database/<%= h.changeCase.paramCase(name) %>.orm-mapper.ts
---
<%
 PascalCaseName = `${h.inflection.camelize(entityName, false)}`
 PascalCaseEntityName = `${PascalCaseName}Entity`
 OrmEntityName = `${PascalCaseName}OrmEntity`
 OrmMapperName = `${PascalCaseName}OrmMapper`
 EntityPropsName = `${PascalCaseName}Props`
%>
import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/ddd/infrastructure/database/base-classes/orm-mapper.base';

export class <%= OrmMapperName %> extends OrmMapper<<%= PascalCaseEntityName %>, <%= OrmEntityName %>> {
  protected toOrmProps(entity: <%= PascalCaseEntityName %>): OrmEntityProps<<%= OrmEntityName %>> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<<%= OrmEntityName %>> = {
      someProp: props.someProp,
    };
    return ormProps;
  }

  protected toDomainProps(ormEntity: <%= OrmEntityName %>): EntityProps<<%= EntityPropsName %>> {
    const id = new UUID(ormEntity.id);
    const props: <%= EntityPropsName %> = {
      someProp: ormEntity.someProp,
    };
    return { id, props };
  }
}
