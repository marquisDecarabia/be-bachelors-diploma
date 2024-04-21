---
to: src/modules/<%= modulePath %>/database/<%= h.changeCase.paramCase(name) %>.repository.port.ts
---
<%
 PascalCaseName = `${h.inflection.camelize(entityName, false)}`
 PascalCaseEntityName = `${PascalCaseName}Entity`
 RepositoryPortName = `${PascalCaseName}RepositoryPort`
 EntityPropsName = `${PascalCaseName}Props`
%>
import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';

export interface <%= RepositoryPortName %>
  extends RepositoryPort<<%= PascalCaseEntityName %>, <%= EntityPropsName %>> {
  findOneByIdOrThrow(id: string): Promise<<%= PascalCaseEntityName %>>;
  exists(id: string): Promise<boolean>;
}
