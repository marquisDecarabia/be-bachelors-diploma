---
to: src/modules/<%= modulePath %>/domain/entities/<%= h.changeCase.paramCase(name) %>.entity.ts
---
<%
 PascalCaseName = h.inflection.camelize(name)
 CamelCaseName = h.inflection.camelize(name, true)
 CreateProps = `Create${PascalCaseName}Props`
 Props = `${PascalCaseName}Props`
 EntityName = `${PascalCaseName}Entity`
%>
import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

export interface <%= CreateProps %> {
}

export interface <%= Props %> extends <%= CreateProps %> {
}

export class <%= EntityName %> extends AggregateRoot<<%= Props %>> {
  protected readonly _id: UUID;

  static create(create: <%= CreateProps %>): <%= EntityName %> {
    const id = UUID.generate();
    const props: <%= Props %> = { ...create };

    const <%= CamelCaseName %> = new <%= EntityName %>({ id, props });

    return <%= CamelCaseName %>;
  }

  static validate(props: <%= Props %>): void {
  }
}
